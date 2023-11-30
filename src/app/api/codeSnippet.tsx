import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import FilterGroup, {
  FilterButton,
} from "../components/dashboard/mainPage/filterGroup";
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
        <FilterButton
          handleSelectionChange={changeFramwork}
          name="framework"
          items={supportedLanguagesForAPIIntegration}
        />
        <Button onClick={() => navigator.clipboard.writeText(codeString)}>
          Copy code{" "}
          <img src="/icons/icon_copy.svg" alt="" className="w-4 h-4 ml-2 " />
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
