import { CldImage } from "next-cloudinary";

// components/ServiceCard.js
const ApiHeader = ({ Name, Description, ImagePath }: any) => {
  return (
    <div className="w_full flex items-center justify-between  bg-white p-2 shadow-md">
      <div className="flex items-center ml-8 gap-2">
        <CldImage
          src={ImagePath}
          alt="Selected Image"
          className="mt-2"
          width={200}
          height={200}
        />
        <div className="text-blue-900 font-semibold">
          <h2> {Name} </h2>
          <p className="text-sm text-gray-600">{Description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 mr-3">
        <div className="mr-4">
          <div className="text-md font-semibold text-gray-600">Rating</div>
          <div className="text-yellow-400 text-lg">★★★☆☆</div>{" "}
          {/* Use actual stars or an SVG here */}
        </div>
        <div className="mr-4">
          <div className="text-md font-semibold text-gray-600">Latency</div>
          <div className="text-blue-900 text-lg">200 ms</div>
        </div>
        <div>
          <div className="text-md font-semibold text-gray-600">
            Service Level
          </div>
          <div className="text-blue-900 text-lg">99%</div>
        </div>
      </div>
    </div>
  );
};

export default ApiHeader;
