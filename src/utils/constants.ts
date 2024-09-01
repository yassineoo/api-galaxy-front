// when using an api gateway

export const ApiUrl = "http://localhost:5000/apis-service";
export const ApiAuth = "http://localhost:5000/auth";
//export const ApiAuth = "http://localhost:7000";
export const ApiUsersUrl = "http://localhost:5000/user-service";
//export const ApiUsersUrl = "http://localhost:7002";
export const ApiStatUrl = "http://localhost:5000/stats-service";
// when use it directly
//export const ApiUrl = "http://localhost:8000";
//export const ApiAuth = "http://localhost:7000";
import { TimeRangeFilter } from "@/app/dashboard/apis/[id]/Analyse/interfaces";

export const timeFilter: {
  value: TimeRangeFilter;
  label: string;
}[] = [
  { value: "7d", label: "last 7 days" },
  { value: "30d", label: "last 30 days" },
  { value: "90d", label: "last 90 days" },
  { value: "1h", label: "last hour" },
  { value: "3h", label: "last 3 hours" },
  { value: "6h", label: "last 6 hours" },
  { value: "12h", label: "last 12 hours" },
  { value: "24h", label: "last 24 hours" },
];
