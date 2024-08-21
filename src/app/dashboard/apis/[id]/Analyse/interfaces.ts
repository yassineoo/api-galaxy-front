import { MultiValue } from "react-select";

export interface SelectOption {
    value: number;
    label: string;
}

export type SelectOptions = MultiValue<SelectOption>;

export type TimeRangeFilter = "1h" | "3h" | "6h" | "12h" | "24h" | "7d" | "30d" | "90d"

interface Log {
    name: string,
    value: number
}

export interface LogStat {
    name: string
    [x: string]: {
        Calls: number,
        Errors: number,
        Latency: number
    } | string
}
