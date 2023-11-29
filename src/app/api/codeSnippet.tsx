import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import FilterGroup, {
  FilterButton,
} from "../components/dashboard/mainPage/filterGroup";

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

const CodeSnippet = ({ codeString, language }: any) => {
  return (
    <div className="w-full ml-2 flex flex-col justify-center h-screen">
      <FilterButton
        name="framework"
        items={supportedLanguagesForAPIIntegration}
      />
      <SyntaxHighlighter
        className="w-full flex-1  p-12"
        language={language}
        style={atomDark}
        wrapLines={true}
        showLineNumbers={true}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
