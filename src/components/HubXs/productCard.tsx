import Image from "next/image";
import { FC, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { disLikeAnAPI, likeAnAPI } from "@/actions/api";

interface CardType {
  cardData: {
    averageRating?: number;
    latency?: number;
    availability?: number;
    imagePath: string;
    cardTitle: string;
    cardDescription: string;
    id: number;
    liked?: boolean;
  };
  userId: number | undefined;
}

const ProductCard = ({
  userId,
  cardData: {
    id,
    averageRating,
    latency,
    availability,
    imagePath,
    cardTitle,
    cardDescription,
    liked = false,
  },
}: any) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(liked);
  let timeout: any;
  const likeEvent = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    setIsLiked((prev: any) => !prev);
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(async () => {
      try {
        // send Request to server to like/dislike
        if (!isLiked) {
          // like the api
          console.log("like");
          await likeAnAPI(userId as number, id);
        } else {
          // dislike the api
          console.log("dislikne");
          await disLikeAnAPI(userId as number, id);
        }
      } catch (error) {
        // use react toastify
      }
    }, 2000);
  };
  return (
    <div
      onClick={() => {
        router.push(`/api/${id}`);
      }}
      className="hover:scale-105  bg-white cursor-pointer border flex flex-col justify-around gap-2 border-black text-black text-body 
        shadow-md rounded-lg p-2 md:px-6 lg:w-56"
    >
      <div className="flex flex-row items-start justify-between">
        <div className="h-15 w-15">
          <CldImage
            className="md:w-14 md:h-14"
            src={imagePath}
            alt="Card Image"
            width={45}
            height={45}
          />
        </div>
        <div className="flex gap-1 ">
          {isLiked ? (
            <Image
              className="md:w-7 md:h-7 hover:scale-110 cursor-pointer"
              src={"/icons/icon_heart.png"}
              alt="Card Image"
              width={20}
              height={20}
              onClick={likeEvent}
            />
          ) : (
            <Image
              className="md:w-7 md:h-7 hover:scale-110 cursor-pointer"
              src={"/icons/icon_outline_heart.png"}
              alt="Card Image"
              width={20}
              height={20}
              onClick={likeEvent}
            />
          )}

          <Image
            className="md:w-7 md:h-7 hover:animate-pulse cursor-pointer"
            src={"/icons/certified.svg"}
            alt="Card Image"
            width={20}
            height={20}
          />
        </div>
      </div>
      <h2 className="font-medium text-center text-sm md:text-base">
        {cardTitle}
      </h2>
      <p className="font-light text-xs md:text-sm">{cardDescription}</p>

      <div className="flex items-end justify-around pt-6">
        <div>
          <Image
            className="inline-block md:w-6 md:h-6"
            src={"/icons/star.png"}
            alt="Card Image"
            width={20}
            height={20}
          />
          <p className="inline-block text-xs md:text-sm ml-1">
            {averageRating}
          </p>
        </div>
        <div>
          <Image
            className="inline-block md:w-6 md:h-6"
            src={"/icons/time.png"}
            alt="Card Image"
            width={20}
            height={20}
          />
          <p className="inline-block text-xs md:text-sm ml-1">{latency}</p>
        </div>
        <div>
          <Image
            className="inline-block md:w-6 md:h-6"
            src={"/icons/hours.png"}
            alt="Card Image"
            width={20}
            height={20}
          />
          <p className="inline-block text-xs md:text-sm ml-1">{availability}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
