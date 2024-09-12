import React from "react";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Loader2 } from "lucide-react";
import { useAuthSession } from "@/components/auth-provider";
import { useApisStatsDonutQuery } from "@/hooks/apiLogs/apiLogs.queries";
import { SelectOptions } from "@/app/dashboard/apis/[id]/Analyse/interfaces";
import { ChartDonutFormatterApis } from "@/utils/chartFunctions";

const COLORS = ["#0088FE", "#00C49F"]; // Define colors for the chart

const DonutChartComponent = ({
  data,
}: {
  data: { name: string; totalAmount: number }[];
}) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="totalAmount"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

export const DonutWrapper = ({
  selectedApiList,
}: {
  selectedApiList: SelectOptions;
}) => {
  const { session } = useAuthSession();
  const {
    data: stat,
    isLoading,
    isError,
    isSuccess,
  } = useApisStatsDonutQuery({
    apiIds: selectedApiList.map((option: any) => Number(option.value)),
    authToken: session?.token || "",
  });

  // Format the data fetched from the API
  const formattedData = stat
    ? ChartDonutFormatterApis(stat, selectedApiList)
    : [];

  return (
    <>
      {isError && <div>Error loading data</div>}
      {isLoading && (
        <div className="w-full h-[300px] grid place-content-center">
          <Loader2 className="size-10 animate-spin" />
        </div>
      )}
      {isSuccess && <DonutChartComponent data={formattedData} />}
    </>
  );
};

export default DonutWrapper;
