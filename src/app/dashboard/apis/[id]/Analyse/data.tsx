export const fakeData: ChartData[] = [
  {
    name: "Monday",
    getUsers: {
      Calls: 40,
      Errors: 24,
      Latency: 700,
    },
    createUsers: {
      Calls: 21,
      Errors: 1,
      Latency: 300,
    },
  },
  {
    name: "Tuesday",
    getUsers: {
      Calls: 35,
      Errors: 18,
      Latency: 650,
    },
    createUsers: {
      Calls: 25,
      Errors: 2,
      Latency: 320,
    },
  },
  {
    name: "Wednesday",
    getUsers: {
      Calls: 38,
      Errors: 20,
      Latency: 720,
    },
    createUsers: {
      Calls: 23,
      Errors: 0,
      Latency: 310,
    },
  },
  {
    name: "Thursday",
    getUsers: {
      Calls: 45,
      Errors: 28,
      Latency: 780,
    },
    createUsers: {
      Calls: 19,
      Errors: 3,
      Latency: 290,
    },
  },
  {
    name: "Friday",
    getUsers: {
      Calls: 36,
      Errors: 15,
      Latency: 600,
    },
    createUsers: {
      Calls: 27,
      Errors: 1,
      Latency: 330,
    },
  },
];

export interface ChartData {
  name: string;
  [x: string]:
    | {
        Calls: number;
        Errors: number;
        Latency: number;
      }
    | string;
}
