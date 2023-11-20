import PricingCard from "../General use/pricingCard";
import IdpropType from "./idProp"


const plans = [
    {
        cardTitle: "Basic Plan",
        cardPrice: "Free",
        cardFeatures: [
            "Access to basic API selections",
            "Standard support",
            "Monthly usage limits",
            "Perfect for trying out our platform"
        ],
        cardBenefits: [
            "Limited API calls",
            "Basic documentation access",
            "Community support"
        ]
    },
    {
        cardTitle: "Premium Plan",
        cardPrice: "$9.99",
        cardFeatures: [
            "Unlock full potential with unlimited access",
            "Premium support",
            "No restrictions, full freedom"
        ],
        cardBenefits: [
            "Unlimited API calls",
            "Access to all API documentation",
            "Priority 24/7 support",
            "Advanced analytics and insights",
            "Save & bookmark APIs "
        ]
    },
]

export default function Plans(id:IdpropType): JSX.Element {
    return (
            <div id={id.id} className="bg-white text-black py-8 md:p-8 flex justify-center items-center flex-col md:flex-row gap-8 text-body ">
                {plans.map((plan, index) => (
                    <PricingCard
                        key={index}
                        cardTitle={plan.cardTitle}
                        cardPrice={plan.cardPrice}
                        cardFeatures={plan.cardFeatures}
                        cardBenefits={plan.cardBenefits}
                    />
                ))}

            </div>
    );
}