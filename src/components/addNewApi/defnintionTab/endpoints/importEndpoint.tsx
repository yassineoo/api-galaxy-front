"use client";
import { Input } from "@/components/ui/input";

import React, { useCallback, useState } from "react";
import jsYaml from "js-yaml";
import { ParametersTypes } from "@/hooks/Endpoints/interfaces";
import { Button } from "@/components/ui/button";
import {
  useCreateApiEndpoints,
  useCreateExtractedApiEndpoints,
} from "@/hooks/Endpoints/Endpoints.Mutation";
import { log } from "console";
import { useAuthSession } from "@/components/auth-provider";

const ImportEndpoint = ({ apiID }: { apiID: number }) => {
  const [file, setFile] = useState(null);
  const [apiData, setApiData] = useState<any>(null);
  const [errorFile, setErrorFile] = useState("");
  const { session } = useAuthSession();
  const {
    mutateAsync: createEndpoint,
    isError,
    isPending,
    error,
  } = useCreateExtractedApiEndpoints(session?.token || "");

  const handleFileChange = (event: any) => {
    const newFile = event.target.files[0];
    setFile(newFile);
  };

  const handleUpload = async () => {
    console.log("uploads  ssssssss");

    if (!file) {
      setErrorFile("Please select an OpenAPI file to upload.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event?.target?.result;
        try {
          const parsedData = jsYaml.load(content);
          console.log("parsedData", parsedData);

          setApiData(parsedData);
          setErrorFile("");
        } catch (error) {
          setErrorFile("Error parsing OpenAPI file: ");
        }
      };
      reader.readAsText(file);
    } catch (error) {
      setErrorFile("Error reading file: ");
    }
  };

  const handleSubmit = useCallback(async () => {
    try {
      const endpointsDtoArray = mapToEndpointsDto();
      console.log("apiData", endpointsDtoArray);
      let Data = [];

      for (const endpointDto of endpointsDtoArray) {
        const data = {
          Name: endpointDto.Name,
          Description: endpointDto.Description,
          Methode: endpointDto.Methode,
          Url: endpointDto.Url,
          ApiID: apiID,
          GroupID: endpointDto.GroupID,
          Parameters: endpointDto.Parameters,
        };
        Data.push(data);
      }
      if (Data.length > 0) {
        await createEndpoint({ Endpoints: Data });
      } else setErrorFile("No data to upload");

      console.log("API Endpoints request finished successfully!");
    } catch (error) {
      console.error("Error creating API entities:", error);
    }
  }, [apiID, createEndpoint]);

  const mapToEndpointsDto = () => {
    if (!apiData) {
      return [];
    }

    const endpointsDtoArray = [];

    for (const path in apiData?.paths) {
      for (const method in apiData?.paths[path]) {
        const endpointData = apiData?.paths[path][method];
        const endpointDto = {
          ApiID: apiID, // Provide appropriate ApiID
          GroupID: 0, // Provide appropriate GroupID
          Methode: method,
          Name: endpointData.summary || "", // Use summary as Name or provide a default value
          Url: path,
          Description: endpointData.description || "", // Use description or provide a default value
          Parameters: mapToParametersDto(endpointData.parameters),
        };

        endpointsDtoArray.push(endpointDto);
      }
    }

    return endpointsDtoArray;
  };

  const mapToParametersDto = (parameters: any) => {
    if (!parameters) {
      return [];
    }

    const parametersDto: any[] = [];

    parameters.forEach((param: any, index: number) => {
      const parameterDto = {
        EndpointID: index + 1, // You may need to adjust the logic for generating EndpointID
        Key: param.name,
        ValueType: param.type || "string",
        ParameterType:
          param.in == "body"
            ? ParametersTypes.BodyParmater
            : param.in == "path"
            ? ParametersTypes.PathParmater
            : param.in == "query"
            ? ParametersTypes.QueryParmater
            : ParametersTypes.HeaderParmater,
        Required: param.required || false,
        ExampleValue: param.example || "", // Use example or provide a default value
      };

      if (param.schema && param.schema.$ref) {
        const ref = param.schema.$ref.split("/").pop();
        const definition: any = apiData?.definitions?.[ref];

        if (definition && definition?.properties) {
          Object.entries(definition?.properties).forEach(
            ([propertyName, property]: any, indexx) => {
              const propertyDto = {
                EndpointID: index + 1, // You may need to adjust the logic for generating EndpointID
                Key: propertyName,
                ValueType: property.type || "string",
                ParameterType: ParametersTypes.BodyParmater,

                Required: property.required || false,
                ExampleValue: property.description || "", // Use description or provide a default value
              };

              parametersDto.push(propertyDto);
            }
          );
        }
      } else {
        parametersDto.push(parameterDto);
      }
    });

    return parametersDto;
  };

  return (
    <div className="w-full flex flex-col justify-center items-center  mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">OpenAPI Extractor</h1>
      <Input
        type="file"
        accept=".yaml,.yml"
        onChange={handleFileChange}
        className="mb-4 w-1/3"
      />
      <Button
        onClick={handleUpload}
        //  className="bg-blue-500 text-white  hover:bg-blue-700"
      >
        Extract data
      </Button>
      {apiData && (
        <Button
          onClick={handleSubmit}
          className="bg-blue-500 text-white  mt-4 hover:bg-blue-700"
        >
          Create Endpoints
        </Button>
      )}
      {errorFile && <p className="text-red-500 mt-4">{errorFile}</p>}
      {apiData && (
        <ul className="mt-4">
          {mapToEndpointsDto().map((endpoint) => (
            <li key={endpoint.Url + endpoint.Methode} className="mb-4">
              <b>
                {endpoint.Methode} {endpoint.Url}
              </b>
              {endpoint.Parameters.length > 0 && (
                <ul className="list-disc ml-4">
                  {endpoint.Parameters.map((param) => (
                    <li key={param.Key} className="mb-2">
                      - {param.Key} ({param.ValueType}):{" "}
                      {param.Required ? "Required" : "Optional"} (
                      {param.ParameterType})
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ImportEndpoint;
