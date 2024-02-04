import { ParametersTypes } from "@/hooks/Endpoints/interfaces";
import { randomBytes } from "crypto";

export const DefaultParameters = [
  {
    id: randomBytes(16).toString("hex"),
    key: "",
    exampleValue: "",
    parameterType: ParametersTypes.QueryParmater,
    valueType: "string",
    required: false,
  },
  {
    id: randomBytes(16).toString("hex"),
    key: "",
    exampleValue: "",
    parameterType: ParametersTypes.BodyParmater,
    valueType: "string",
    required: false,
  },
  {
    id: randomBytes(16).toString("hex"),
    key: "",
    exampleValue: "",
    parameterType: ParametersTypes.HeaderParmater,
    valueType: "string",
    required: false,
  },
];
