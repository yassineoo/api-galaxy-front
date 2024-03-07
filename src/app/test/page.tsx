"use client";
import React, { useState } from "react";
import jsYaml from "js-yaml";
import { ParametersTypes } from "@/hooks/Endpoints/interfaces";

const App = () => {
  const [file, setFile] = useState(null);
  const [apiData, setApiData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleFileChange = (event: any) => {
    const newFile = event.target.files[0];
    setFile(newFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an OpenAPI file to upload.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event?.target?.result;
        try {
          const parsedData = jsYaml.load(content);
          setApiData(parsedData);
          setError("");
        } catch (error) {
          setError("Error parsing OpenAPI file: " + error?.message);
        }
      };
      reader.readAsText(file);
    } catch (error) {
      setError("Error reading file: " + error.message);
    }
  };

  const mapToEndpointsDto = () => {
    if (!apiData) {
      return [];
    }

    const endpointsDtoArray = [];

    for (const path in apiData?.paths) {
      for (const method in apiData?.paths[path]) {
        const endpointData = apiData?.paths[path][method];
        const endpointDto = {
          ApiID: 1, // Provide appropriate ApiID
          GroupID: 1, // Provide appropriate GroupID
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

              console.log("BodyDto ", indexx, propertyDto);

              parametersDto.push(propertyDto);
            }
          );
        }
      } else {
        parametersDto.push(parameterDto);
        console.log("parametersDto , ", index, parametersDto);
      }
    });

    return parametersDto;
  };

  console.log("apiData", mapToEndpointsDto());

  return (
    <div>
      <h1>OpenAPI Extractor</h1>
      <input type="file" accept=".yaml,.yml" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {apiData && (
        <ul>
          {mapToEndpointsDto().map((endpoint) => (
            <li key={endpoint.Url + endpoint.Methode}>
              <b>
                {endpoint.Methode} {endpoint.Url}
              </b>
              {endpoint.Parameters.length > 0 && (
                <ul>
                  {endpoint.Parameters.map((param) => (
                    <li key={param.Key}>
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

export default App;
