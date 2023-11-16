import Image from "next/image";
import Link from "next/link";
import Card from "./card";

const sellingData = [
    {
        imagePath: "selling-1",
        cardTitle: "Contribute Your API",
        cardDescription: "Got an API that the world needs to see? Submit it to our platform, set your terms, and watch it flourish among a community of enthusiastic developers."
    },
    {
        imagePath: "selling-2",
        cardTitle: "Browse API categories",
        cardDescription: "Navigate through a vast collection of APIs spanning various categories. Whether you're looking for payment solutions, geolocation services, or data analytics - we've got you covered."
    },
    {
        imagePath: "selling-3",
        cardTitle: "API Documentation & Integration",
        cardDescription: "Seamless integration is our promise. Every API comes with comprehensive documentation, SDKs, and ready-to-use code snippets. Dive in and start building"
    }
]

export default function SellingCards(): JSX.Element {
    return (
        <>
            <div className="bg-white p-6 flex flex-col gap-10 md:flex-row md:p-14 ">
                {sellingData.map((card, index) => (
                    <Card
                        key={index}
                        imagePath={"/assets/" + card.imagePath + ".svg"}
                        cardTitle={card.cardTitle}
                        cardDescription={card.cardDescription}
                    />
                ))}
            </div>
        </>
    );
}