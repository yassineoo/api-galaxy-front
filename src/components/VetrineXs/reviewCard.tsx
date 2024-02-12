import { FC } from "react";
import { StarsForDisplay } from "./starRating";
import Image from "next/image";

interface ReviewCardType {
    review: string,
    reviewer: {
        name: string,
        title: string,
        imagePath: string
    },
    rating: number
}

const ReviewCard: FC<ReviewCardType> = ({ review, reviewer, rating }) => {
    return (
        <>
            <div className="bg-white text-black p-6 flex flex-col justify-around shadow-md rounded-md gap-4 md:w-5/12 xl:w-1/3">
                <div className="flex justify-between">
                    <Image
                        src="/assets/double_quotations-1.svg"
                        alt="Quotation mark"
                        width={35}
                        height={35}
                        priority
                    />
                    <StarsForDisplay ratingValue={rating} />
                </div>

                <p className="font-body font-light">
                    {review}
                </p>

                <div className="flex items-center gap-4">
                    <Image
                        className="h-12 w-12"
                        src="/assets/user.png"
                        alt="avatar"
                        width={35}
                        height={35}
                        priority
                    />

                    <div>
                        <h3 className="font-title text-xl font-semibold">
                            {reviewer.name}
                        </h3>
                        <h4 className="font-body text-base">
                            {reviewer.title}
                        </h4>
                    </div>

                </div>

            </div>
        </>
    );
}

export default ReviewCard;