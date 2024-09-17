import { ParametersTypes } from "@/hooks/Endpoints/interfaces";

export const DefaultParameters = [
  {
    id: Math.floor(Math.random() * 100000 + 1), // Adjust the range as needed
    key: "",
    exampleValue: "",
    parameterType: ParametersTypes.QueryParmater,
    valueType: "string",
    required: false,
  },
  {
    id: Math.floor(Math.random() * 100000 + 1),
    key: "",
    exampleValue: "",
    parameterType: ParametersTypes.BodyParmater,
    valueType: "string",
    required: false,
  },
  {
    id: Math.floor(Math.random() * 100000 + 1),
    key: "",
    exampleValue: "",
    parameterType: ParametersTypes.HeaderParmater,
    valueType: "string",
    required: false,
  },
];

export const ValueTypes = [
  { value: "string", label: "string" },
  { value: "number", label: "number" },
  { value: "boolean", label: "boolean" },
  { value: "date", label: "date" },
  { value: "object", label: "object" },
  { value: "time", label: "time" },
];
// Function to extract path parameters from the URL
export const extractPathParameters = (url: string) => {
  const regex = /\{(\w+)\}/g; // Matches anything inside curly braces
  const matches = url.match(regex);

  if (matches) {
    const pathParameters = matches.map((match, index) => {
      const paramName = match?.substring(1, match.length - 1); // Remove curly braces
      return {
        id: Math.floor(Math.random() * 100000 + 1),
        key: paramName,
        valueType: "string",
        exampleValue: "",
        parameterType: ParametersTypes.PathParmater,
        required: true,
      }; // Default type is string
    });

    return pathParameters;
  }

  return [];
};

export const defaultPlans = [
  {
    Name: "Basic",
    Active: true,
    Price: 0,
    Type: "Usage",
    Rate: 1000,
    RateUnite: "Request",
    RecomndedPlan: true,
  },
  {
    Name: "PRO",
    Active: true,
    Price: 10,
    Type: "Monthly",
    Rate: 1000,
    RateUnite: "Request",
    RecomndedPlan: false,
  },
  {
    Name: "Ultra",
    Active: true,
    Price: 100,
    Type: "Monthly",
    Rate: 1000,
    RateUnite: "Request",
    RecomndedPlan: false,
  },
  {
    Name: "Mega",
    Active: true,
    Price: 1000,
    Type: "Monthly",
    Rate: 1000,
    RateUnite: "Request",
    RecomndedPlan: true,
  },
];
