import { Api } from "@/app/dashboard/apis/[id]/Analyse/api.interface";
import { ChartData } from "@/app/dashboard/apis/[id]/Analyse/data";
import { Endpoint } from "@/app/dashboard/apis/[id]/Analyse/endpoints.interface";
import { LogStat } from "@/app/dashboard/apis/[id]/Analyse/interfaces";

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function replaceNullValues(input: ChartData[]) {
  return input.map((item) => {
    let newItem = { ...item };

    for (let key in item) {
      if (item[key] === null) {
        // TODO GHDWA_SBA7 Aglb mn error {getTodo , getTodos } L
        // => getTodo{error,calls}, getTodo{error,calls}
        newItem[key] = { Calls: 0, Errors: 0, Latency: 0 } as unknown as string;
      }
    }
    return newItem;
  });
}

export function ChartFormater(
  stat: ChartData[],
  endpointsList: (Endpoint | Api)[]
) {
  console.log("stat res ddd2222", stat, endpointsList);
  const result = stat
    ? replaceNullValues(stat).map((item) => {
        console.log({ item });
        const updatedEndpoints = Object.keys(item).reduce((acc: any, key) => {
          if (key !== "name") {
            const endpointId = parseInt(key, 10);
            const matchingEndpoint: (Endpoint | Api) | undefined =
              endpointsList.find((ep: any) => ep?.ID == endpointId);
            if (matchingEndpoint) {
              acc[matchingEndpoint.Name] = item[key];
            }
          }
          return acc;
        }, {});

        return {
          name: item.name,
          ...updatedEndpoints,
        };
      })
    : null;
  console.log("stat res ddd3333", result);

  return result as ChartData[];
}

export function ChartFormaterApis(stat: ChartData[], ApisList: any[]) {
  console.log("stat res ddd2222", stat, ApisList);
  const result = stat
    ? stat.map((item) => {
        console.log({ item });
        const updatedEndpoints = Object.keys(item).reduce((acc: any, key) => {
          if (key !== "name") {
            const endpointId = parseInt(key, 10);
            const matchingEndpoint = ApisList.find(
              (ep: any) => ep?.id == endpointId
            );
            if (matchingEndpoint) {
              acc[matchingEndpoint?.name || "api"] = item[key];
            }
          }
          return acc;
        }, {});

        return {
          name: item.name,
          ...updatedEndpoints,
        };
      })
    : null;
  console.log("stat res ddd3333", result);

  return result;
}
