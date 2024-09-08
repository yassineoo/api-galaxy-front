import { StarIcon } from "lucide-react";
import { CldImage } from "next-cloudinary";
import ReactStars from "react-stars";

const ApiHeader = ({
  Name,
  Description,
  ImagePath,
  Rating = 0,
  Latency,
  Availability,
}: any) => {
  return (
    <div className="w-full flex items-center justify-between bg-white px-6 rounded-xl shadow-lg hover:shadow-xl  transition-shadow duration-300 ease-in-out border border-gray-100">
      <div className="flex items-center gap-6">
        {/* Image Section */}
        <div className="relative w-16 h-16 ">
          <CldImage
            src={ImagePath}
            alt="API Image"
            className="rounded-full  w-full h-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
            width={64}
            height={64}
          />
        </div>

        {/* API Details */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300 ease-in-out">
            {Name}
          </h2>
          <p className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300 ease-in-out">
            {Description}
          </p>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="flex items-center gap-8">
        {/* Rating */}
        <div className="text-center">
          <div className="text-md font-semibold text-gray-500">Rating</div>
          <div className="text-blue-600 text-lg font-bold gap-2 flex justify-center items-center">
            {Rating >= 0 ? Rating : 0} <StarIcon />
          </div>
        </div>

        {/* Latency */}
        <div className="text-center">
          <div className="text-md font-semibold text-gray-500">Latency</div>
          <div className="text-blue-600 text-lg font-bold">{Latency} ms</div>
        </div>

        {/* Availability */}
        <div className="text-center">
          <div className="text-md font-semibold text-gray-500">
            Availability
          </div>
          <div className="text-blue-600 text-lg font-bold">{Availability}%</div>
        </div>
      </div>
    </div>
  );
};

export default ApiHeader;
