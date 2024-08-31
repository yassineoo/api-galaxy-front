import { CldImage } from "next-cloudinary";

interface cardType {
  imagePath: string;
  cardTitle: string;
}

export default function CollectionCard(card: cardType) {
  return (
    <div className="bg-white m-6 md:p-4 flex-1 rounded     hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer ">
      <CldImage
        className="m-auto mb-4"
        src={card.imagePath}
        alt="API GALAXY"
        width={50}
        height={50}
        priority
      />
      <h3 className="text-title text-sm text-center text-black md:text-base font-medium">
        {card.cardTitle}
      </h3>
    </div>
  );
}
