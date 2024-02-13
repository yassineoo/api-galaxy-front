import React from "react";
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

const Result = ({ codeString, language }: any) => {
  // const [snippet, setSnippet] = React.useState(snippetExample);

  return (
    <div className="w-full ml-2  flex flex-col justify-center h-screen">
      <div className="flex items-center gap-2">
        <SelectButton name="framework" />
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
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default Result;
