import ReviewCard from "../VetrineXs/reviewCard";
import IdpropType from "./idProp"


const reviewCards = [
    {
        review: "Incredible APIs with robust features. Integration was a breeze and the documentation was crystal clear.",
        reviewer: {
            name: "Leo Thomson",
            title: "Backend Developer",
            imagePath: "path/to/developer1.jpg"
        },
        rating: 5
    },
    {
        review: "Customer support went above and beyond when we encountered issues. Highly recommend!",
        reviewer: {
            name: "Emilia Soto",
            title: "Integration Specialist",
            imagePath: "path/to/specialist.jpg"
        },
        rating: 4
    },
    {
        review: "A solid selection of APIs, although I encountered some latency with a couple of services.",
        reviewer: {
            name: "Takumi Fujiwara",
            title: "Frontend Engineer",
            imagePath: "path/to/engineer.jpg"
        },
        rating: 3
    },
    {
        review: "The variety of APIs is impressive, and the pricing model is very startup-friendly!",
        reviewer: {
            name: "Priya Bansal",
            title: "CTO at Startech",
            imagePath: "path/to/cto.jpg"
        },
        rating: 5
    }
];

export default function Reviews(id:IdpropType) {
    return (
            <div id={id.id} className="bg-white text-black p-4">
                <h1 className="text-title text-center text-3xl font-semibold text-mainColor"> Reviews </h1>
                <div className="p-2 flex flex-col gap-6 md:flex-row md:flex-wrap md:justify-center ">
                    {reviewCards.map((reviewCard, index) => (
                        <ReviewCard
                            key={index}
                            review={reviewCard.review}
                            reviewer={reviewCard.reviewer}
                            rating={reviewCard.rating}
                        />
                    ))}
                </div>
            </div>
    );
}