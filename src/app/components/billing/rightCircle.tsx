import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Total", value: 3333.2 },
  { name: "Tax", value: 1321 },
];

const COLORS = ["#FFBB28", "#FF8042"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-blue-900 p-2">
        <p className="label">{`${payload[0].name} : $${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const RightCircle = () => {
  return (
    <PieChart
      width={400}
      className="m-auto    bg-white dark:bg-blue-950 flex items-center justify-center w-1/2"
      height={300}
    >
      <Pie
        className="ml-32"
        data={data}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        label={({ name, percent }) =>
          `${name}: $${(percent * data[0].value).toFixed(2)}`
        }
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend />
    </PieChart>
  );
};

export default RightCircle;
