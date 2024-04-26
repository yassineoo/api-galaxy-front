import React, { useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Button } from "@/components/ui/button";
import {
  generateAxiosSnippet,
  generateCSharpSnippet,
  generateJavaScriptBrowserSnippet,
  generateJavaSnippet,
  generateKotlinSnippet,
  generatePhpCurlSnippet,
  generatePythonRequestsSnippet,
  generateSwiftSnippet,
} from "@/lib/codeGenerator";
import { SelectButton } from "@/components/dashboard/mainPage/filterGroup";

const supportedLanguagesForAPIIntegration = [
  { label: "Node.js", value: "Node.js" },
  { label: "PHP", value: "Php" },
  { label: "Python", value: "Python" },
  { label: "Java", value: "Java" },
  { label: "C#", value: "C#" },
  { label: "Ruby", value: "Ruby" },
  { label: "Go", value: "Go" },
  { label: "JavaScript (Browser)", value: "Javascript (browser)" },
  { label: "Swift", value: "swift" },
  { label: "Kotlin", value: "Kotlin" },
  // Add more languages as needed
];

// Example usage
const snippetExample = generateAxiosSnippet(
  "https://api.example.com/users",
  "post",
  { "Content-Type": "application/json" },
  { name: "John Doe", age: 30 },
  { page: 1, limit: 10 }
);

const CodeSnippet = ({
  codeString,
  language,
  selectedEndpoint,
  apiUrl,
}: any) => {
  const [snippet, setSnippet] = React.useState(snippetExample);
  const [selectedLanguage, setSelectedLanguage] = React.useState("Node.js");
  const changeFramwork = (value: any) => {
    // console.log(value);
    setSelectedLanguage(value);
  };

  useEffect(() => {
    let fun: any = (
      endpointUrl: string,
      method: string,
      headers: Record<string, string> = {},
      body: Record<string, any> = {},
      query: Record<string, any> = {}
    ): string => {
      return "Not implemented yet";
    };

    switch (selectedLanguage.trim()) {
      case "Node.js":
        fun = generateAxiosSnippet;
        break;

      case "PHP":
        fun = generatePhpCurlSnippet;
        break;
      case "Python":
        fun = generatePythonRequestsSnippet;
        break;

      case "Java":
        fun = generateJavaSnippet;
        break;

      case "C#":
        fun = generateCSharpSnippet;
        break;
      /*
      case "Ruby":
        // Assuming you have a function for Ruby
        fun = generateRubySnippet;
        break;

      case "Go":
        // Assuming you have a function for Go
        fun = generateGoSnippet;
        break;
        */

      case "JavaScript (Browser)":
        fun = generateJavaScriptBrowserSnippet;
        break;

      case "Swift":
        fun = generateSwiftSnippet;
        break;

      case "Kotlin":
        fun = generateKotlinSnippet;
        break;
    }
    console.log(selectedEndpoint);

    if (selectedEndpoint) {
      const { parameters } = selectedEndpoint;

      // Filter parameters based on their types
      const pathParameters = selectedEndpoint.Parameters.filter(
        (param: any) => param.ParameterType === "PathParameter"
      );
      const queryParameters = selectedEndpoint.Parameters.filter(
        (param: any) => param.ParameterType === "QueryParameter"
      );
      const bodyParameters = selectedEndpoint.Parameters.filter(
        (param: any) => param.ParameterType === "BodyParameter"
      );

      // Map parameters to the desired format
      const dynamicHeaders: any = {};
      const dynamicBody: any = {};
      const dynamicQuery: any = {};

      pathParameters.forEach((param: any) => {
        // Map path parameters
        // You can customize this part based on your requirements
        dynamicHeaders[param.Key] = param.ExampleValue || "";
      });

      dynamicHeaders["api-key"] = "sqkdqlsd-qskdqnsd-qskjdq-qskjdkq";

      queryParameters.forEach((param: any) => {
        // Map query parameters
        dynamicQuery[param.Key] = param.ExampleValue || "";
      });

      bodyParameters.forEach((param: any) => {
        // Map body parameters
        dynamicBody[param.Key] = param.ExampleValue || "";
      });
      setSnippet(
        fun(
          apiUrl +
            (apiUrl.charAt(apiUrl.length - 1) === "/" ||
            selectedEndpoint.Url.charAt(0) === "/"
              ? ""
              : "/") +
            selectedEndpoint.Url || "",
          selectedEndpoint.Methode || "",
          dynamicHeaders,
          dynamicBody,
          dynamicQuery
        )
      );
    }
  }, [selectedLanguage, selectedEndpoint]);
  return (
    <div className="w-full ml-2  flex flex-col justify-center h-screen  ">
      <div className="flex items-center gap-2">
        <SelectButton
          handleSelectionChange={changeFramwork}
          name="framework"
          items={supportedLanguagesForAPIIntegration}
        />
        <Button onClick={() => navigator.clipboard.writeText(codeString)}>
          Copy code{" "}
          <svg
            className="w-4 h-4 text-black dark:text-white ml-2 "
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="50.000000pt"
            height="50.000000pt"
            viewBox="0 0 50.000000 50.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <metadata>
              Created by potrace 1.16, written by Peter Selinger 2001-2019
            </metadata>
            <g
              transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
              stroke="none"
            >
              <path
                d="M192 460 l4 -40 -98 0 -98 0 0 -210 0 -210 155 0 155 0 0 153 0 153
           -53 52 c-47 47 -53 56 -49 87 l4 35 74 0 74 0 0 -60 0 -60 60 0 60 0 0 -130 0
           -130 -75 0 c-43 0 -75 -4 -75 -10 0 -6 35 -10 85 -10 l85 0 0 153 0 153 -58
           57 -58 57 -98 0 -98 0 4 -40z m-22 -120 l0 -60 60 0 60 0 0 -130 0 -130 -135
           0 -135 0 0 190 0 190 75 0 75 0 0 -60z"
              />
            </g>
          </svg>
        </Button>
      </div>
      <div className="overflow-scroll mb-16">
        <SyntaxHighlighter
          className="w-full flex-1  p-12 "
          language={language}
          style={atomDark}
          wrapLines={true}
          showLineNumbers={true}
        >
          {snippet}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeSnippet;
