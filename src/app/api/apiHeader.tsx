import { CldImage } from "next-cloudinary";
import ReactStars from "react-stars";
// components/ServiceCard.js

const ApiHeader = ({
  Name,
  Description,
  ImagePath,
  Rating,
  Latency,
  Availability,
}: any) => {
  return (
    <div className="w_full flex items-center justify-between  bg-white p-2 shadow-md">
      <div className="flex items-center ml-8 gap-2">
        <CldImage
          src={ImagePath}
          alt="Selected Image"
          className="mt-2"
          width={50}
          height={50}
        />
        <div className="text-blue-900 font-semibold">
          <h2> {Name} </h2>
          <p className="text-sm text-gray-600">{Description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 mr-3">
        <div className="flex justify-center ">
          <button className="text-md font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 px-6 py-3 rounded-3xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            Subscribe
          </button>
        </div>
        <div className="mr-4">
          <div className="text-md mb-0 font-semibold text-gray-600">Rating</div>
          <ReactStars
            count={5}
            size={20}
            color2={"#ffd700"}
            value={Rating}
            edit={false}
          />
          {/* Use actual stars or an SVG here */}
        </div>
        <div className="mr-4">
          <div className="text-md font-semibold text-gray-600">Latency</div>
          <div className="text-blue-900 text-lg">{Latency} ms</div>
        </div>
        <div>
          <div className="text-md font-semibold text-gray-600">
            Service Level
          </div>
          <div className="text-blue-900 text-lg">{Availability}%</div>
        </div>
      </div>
    </div>
  );
};

export default ApiHeader;
