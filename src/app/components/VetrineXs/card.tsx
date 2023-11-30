import Image from "next/image";
import { FC } from "react";

interface CardType {
    imagePath: string, 
    cardTitle: string,
    cardDescription: string
}

const Card: FC<CardType> = ({ imagePath, cardTitle, cardDescription }) => {
    return (
        <div className=" bg-white flex justify-top items-center flex-col gap-4 border border-black text-black text-body 
        shadow-md rounded-lg p-6 px-8 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <div className="h-15 w-15">
                <Image
                    src={imagePath}
                    alt="Card Image"
                    width={40}
                    height={40}
                />
            </div>
            <h2 className="font-medium text-center">
                {cardTitle}
            </h2>
            <p className="font-light text-base">
                {cardDescription}
            </p>
        </div>
    );
}

export default Card; 
