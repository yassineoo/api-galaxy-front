import { TimeRangeFilter } from "@/app/dashboard/apis/[id]/Analyse/interfaces";

export const ApiUrl = "http://localhost:8000";
export const API_URLO = "http://localhost:5000"
export const stats_api_url = "http://localhost:10001"
export const timeFilter: {
  value: TimeRangeFilter, label: string
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
