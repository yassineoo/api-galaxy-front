import Card from "../VetrineXs/card";

const sellingData = [
  {
    imagePath: "selling-1",
    cardTitle: "Contribute Your API",
    cardDescription:
      "Got an API that the world needs to see? Submit it to our platform, set your terms, and watch it flourish among a community of enthusiastic developers.",
  },
  {
    imagePath: "selling-2",
    cardTitle: "Browse API categories",
    cardDescription:
      "Navigate through a vast collection of APIs spanning various categories. Whether you're looking for payment solutions, geolocation services, or data analytics - we've got you covered.",
  },
  {
    imagePath: "selling-3",
    cardTitle: "API Documentation & Integration",
    cardDescription:
      "Seamless integration is our promise. Every API comes with comprehensive documentation, SDKs, and ready-to-use code snippets. Dive in and start building",
  },
];

export default function SellingCards(id: any): JSX.Element {
  return (
    <div id={id.id} className="bg-white p-6">
      <h1 className="mt-4 mb-12 text-black text-center text-2xl md:text-3xl font-title font-semibold">
        Use our Apis&nbsp;
        <span className="text-goldColor">If NOT</span>
        &nbsp;Create Yours
      </h1>
      <div className="flex flex-col justify-center px-6 gap-10 md:flex-row md:p-2 md:pt-1">
        {sellingData.map((card, index) => (
          <Card
            key={index}
            imagePath={"/assets/" + card.imagePath + ".svg"}
            cardTitle={card.cardTitle}
            cardDescription={card.cardDescription}
          />
        ))}
      </div>
    </div>
  );
}
