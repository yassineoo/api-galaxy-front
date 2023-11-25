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
      <div className="bg-white p-2">
        <p className="label">{`${payload[0].name} : $${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const RightCircle = () => {
  return (
    <PieChart width={400} className="p-8 bg-white" height={300}>
      <Pie
        data={data}
        cx={100}
        cy={100}
        innerRadius={50}
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
