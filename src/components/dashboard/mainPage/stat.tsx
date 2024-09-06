import React from "react";
import Card from "./card";

const StatisticBox = ({ title, value, icon, percentage, arrowType }: any) => {
  return (
    <div className="w-1/12 my-4 max-w-10% p-20 rounded-xl shadow-md flex flex-col  justify-between items-start">
      <div className="">
        <div>21312</div>
        <div>clients</div>
        <div>21312</div>
      </div>
      <div className="  ">
        <img className="cursor-pointer w-8" src="./icons/buger.svg" />
      </div>
    </div>
  );
};

const StatisticsBoxes = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-5 mx-6 text-black">
      <Card title="Total users" value="89,935" percentage={10.2} />
      <Card title="Total users" value="89,935" percentage={10.2} />
      <Card title="Total requests" value="23,283.5" percentage={0.49} />
      <Card title="Total earnings" value="$46,827" percentage={-0.91} />
    </div>
  );
};

export default StatisticsBoxes;
