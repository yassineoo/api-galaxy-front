import Image from "next/image";
import ProductCard from "../HubXs/productCard";
import LeftBarButton from "../HubXs/leftBarButton";

const cards = [
    {
        averageRating: 4.8,
        latency: 7,
        availability: 99.99,
        imagePath: "/assets/apis/Google_Translate_logo.png",
        cardTitle: "Google translate API",
        cardDescription: "Translate text from one language to another"
    },
    {
        averageRating: 4.2,
        latency: 25,
        availability: 99,
        imagePath: "/assets/apis/football_api.png",
        cardTitle: "Movies API",
        cardDescription: "Api for movies"
    },
    {
        averageRating: 4.0,
        latency: 120,
        availability: 99.9,
        imagePath: "/assets/apis/movie_api.png",
        cardTitle: "Football API",
        cardDescription: "Api for football matches , stats,  from all over the world"
    }

]

const buttons = [
    {
        iconPath: "/assets/hub_assets/layers.svg",
        buttonText: "Sports",
        option: true
    },
    {
        iconPath: "/assets/hub_assets/dollar-sign.svg",
        buttonText: "Low price",
        option: true
    },
    {
        iconPath: "/assets/hub_assets/credit-card.svg",
        buttonText: "Price range",
        option: true
    },
    {
        iconPath: "/assets/hub_assets/user.svg",
        buttonText: "Creators",
        option: true
    },
    {
        iconPath: "/assets/hub_assets/camera.svg",
        buttonText: "Photography",
        option: true
    },

]

let dupCards = cards
for (let i = 0; i < 2; i++) {
    dupCards = dupCards.concat(cards)
}


export default function ProductsHub() {
    return (
        <>
            <div className="bg-white py-10  text-black flex">
                <div className="ml-4 flex flex-col gap-2">
                    {buttons.map((button, index) => (
                        <LeftBarButton
                            key={index}
                            iconPath={button.iconPath}
                            buttonText={button.buttonText}
                            option={button.option}
                        />
                    ))}
                </div>
                <div className="relative left-8">
                    <h1 className="text-black text-title text-xl md:text-3xl font-bold">
                        Discover more APIs
                    </h1>

                    <div className="flex flex-wrap gap-2 p-2">
                        {
                            dupCards.map((card, index) => (
                                <ProductCard
                                    key={index}
                                    averageRating={card.averageRating}
                                    latency={card.latency}
                                    availability={card.availability}
                                    imagePath={card.imagePath}
                                    cardTitle={card.cardTitle}
                                    cardDescription={card.cardDescription}
                                />

                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}