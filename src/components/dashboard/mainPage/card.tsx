import React from "react";

const Card = ({ title, value, percentage }: any) => {
  const trend = percentage > 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="bg-white p-5 rounded-lg shadow w-full">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <p className="flex flex-col lg:flex-row items-start w-full justify-between text-gray-400 text-sm">
            <span>{title}</span>
            <span className={trend}>{Math.abs(percentage)}%</span>
          </p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        <div className={`${trend} flex items-center`}>
          {percentage > 0 ? (
            <svg className="w-4 h-4 fill-current mr-2" viewBox="0 0 24 24">
              {/* Up arrow SVG here */}
            </svg>
          ) : (
            <svg className="w-4 h-4 fill-current mr-2" viewBox="0 0 24 24">
              {/* Down arrow SVG here */}
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
