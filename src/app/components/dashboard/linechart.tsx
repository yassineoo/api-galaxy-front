import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = () => {
  const data = [
    { name: "Jan", Translator: 40, MovieAPI: 24 },
    { name: "Feb", Translator: 30, MovieAPI: 13 },
    { name: "Mar", Translator: 20, MovieAPI: 98 },
    { name: "Apr", Translator: 27, MovieAPI: 39 },
    { name: "May", Translator: 18, MovieAPI: 48 },
    { name: "Jun", Translator: 23, MovieAPI: 38 },
    { name: "Jul", Translator: 34, MovieAPI: 43 },
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Translator"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="MovieAPI" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
