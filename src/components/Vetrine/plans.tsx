import PricingCard from "../VetrineXs/pricingCard";

const plans = [
  {
    cardTitle: "Basic Plan",
    cardPrice: "Free",
    cardFeatures: [
      "Access to basic API selections",
      "Standard support",
      "Monthly usage limits",
      "Perfect for trying out our platform",
    ],
    cardBenefits: [
      "Limited API calls",
      "Basic documentation access",
      "Community support",
    ],
  },
  {
    cardTitle: "Premium Plan",
    cardPrice: "$9.99",
    cardFeatures: [
      "Unlock full potential with unlimited access",
      "Premium support",
      "No restrictions, full freedom",
    ],
    cardBenefits: [
      "Unlimited API calls",
      "Access to all API documentation",
      "Priority 24/7 support",
      "Advanced analytics and insights",
      "Save & bookmark APIs",
    ],
  },
];

export default function Plans(id: any): JSX.Element {
  return (
    <div
      id={id.id}
      className="bg-gray-100 text-black py-16 flex justify-center items-center flex-col md:flex-row gap-8"
    >
      {plans.map((plan, index) => (
        <div
          key={index}
          className="w-full max-w-xs p-6 h-2/3 flex flex-col justify-between rounded-lg bg-white shadow-lg text-black transition-transform duration-300"
        >
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-900">
              {plan.cardTitle}
            </h2>
            <p className="text-4xl font-bold text-center mb-6 text-gray-700">
              {plan.cardPrice}
            </p>
            <ul className="mb-6 space-y-2">
              {plan.cardFeatures.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm font-medium text-gray-600"
                >
                  <span className="bg-gray-400 rounded-full w-2 h-2 block"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold mb-2 text-center text-gray-800">
              Key Benefits
            </h3>
            <ul className="space-y-1">
              {plan.cardBenefits.map((benefit, j) => (
                <li key={j} className="text-sm text-gray-600">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center mt-6">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-full shadow hover:bg-gray-700 transition duration-200">
              Get Started
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
