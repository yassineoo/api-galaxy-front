import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactJson from "react-json-view";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Result = ({ codeString, language }: any) => {
  // const [snippet, setSnippet] = React.useState(snippetExample);

  return (
    <div className="w-full ml-2  flex flex-col justify-start overflow-y-scroll h-screen ">
      <Tabs defaultValue="Body" className="w-full">
        <TabsList className="mb-2">
          <TabsTrigger value="Body">Body</TabsTrigger>
          <TabsTrigger value="Header">Header</TabsTrigger>
        </TabsList>
        <TabsContent value="Body">
          <ReactJson
            src={codeString?.data}
            theme="ocean"
            displayDataTypes={false}
            name={false}
            enableClipboard={false}
            displayObjectSize={false}
          />
        </TabsContent>

        <TabsContent value="Header">
          <ReactJson
            src={JSON.parse(JSON.stringify(codeString?.headers) || "{}")}
            theme="ocean"
            displayDataTypes={false}
            name={false}
            enableClipboard={false}
            displayObjectSize={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Result;
