// interfaces.ts

export interface ApiEndpointsCreation {
  Name: string;
  Methode: string;
  Url: string;
  Description: string;
}

export interface ApiEndpoints {
  id: number;
  Methode: string;
  Url: string;
  Description: string;
  GroupID: number;
  // Add other properties as needed
}

export enum ParametersTypes {
  PathParmater = "PathParmater",
  QueryParmater = "QueryParmater",
  BodyParmater = "BodyParmater",
  HeaderParmater = "HeaderParmater",
}

export interface Parameter {
  id: string;
  key: string;
  valueType: string;
  parameterType: ParametersTypes;
  exampleValue: string;
  required: boolean;
}
