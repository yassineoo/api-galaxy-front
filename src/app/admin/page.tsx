"use client";

import StatisticsBoxes from "../../components/dashboard/mainPage/stat";
// import LineChartComponent from "../../components/dashboard/linechart";
import DonutChartComponent, {
  DonutWrapper,
} from "../../components/dashboard/mainPage/donutchart";
// import FilterGroup from "../../components/dashboard/mainPage/filterGroupColor";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ApiUrl } from "@/utils/constants";
import { useApiByUserId, useGetApisIdName } from "@/hooks/apis/api.queries";
import { Separator } from "@/components/ui/separator";
import MultiSelect from "@/components/addNewApi/monitazation/object";
import { MultiValue } from "react-select";
import { ChartFormater, ChartFormaterApis } from "@/utils/chartFunctions";
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
import { useApisStatsQuery } from "@/hooks/apiLogs/apiLogs.queries";
import { useRouter } from "next/navigation";
import { useAuthSession } from "@/components/auth-provider";
import {
  SelectOptions,
  TimeRangeFilter,
} from "../dashboard/apis/[id]/Analyse/interfaces";
import TimeFilterButtons from "../dashboard/apis/[id]/Analyse/timeRange";
import { Api } from "../dashboard/apis/[id]/Analyse/api.interface";

interface SelectedApi {
  label: string;
  value: number;
}

export default function DashboardPage() {
  // const { data: searchApiResult, status } = useSearchApiList({ search });
  const [selectedApiList, setSelectedApiList] = useState<
    MultiValue<SelectedApi>
  >([]);

  const router = useRouter();
  const { session, isAuthenticated } = useAuthSession();
  useEffect(() => {
    const isVerified = localStorage.getItem("isVerified");
    console.log(
      "isVerified",
      isVerified,
      session?.twoFactorEnabled,
      isAuthenticated
    );

    if (isAuthenticated && session && session.twoFactorEnabled && !isVerified) {
      router.push("/verifyOTP");
    }
  }, [session]);

  const { data: apiList, status: apiListLoadingStatus } = useGetApisIdName();
  let options: SelectOptions = [];
  if (apiListLoadingStatus === "success") {
    options = apiList.map((api) => ({
      value: api.id,
      label: api.name,
    }));
  }
  console.log({ apiList });
  function removeApi(apiIdToRemove: number) {
    setSelectedApiList(
      selectedApiList.filter((api) => Number(api.value) !== apiIdToRemove)
    );
  }

  function handleSelectChange(selectedOptions: SelectOptions) {
    setSelectedApiList(selectedOptions);
  }

  const [timeRangeFilter, setTimeRangeFilter] = useState<TimeRangeFilter>("7d");

  return (
    <div className="bg-dashboardBg dark:bg-transparent flex flex-col w-full h-full max-h-full overflow-y-auto">
      {/*  TODO fix name of header */}
      <StatisticsBoxes type="admin" />

      <div className=" w-full ">
        {/* <h2 className="px-12 text-lg font-bold py-2  ">{api.Name} </h2> */}
        <div className="px-12 py-2 flex flex-col gap-4">
          <MultiSelect
            options={options}
            selectedValues={selectedApiList}
            onChange={handleSelectChange}
          />
          <div className="flex justify-start items-center mb-1">
            <TimeFilterButtons
              name="Time Range"
              timeSelected={timeRangeFilter}
              setTimeSelected={setTimeRangeFilter}
            />
          </div>

          {apiList && (
            <LineWrapper
              selectedApiList={selectedApiList}
              apiList={apiList}
              timeRangeFilter={timeRangeFilter}
            />
          )}

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Earnings</h2>
            <DonutWrapper selectedApiList={selectedApiList} />
          </div>
        </div>
      </div>
    </div>
  );
}

const LineWrapper = ({
  selectedApiList,
  apiList,
  timeRangeFilter,
}: {
  selectedApiList: SelectOptions;
  apiList: Api[];
  timeRangeFilter: TimeRangeFilter;
}) => {
  const stat = useApisStatsQuery({
    apiIds: selectedApiList.map((option: any) => Number(option.value)),
    timeFilter: timeRangeFilter,
    authToken: "",
  });
  return (
    <>
      {(stat?.isError || stat === null) && <EmptyLineChartComponent />}
      {stat?.isLoading && (
        <div className="w-full h-[300px] grid place-content-center">
          <Loader2 className="size-10 animate-spin" />
        </div>
      )}
      {stat?.isSuccess && (
        <LineChartComponent
          data={ChartFormaterApis(stat.data, apiList)!}
          // selectedEndpointList={selectedEndpointList}
        />
      )}
    </>
  );
};

const LineChartComponent = ({
  data,
}: {
  data: any[];
  // selectedEndpointList: SelectOptions;
}) => {
  console.log("stat res dddlll", data);
  const [TotalData, setTotalData] = useState(data);

  const [chartData, setChartData] = useState(
    TotalData.map((item) => {
      const endpointData: any = {};
      Object.keys(item).forEach((key) => {
        if (key !== "name" && typeof item[key] !== "string") {
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
    (accumulator, item) => {
      // Check if item has defined dynamic properties
      const properties = Object.keys(item).filter((key) => key !== "name");
      properties.forEach((property) => {
        if (typeof item[property] !== "string" && item[property]?.Calls) {
          // Increment total calls
          accumulator[0] += item[property].Calls;
        }
        if (typeof item[property] !== "string" && item[property]?.Errors) {
          // Increment total errors
          accumulator[1] += item[property].Errors;
        }
        if (typeof item[property] !== "string" && item[property]?.Latency) {
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
  const averageLatency = totalLatency / totalCalls;

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
    const averageLatency = totalLatency / totalCalls;

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
  console.log("chartData", chartData);

  return (
    <div className="w-full flex flex-col gap-6 mb-10">
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
          {chartData[0] &&
            Object.keys(chartData[0])
              .filter((endpointName) => endpointName != "name")
              .map((endpointName, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={endpointName}
                  stroke={`#${Math.floor(Math.random() * 16777215).toString(
                    16
                  )}`} // Random color
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
    <div className="w-full flex flex-col gap-6">
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
