import Image from "next/image";
import { FC } from "react";

interface PricingCardType {
    cardTitle: string,
    cardPrice: string,
    cardFeatures: string[],
    cardBenefits: string[]
}

const PricingCard: FC<PricingCardType> = ({ cardTitle, cardPrice, cardFeatures, cardBenefits }) => {
    return (
        <>
            <div className="flex flex-col justify-center items-center gap-4 border text-black text-body shadow-md rounded-lg p-8 px-10 w-9/12 md:w-1/2 lg:w-4/12">
                <h2 className="font-semibold text-center">
                    {cardTitle}
                </h2>
                <h3 className="font-bold text-4xl text-center">
                    {cardPrice}
                </h3>
                <p className="font-extralight text-xs" >per month</p>
                <button className="bg-mainColor text-white px-4 py-1 rounded-md" >
                    Start Now
                </button>

                <div className="flex flex-col items-baseline gap-4">
                    <h2 className="font-semibold self-center" > The Benefits </h2>
                    <div className="flex flex-col gap-2 ">
                        {cardFeatures.map((feature, index) => (
                            <span key={index} className="flex items-baseline font-light text-base">
                               <Image
                                className="h-1 w-1 mr-2"
                                src={"/assets/points.png"}
                                alt="points"
                                width={9}
                                height={9}
                                /> 
                                {feature}
                            </span>
                        ))}
                    </div>


                    <h2 className="font-semibold self-center font-title" > Features </h2>
                    <div className="flex flex-col gap-2">
                        {cardBenefits.map((benefit, index) => (
                            <p key={index} className="font-light text-base">
                                {benefit}
                            </p>
                        ))}
                    </div>

                </div>

            </div>
        </>
    );
}

export default PricingCard;
