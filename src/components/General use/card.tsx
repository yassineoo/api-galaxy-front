import Image from "next/image";
import { FC } from "react";

interface CardVetrineType {
  imagePath: string;
  cardTitle: string;
  cardDescription: string;
}

const CardVetrine: FC<CardVetrineType> = ({
  imagePath,
  cardTitle,
  cardDescription,
}) => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 flex flex-col justify-top items-center gap-4 border border-gray-200 text-black shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 rounded-lg p-6 px-8 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
      <div className="h-16 w-16 bg-gray-200 rounded-full flex justify-center items-center">
        <Image
          src={imagePath}
          alt="CardVetrine Image"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <h2 className="font-semibold text-lg text-center">{cardTitle}</h2>
      <p className="font-light text-gray-700 text-center">{cardDescription}</p>
    </div>
  );
};

export default CardVetrine;
