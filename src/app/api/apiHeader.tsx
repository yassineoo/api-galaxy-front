// components/ServiceCard.js
const ApiHeader = () => {
  return (
    <div className="w_full flex items-center justify-between  p-2 rounded-lg shadow-md">
      <div className="flex items-center ml-8 gap-2">
        <img
          src="/images/Google_Translate_logo 1.png" // Replace with your logo path
          alt="Google Translator Logo"
          className="h-8 w-8 mr-2" // Adjust height and width as needed
        />
        <div className="text-blue-900 font-semibold">
          <h2> Google Translator </h2>
          <p className="text-sm text-gray-600">Translate text in real time</p>
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
