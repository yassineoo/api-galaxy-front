import Image from "next/image";
import { FC } from "react";

import { useRouter } from "next/navigation";

interface CardType {
  averageRating?: number;
  latency?: number;
  availability?: number;
  imagePath: string;
  cardTitle: string;
  cardDescription: string;
  id: number;
}

const ProductCard: FC<CardType> = ({
  id,
  averageRating,
  latency,
  availability,
  imagePath,
  cardTitle,
  cardDescription,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/api/${id}`);
      }}
      className="bg-white cursor-pointer border flex flex-col justify-around gap-2 border-black text-black text-body 
        shadow-md rounded-lg p-2 md:px-6 lg:w-56"
    >
      <div className="flex flex-row items-start justify-between">
        <div className="h-15 w-15">
          <Image
            className="md:w-14 md:h-14"
            src={imagePath}
            alt="Card Image"
            width={45}
            height={45}
          />
        </div>
        <div className="flex gap-1 ">
          <Image
            className="md:w-7 md:h-7"
            src={"/icons/heart.png"}
            alt="Card Image"
            width={20}
            height={20}
          />
          <Image
            className="md:w-7 md:h-7"
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
