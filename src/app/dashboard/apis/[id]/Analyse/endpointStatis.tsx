import MultiSelect from "@/components/addNewApi/monitazation/object";
import { SelectButton } from "@/components/dashboard/mainPage/filterGroup";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fakeData } from "./data";

const Statis = ({ api, endpointsList }: any) => {
  console.log("endpointList", endpointsList);

  const handleSelectChange = (selectedOptions: any) => {
    setEndpointList(selectedOptions);
  };
  const options = endpointsList.map((item: any) => {
    return { value: item.ID, label: item.Name };
  });
  const [timeRnageFilter, setTimeRnageFilter] = useState("");

  const changeTimeRangeFilter = (value: any) => {
    setTimeRnageFilter(value);
  };

  const [endpointList, setEndpointList] = useState([]);
  return (
    <div className=" w-full h-96 ">
      <h2 className="px-12 text-lg font-bold py-4  ">{api.Name} </h2>
      <div className="px-12 py-4">
        <MultiSelect
          options={options}
          selectedValues={endpointList}
          onChange={handleSelectChange}
        />
        <div className="flex justify-start items-center mb-8">
          <Filter
            name="Time Rnage"
            changeFilter={changeTimeRangeFilter}
            items={timeFilter}
          />
        </div>
        <LineChartComponent />
      </div>
    </div>
  );
};

export default Statis;

const Filter = ({ items, changeFilter, name }: any) => {
  return (
    <div className="flex flex-col justify-start gap-6 items-center">
      <h3 className="font-bold m-4"> {name}</h3>

      <SelectButton
        handleSelectionChange={changeFilter}
        name={name}
        defaultSelected="7days"
        items={items}
      />
    </div>
  );
};

const LineChartComponent = () => {
  const [TotalData, setTotalData] = useState(fakeData);
  const [chartData, setChartData] = useState(
    fakeData.map((item: any) => {
      return {
        name: item?.name,
        getUsers: item?.getUsers?.Calls,
        CreateUsers: item?.createUsers?.Calls,
      };
    })
  );

  const [totalCalls, totalErrors, totalLatency] = TotalData.reduce(
    (accumulator, item) => {
      // Check if item has defined getUsers and createUsers objects
      if (item?.getUsers && item?.createUsers) {
        // Increment total calls
        accumulator[0] += item.getUsers.Calls + item.createUsers.Calls;
        // Increment total errors
        accumulator[1] += item.getUsers.Errors + item.createUsers.Errors;
        // Increment total latency
        accumulator[2] += item.getUsers.Latency + item.createUsers.Latency;
      }
      return accumulator;
    },
    [0, 0, 0] // Initial values for totalCalls, totalErrors, totalLatency
  );

  // Calculate average errors and average latency
  const averageErrors = totalErrors / TotalData.length;
  const averageLatency = totalLatency / TotalData.length;

  // Update state with the calculated values

  const [metrics, setMetrics] = useState("Calls");
  const [statResult, setStatResult] = useState([
    totalCalls,
    averageErrors,
    averageLatency,
  ]);

  useEffect(() => {
    // Calculate total calls, average errors, and average latency
    const [totalCalls, totalErrors, totalLatency] = TotalData.reduce(
      (accumulator, item) => {
        // Check if item has defined getUsers and createUsers objects
        if (item?.getUsers && item?.createUsers) {
          // Increment total calls
          accumulator[0] += item.getUsers.Calls + item.createUsers.Calls;
          // Increment total errors
          accumulator[1] += item.getUsers.Errors + item.createUsers.Errors;
          // Increment total latency
          accumulator[2] += item.getUsers.Latency + item.createUsers.Latency;
        }
        return accumulator;
      },
      [0, 0, 0] // Initial values for totalCalls, totalErrors, totalLatency
    );

    // Calculate average errors and average latency
    const averageErrors = totalErrors / TotalData.length;
    const averageLatency = totalLatency / TotalData.length;

    // Update state with the calculated values
    setStatResult([totalCalls, averageErrors, averageLatency]);
  }, [TotalData]);
  useEffect(() => {
    let data;
    if (metrics === "Calls") {
      data = TotalData.map((item: any) => {
        return {
          name: item.name,
          getUsers: item.getUsers?.Calls,
          CreateUsers: item.createUsers?.Calls,
        };
      });
    }
    if (metrics === "Errors") {
      data = TotalData.map((item: any) => {
        return {
          name: item.name,
          getUsers: item.getUsers?.Errors,
          CreateUsers: item.createUsers?.Errors,
        };
      });
    }
    if (metrics === "Latency") {
      data = TotalData.map((item: any) => {
        return {
          name: item.name,
          getUsers: item.getUsers?.Latency,
          CreateUsers: item.createUsers?.Latency,
        };
      });
    }

    setChartData(data as any);
  }, [TotalData, metrics]);
  return (
    <div className="w-full mb-32 ">
      <div className="flex justify-center gap-6 items-center mb-8">
        <AnlyseButtonType
          metrics={metrics}
          setMetrics={setMetrics}
          type="Calls"
          number={statResult[0]}
          hint="Total Api Calls"
          unite=" calls"
        />
        <AnlyseButtonType
          metrics={metrics}
          setMetrics={setMetrics}
          type="Errors"
          number={statResult[1]}
          hint="Average Errors"
          unite=" %"
        />
        <AnlyseButtonType
          metrics={metrics}
          setMetrics={setMetrics}
          type="Latency"
          number={statResult[2]}
          hint="Average Latency"
          unite=" ms"
        />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="getUsers"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="CreateUsers" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const timeFilter = [
  { value: "7days", label: "last 7 days" },
  { value: "30days", label: "last 30 days" },
  { value: "90days", label: "last 90 days" },
  { value: "1hour", label: "last hour" },
  { value: "3hours", label: "last 3 hours" },
  { value: "6hours", label: "last 6 hours" },
  { value: "12hours", label: "last 12 hours" },
  { value: "24hours", label: "last 24 hours" },
];

const AnlyseButtonType = ({
  metrics,
  setMetrics,
  type,
  number,
  unite,
  hint,
}: any) => {
  return (
    <Button
      className={`w-1/3 flex flex-col h-24 py-2  text-black border-2 hover:bg-blue-200" ${
        metrics === type ? "bg-blue-200" : "bg-slate-100"
      }`}
      onClick={() => {
        console.log("type", type, metrics);

        return setMetrics(type);
      }}
    >
      <div className="text-lg font-bold">{type}</div>
      <p className="text-sm text-gray-400 ">{hint}</p>
      <div className="text-sm text-gray-500">{number + unite} </div>
    </Button>
  );
};
