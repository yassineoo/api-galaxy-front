import Image from "next/image";
import { FC } from "react";

interface CardVetrineType {
  imagePath: string;
  cardVetrineTitle: string;
  cardVetrineDescription: string;
}

const CardVetrine: FC<CardVetrineType> = ({
  imagePath,
  cardVetrineTitle,
  cardVetrineDescription,
}) => {
  return (
    <div
      className=" bg-white flex justify-top items-center flex-col gap-4 border border-black text-black text-body 
        shadow-md rounded-lg p-6 px-8 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
    >
      <div className="h-15 w-15">
        <Image src={imagePath} alt="CardVetrine Image" width={40} height={40} />
      </div>
      <h2 className="font-medium text-center">{cardVetrineTitle}</h2>
      <p className="font-light text-base">{cardVetrineDescription}</p>
    </div>
  );
};

export default CardVetrine;
