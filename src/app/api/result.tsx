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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Result = ({ codeString, language }: any) => {
  // const [snippet, setSnippet] = React.useState(snippetExample);
  console.log("codeString", codeString);

  return (
    <div className="w-full ml-2  flex flex-col justify-start overflow-y-scroll h-screen ">
      <Tabs defaultValue="Body" className="w-full">
        <TabsList>
          <TabsTrigger value="Body">Body</TabsTrigger>
          <TabsTrigger value="Header">Header</TabsTrigger>
        </TabsList>
        <TabsContent value="Body">
          <SyntaxHighlighter
            className="w-full flex-1  p-12 overflow-scroll"
            language={language}
            style={atomDark}
            wrapLines={true}
            showLineNumbers={true}
          >
            {codeString?.data}
          </SyntaxHighlighter>
        </TabsContent>
        <TabsContent value="Header">
          {" "}
          <SyntaxHighlighter
            className="w-full flex-1  p-12 overflow-scroll"
            language={language}
            style={atomDark}
            wrapLines={true}
            showLineNumbers={true}
          >
            {JSON.stringify(codeString?.hedears)}
          </SyntaxHighlighter>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Result;
