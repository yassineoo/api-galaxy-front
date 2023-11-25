import React from "react";

const StatisticBox = ({ title, value, icon, percentage, arrowType }: any) => {
  return (
    <div className="w-1/12  max-w-10% p-20 rounded-xl shadow-md flex flex-col  justify-between items-start">
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
    <div className=" w-full px-8">
      <p className="text-primary-500 text-uppercase font-medium">overview</p>

      <div className="max-w-full flex gap-30 justify-between">
        <StatisticBox
          title="soldtikets"
          value="2000000"
          icon="./icons/icon_billing.svg"
          percentage="23.36%"
          arrowType="increase"
        />

        <StatisticBox
          title="totalprofit"
          value="2000000"
          icon="/icons/icon_billing.svg"
          percentage="23.36%"
          arrowType="decrease"
        />

        <StatisticBox
          title="newServiceProviders"
          value="20000"
          icon="/icons/icon_billing.svg"
          percentage="23.36%"
          arrowType="decrease"
        />

        <StatisticBox
          title="newclients"
          value="20000"
          icon="/icons/icon_billing.svg"
          percentage="23.36%"
          arrowType="decrease"
        />
      </div>
    </div>
  );
};

export default StatisticsBoxes;
