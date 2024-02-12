import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import FilterGroup, {
  SelectButton,
} from "../../components/dashboard/mainPage/filterGroupColor";
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

const supportedLanguagesForAPIIntegration = [
  "Node.js",
  "PHP",
  "Python",
  "Java",
  "C#",
  "Ruby",
  "Go",
  "JavaScript (Browser)",
  "Swift",
  "Kotlin",
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

const CodeSnippet = ({ codeString, language }: any) => {
  const [snippet, setSnippet] = React.useState(snippetExample);
  const changeFramwork = (value: any) => {
    // console.log(value);
    let fun: any = (
      endpointUrl: string,
      method: string,
      headers: Record<string, string> = {},
      body: Record<string, any> = {},
      query: Record<string, any> = {}
    ): string => {
      return "Not implemented yet";
    };

    console.log("change to ", value);
    console.log("test change to ", value == "Node.js");

    switch (value.trim()) {
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

    setSnippet(
      fun(
        "https://api.example.com/users",
        "post",
        { "Content-Type": "application/json" },
        { name: "John Doe", age: 30 },
        { page: 1, limit: 10 }
      )
    );
  };
  return (
    <div className="w-full ml-2  flex flex-col justify-center h-screen">
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
      <SyntaxHighlighter
        className="w-full flex-1  p-12 overflow-scroll"
        language={language}
        style={atomDark}
        wrapLines={true}
        showLineNumbers={true}
      >
        {snippet}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
