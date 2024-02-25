import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function replaceNullValues(input: any) {
  return input.map((item: any) => {
    for (const key in item) {
      if (item[key] === null) {
        item[key] = { Calls: 0, Errors: 0, Latency: 0 };
      }
    }
    return item;
  });
}

export function ChartFormater(stat: any, endpointsList: any) {
  return replaceNullValues(stat).map((item: any) => {
    const updatedEndpoints = Object.keys(item).reduce((acc: any, key) => {
      if (key !== "name") {
        const endpointId = parseInt(key, 10);
        const matchingEndpoint: any = endpointsList.find(
          (ep: any) => ep?.ID == endpointId
        );
        if (matchingEndpoint) {
          acc[matchingEndpoint?.Name] = item[key];
        }
        console.log(
          matchingEndpoint?.Name,
          "matchingEndpoint?.Name",
          endpointId,
          key
        );
      }
      return acc;
    }, {});

    console.log("updatedEndpoints", updatedEndpoints);

    return {
      name: item.name,
      ...updatedEndpoints,
    };
  });
}
