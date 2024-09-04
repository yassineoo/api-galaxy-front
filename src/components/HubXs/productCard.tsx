import Image from "next/image";
import { FC, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { disLikeAnAPI, likeAnAPI } from "@/actions/api";
import { useAuthSession } from "../auth-provider";
import { Button } from "../ui/button";
import { BadgeCheckIcon, CheckIcon, HeartIcon, StarIcon } from "lucide-react";

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
  const { session, isAuthenticated } = useAuthSession();
  const likeEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
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
          const f = await likeAnAPI(
            userId as number,
            id,
            session?.token as string
          );
          console.log(f);
        } else {
          // dislike the api
          console.log("dislikne");
          await disLikeAnAPI(userId as number, id, session?.token as string);
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
      className="hover:scale-105  bg-white cursor-pointer border flex flex-col justify-around gap-2 border-muted-foreground text-black text-body 
        shadow-md rounded-lg p-2  lg:w-56"
    >
      <div className="flex flex-row items-start justify-between w-full ">
        <div className="relative h-40 w-40 flex-1">
          <CldImage
            className="object-fit object-cover max-w-full max-h-full rounded-lg"
            src={imagePath}
            alt="Card Image"
            fill
          />
        </div>
      </div>
      <h2 className="font-semibold text-center text-base md:text-base">
        {cardTitle}
      </h2>
      <p className="font-light text-center text-xs md:text-sm">
        {cardDescription}
      </p>

      <div className="flex items-center  justify-center pt-2 gap-1">
        <div className="items-center  flex gap-1">
          <div className="flex flex-row gap-2 items-center ">
            {isLiked ? (
              <Button
                onClick={likeEvent}
                variant="ghost"
                className="w-fit hover:bg-transparent relative size-5"
                disabled={!isAuthenticated}
              >
                <Image
                  className="max-w-full max-h-full hover:scale-110 cursor-pointer"
                  src={"/icons/icon_heart.png"}
                  alt="Card Image"
                  fill
                />
              </Button>
            ) : (
              <Button
                onClick={likeEvent}
                variant="ghost"
                size="icon"
                className="p-0 relative size-5 hover:bg-transparent"
                disabled={!isAuthenticated}
              >
                <Image
                  className="max-w-full max-h-full hover:scale-110 cursor-pointer"
                  src={"/icons/icon_outline_heart.png"}
                  alt="Card Image"
                  fill
                />
              </Button>
            )}

            <div className="relative size-5 ">
              <Image
                className="max-w-full max-h-full hover:animate-pulse cursor-pointer"
                src={"/icons/certified.svg"}
                alt="Card Image"
                fill
              />
            </div>
          </div>
          <p className="inline-block text-xs md:text-sm ml-1">
            {averageRating}
          </p>
          <StarIcon className="size-5 text-yellow-500" />
        </div>
        <div className="flex items-center">
          <div className="relative size-5">
            <Image
              className="inline-block max-w-full max-h-full"
              src={"/icons/time.png"}
              alt="Card Image"
              fill
            />
          </div>
          <p className="inline-block text-xs md:text-sm ml-1">
            {latency ?? 50}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
