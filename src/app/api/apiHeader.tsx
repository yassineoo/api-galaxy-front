import { CldImage } from "next-cloudinary";
import ReactStars from "react-stars";

const ApiHeader = ({
  Name,
  Description,
  ImagePath,
  Rating,
  Latency,
  Availability,
}: any) => {
  console.log("starts ", Rating);
  return (
    <div className="w-full flex items-center justify-between bg-gradient-to-r from-blue-50 via-white to-blue-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <div className="flex items-center gap-6">
        <div className="relative w-16 h-16">
          <CldImage
            src={ImagePath}
            alt="API Image"
            className="rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
            width={64}
            height={64}
          />
          <div className="absolute top-0 left-0 w-full h-full rounded-full bg-blue-900 opacity-10 hover:opacity-0 transition-opacity duration-300 ease-in-out"></div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-blue-900 hover:text-blue-700 transition-colors duration-300 ease-in-out">
            {Name}
          </h2>
          <p className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-300 ease-in-out">
            {Description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="text-center">
          <div className="text-md font-semibold text-gray-600">
            {Rating} Rating{" "}
          </div>
          <div className="text-blue-900 text-lg font-bold">
            <ReactStars
              count={5}
              value={Rating}
              size={24}
              color2={"#ffd700"}
              edit={false}
            />
          </div>
        </div>
        <div className="text-center">
          <div className="text-md font-semibold text-gray-600">Latency</div>
          <div className="text-blue-900 text-lg font-bold">{Latency} ms</div>
        </div>
        <div className="text-center">
          <div className="text-md font-semibold text-gray-600">
            Service Level
          </div>
          <div className="text-blue-900 text-lg font-bold">{Availability}%</div>
        </div>
      </div>
    </div>
  );
};

export default ApiHeader;
