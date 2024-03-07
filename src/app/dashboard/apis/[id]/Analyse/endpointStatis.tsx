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

import { useApiLogsStats } from "@/hooks/apiLogs/apiLogs.queries";
import TimeFilterButtons from "./timeRange";
import { ChartFormater } from "@/utils/chartFunctions";

const Statis = ({ api, endpointsList }: any) => {
  const [slectedEndpointList, setSlectedEndpointList] = useState([]);

  const handleSelectChange = (selectedOptions: any) => {
    setSlectedEndpointList(selectedOptions);
  };
  const options = endpointsList.map((item: any) => {
    return { value: item.ID, label: item.Name };
  });
  const [timeRnageFilter, setTimeRnageFilter] = useState("7d");

  const changeTimeRangeFilter = (value: any) => {
    setTimeRnageFilter(value);
  };

  // selected Endpoints

  useEffect(() => {}, [slectedEndpointList]);
  return (
    <div className=" w-full ">
      <h2 className="px-12 text-lg font-bold py-2  ">{api.Name} </h2>
      <div className="px-12 py-2">
        <MultiSelect
          options={options}
          selectedValues={slectedEndpointList}
          onChange={handleSelectChange}
        />
        <div className="flex justify-start items-center mb-1">
          <TimeFilterButtons
            name="Time Rnage"
            timeSelected={timeRnageFilter}
            setTimeSelected={setTimeRnageFilter}
          />
        </div>

        <LineWrapper
          slectedEndpointList={slectedEndpointList}
          endpointsList={endpointsList}
          timeRnageFilter={timeRnageFilter}
        />
      </div>
    </div>
  );
};

export default Statis;

const Filter = ({ items, changeFilter, name }: any) => {
  return (
    <div className="flex  justify-start gap-6 my-3 items-center">
      <h3 className="font-bold "> {name}</h3>

      <SelectButton
        handleSelectionChange={changeFilter}
        name={name}
        defaultSelected="7days"
        items={items}
      />
    </div>
  );
};

const LineWrapper = ({
  slectedEndpointList,
  endpointsList,
  timeRnageFilter,
}: any) => {
  const stat =
    slectedEndpointList.length > 0
      ? useApiLogsStats({
          endpointIds: slectedEndpointList.map((Element: any) =>
            Number(Element.value)
          ),
          timeFilter: timeRnageFilter,
        })
      : null;

  return (
    <>
      {stat === null && <EmptyLineChartComponent />}
      {stat?.isLoading && <p>loading ...</p>}
      {stat?.isSuccess && (
        <LineChartComponent
          data={ChartFormater(stat.data, endpointsList)}
          slectedEndpointList={slectedEndpointList}
        />
      )}
    </>
  );
};

const LineChartComponent = ({ data }: any) => {
  const [TotalData, setTotalData] = useState(data);

  const [chartData, setChartData] = useState(
    TotalData.map((item: any) => {
      const endpointData: any = {};
      Object.keys(item).forEach((key) => {
        if (key !== "name") {
          endpointData[key] = item[key]?.Calls || 0;
        }
      });

      return {
        name: item.name,
        ...endpointData,
      };
    })
  );

  const [totalCalls, totalErrors, totalLatency] = TotalData.reduce(
    (accumulator: any, item: any) => {
      // Check if item has defined dynamic properties
      const properties = Object.keys(item).filter((key) => key !== "name");
      properties.forEach((property) => {
        if (item[property]?.Calls) {
          // Increment total calls
          accumulator[0] += item[property].Calls;
        }
        if (item[property]?.Errors) {
          // Increment total errors
          accumulator[1] += item[property].Errors;
        }
        if (item[property]?.Latency) {
          // Increment total latency
          accumulator[2] += item[property].Latency;
        }
      });
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
    const [totalCalls, totalErrors, totalLatency] = TotalData.reduce(
      (accumulator: any, item: any) => {
        // Check if item has defined dynamic properties
        const properties = Object.keys(item).filter((key) => key !== "name");
        properties.forEach((property) => {
          if (item[property]?.Calls) {
            // Increment total calls
            accumulator[0] += item[property].Calls;
          }
          if (item[property]?.Errors) {
            // Increment total errors
            accumulator[1] += item[property].Errors;
          }
          if (item[property]?.Latency) {
            // Increment total latency
            accumulator[2] += item[property].Latency;
          }
        });
        return accumulator;
      },
      [0, 0, 0] // Initial values for totalCalls, totalErrors, totalLatency
    );

    // Calculate average errors and average latency
    const averageErrors = totalErrors / TotalData.length;
    const averageLatency = totalLatency;

    // Update state with the calculated values
    setStatResult([totalCalls, averageErrors, averageLatency]);
  }, [TotalData]);
  useEffect(() => {
    let data;
    if (metrics === "Calls") {
      data = TotalData.map((item: any) => {
        const endpointData: any = {};
        Object.keys(item).forEach((key) => {
          if (key !== "name") {
            endpointData[key] = item[key]?.Calls || 0;
          }
        });

        return {
          name: item.name,
          ...endpointData,
        };
      });
    }
    if (metrics === "Errors") {
      data = TotalData.map((item: any) => {
        const endpointData: any = {};
        Object.keys(item).forEach((key) => {
          if (key !== "name") {
            endpointData[key] = item[key]?.Errors || 0;
          }
        });

        return {
          name: item.name,
          ...endpointData,
        };
      });
    }
    if (metrics === "Latency") {
      data = TotalData.map((item: any) => {
        const endpointData: any = {};
        Object.keys(item).forEach((key) => {
          if (key !== "name") {
            endpointData[key] = item[key]?.Latency || 0;
          }
        });

        return {
          name: item.name,
          ...endpointData,
        };
      });
    }

    setChartData(data as any);
  }, [TotalData, metrics]);
  return (
    <div className="w-full ">
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
          {/* Iterate over the endpoints and create Line components */}
          {Object.keys(chartData[0])
            .filter((endpointName) => endpointName != "name")
            .map((endpointName, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={endpointName}
                stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color
                activeDot={{ r: 8 }}
              />
            ))}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const EmptyLineChartComponent = ({}: any) => {
  return (
    <div className="w-full ">
      <div className="flex justify-center gap-6 items-center mb-1">
        <AnlyseButtonType
          metrics=""
          setMetrics={() => {}}
          type="Calls"
          number={0}
          hint="Total Api Calls"
          unite=" calls"
        />
        <AnlyseButtonType
          metrics=""
          setMetrics={() => {}}
          type="Errors"
          number={0}
          hint="Average Errors"
          unite=" %"
        />
        <AnlyseButtonType
          metrics={""}
          setMetrics={() => {}}
          type="Latency"
          number={0}
          hint="Average Latency"
          unite=" ms"
        />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={[{ name: "No Data", "No Data": 0 }]}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

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
      className={`w-1/3 flex flex-col h-20   text-black border-2 hover:bg-blue-200" ${
        metrics === type ? "bg-blue-200" : "bg-slate-100"
      }`}
      onClick={() => {
        // console.log("type", type, metrics);

        return setMetrics(type);
      }}
    >
      <div className="text-md font-semibold">{type}</div>
      <p className="text-sm text-gray-400 ">{hint}</p>
      <div className="text-sm text-gray-500">
        {(type == "Calls" ? number : number.toFixed(2)) + unite}{" "}
      </div>
    </Button>
  );
};
