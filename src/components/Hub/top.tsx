import CollectionCard from "../HubXs/collectionCard";

const items = [
  {
    ImagePath: "/assets/hub_assets/translate.svg",
    Title: "Best translation API",
  },
  {
    ImagePath: "/assets/hub_assets/movie.svg",
    Title: "Top Movie API",
  },
  {
    ImagePath: "/assets/hub_assets/chat.svg",
    Title: "Top Sms API",
  },
  {
    ImagePath: "/assets/hub_assets/hosting.svg",
    Title: "Top Proxies API",
  },
  {
    ImagePath: "/assets/hub_assets/location.svg",
    Title: "Top location API",
  },
];

export default function TopCollection() {
  return (
    <div className="bg-mainColor">
      <h1 className="text-white text-center text-2xl md:text-4xl font-bold py-6">
        Top Collection
      </h1>

      <div className="flex p-4 gap-4 md:w-5/6 m-auto flex-wrap">
        {items.map((item, index) => (
          <CollectionCard
            key={index}
            imagePath={item.ImagePath}
            cardTitle={item.Title}
          />
        ))}
      </div>
    </div>
  );
}
