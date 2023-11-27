import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeSnippet = ({ codeString, language }: any) => {
  return (
    <div className="w-full flex justify-center">
      <SyntaxHighlighter language={language} style={dark}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
