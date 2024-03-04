"use client";
import React, { useState } from "react";
import jsYaml from "js-yaml"; // Assuming js-yaml is installed

const App = () => {
  const [file, setFile] = useState(null);
  const [apiData, setApiData] = useState(null);
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
          setError(""); // Clear any previous errors
        } catch (error) {
          setError("Error parsing OpenAPI file: " + error?.message);
        }
      };
      reader.readAsText(file);
    } catch (error) {
      setError("Error reading file: " + error.message);
    }
  };

  const extractEndpointsAndParameters = () => {
    if (!apiData) {
      return "No OpenAPI data found.";
    }

    const endpoints = {};
    for (const path in apiData?.paths) {
      for (const method in apiData?.paths[path]) {
        const endpoint = {
          url: path,
          method,
          parameters: [],
        };

        if (apiData.paths[path][method].parameters) {
          endpoint.parameters = apiData.paths[path][method].parameters.map(
            (param) => ({
              name: param.name,
              type: param.type || "string",
              required: param.required || false,
              location: param.in || "query",
            })
          );
        }

        endpoints[(path, method)] = endpoint;
      }
    }

    console.log("endpoints");
    console.log(endpoints);

    return (
      <ul>
        {Object.entries(endpoints).map(([key, endpoint]) => (
          <li key={key}>
            <b>
              {endpoint?.method} {endpoint?.url}
            </b>
            {endpoint?.parameters?.length > 0 && (
              <ul>
                {endpoint?.parameters?.map((param: any) => (
                  <li key={param.name}>
                    - {param.name} ({param.type}):{" "}
                    {param.required ? "Required" : "Optional"} ({param.location}
                    )
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h1>OpenAPI Extractor</h1>
      <input type="file" accept=".yaml,.yml" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {apiData && extractEndpointsAndParameters()}
    </div>
  );
};

export default App;
