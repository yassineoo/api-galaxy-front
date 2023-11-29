"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeSnippet from "./codeSnippet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import ApiDocsGraph from "./apiDoc";
import { Label } from "recharts";
import { Input } from "@/components/ui/input";
const codeString = `
const axios = require('axios');

axios.get('https://yourapi.com/endpoint')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
`;

const result = `{
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "address": {
      "street": "123 Fake Street",
      "city": "Faketown",
      "country": "Fakeland"
    }
  }
}
`;

export function ApiTabs2() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent
        value="account"
        className="flex justify-start items-center flex-col  bg-slate-600 w-full"
      >
        ggg
        <ApiDocsGraph />
      </TabsContent>
      <TabsContent
        value="password"
        className="flex justify-start items-center flex-col  bg-slate-600 w-full"
      >
        ggg
        <ApiDocsGraph />
      </TabsContent>
    </Tabs>
  );
}
export function ApiTabs() {
  return (
    <Tabs defaultValue="endpoints">
      <TabsList className="grid  grid-cols-4  ml-8 my-2">
        <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="discussion">Discussion</TabsTrigger>
        <TabsTrigger value="pricing">Pricing</TabsTrigger>
      </TabsList>
      <TabsContent
        value="endpoints"
        className="w-full  flex flex-col justify-center "
      >
        <ApiDocsGraph />
        <div className="w-full flex justify-center h-screen">
          <ParamterControler />
          <CodeResult />
        </div>
      </TabsContent>
      <TabsContent
        value="about"
        className="w-full  bg-red-400 flex justify-center items-start "
      >
        ggggg
        <ApiDocsGraph />
      </TabsContent>
      <TabsContent
        value="discussion"
        className="w-full  bg-orange-400 flex justify-center items-start"
      >
        <ApiDocsGraph />
      </TabsContent>
      <TabsContent
        value="pricing"
        className="w-full  bg-purple-400 flex justify-center items-start "
      >
        <ApiDocsGraph />
      </TabsContent>
    </Tabs>
  );
}

const CodeResult2 = () => {
  return (
    <Tabs defaultValue="CodeSnippet" className=" w-1/2 ">
      <TabsList className="grid  grid-cols-2 w-[200px] ml-8 my-2">
        <TabsTrigger value="CodeSnippet">CodeSnippet</TabsTrigger>
        <TabsTrigger value="Result">Result</TabsTrigger>
      </TabsList>
      <TabsContent
        value="CodeSnippet"
        className="w-full  flex flex-col justify-center "
      >
        <div className="m-0 p-0 bg-red-400 w-full flex justify-center h-screen">
          <CodeSnippet codeString={codeString} language="javascript" />
        </div>
      </TabsContent>
      <TabsContent
        className="w-full flex flex-col justify-center "
        value="Result"
      >
        <div className="m-0 p-0 bg-red-400 w-full flex justify-center h-screen">
          <CodeSnippet codeString={result} language="json" />
        </div>
      </TabsContent>
    </Tabs>
  );
};
const CodeResult3 = () => {
  return (
    <Tabs defaultValue="endpoints" className="  ">
      <TabsList className="grid  grid-cols-4 w-[400px] ml-8 my-2">
        <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="discussion">Discussion</TabsTrigger>
        <TabsTrigger value="pricing">Pricing</TabsTrigger>
      </TabsList>
      <TabsContent
        value="endpoints"
        className="w-full bg-slate-900 flex flex-col justify-center h-[100vh]"
      ></TabsContent>
      <TabsContent value="about">about</TabsContent>
    </Tabs>
  );
};

export function CodeResult() {
  return (
    <Tabs defaultValue="CodeSnippet" className=" h-[700px] w-1/2 ">
      <TabsList className="ml-8 my-2">
        <TabsTrigger value="CodeSnippet">CodeSnippet</TabsTrigger>
        <TabsTrigger value="Result">Result</TabsTrigger>
      </TabsList>
      <TabsContent
        value="CodeSnippet"
        className="w-full   bg-slate-900 flex flex-col justify-center "
      >
        <div className="m-0 pt-2   w-full flex justify-center ">
          <CodeSnippet codeString={codeString} language="javascript" />
        </div>
      </TabsContent>
      <TabsContent value="Result">
        {" "}
        <div className="m-0 pt-2 bg-slate-900  w-full flex justify-center">
          <CodeSnippet codeString={result} language="javascript" />
        </div>
      </TabsContent>
    </Tabs>
  );
}

const ParamterControler = () => {
  return (
    <div className="flex flex-col w-1/2 mt-[55px] pt-2 border border-t text-white h-[528px]">
      <div className="w-full py-1 px-2 flex justify-between items-center">
        <h2 className="text-lg text-black font-semibold">Put :/ModifyUser</h2>
        <Button className="">Run test</Button>
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full p-4 bg-gray-700 h-full"
      >
        <p className=" py-4">
          This endpoint is used to translate text from one language to another
          using the post method
          <div className="flex my-2  w-full max-w-sm items-center justify-between gap-6 ">
            <label htmlFor="Url">Url</label>
            <Input
              type="Url"
              id="Url"
              placeholder="Url"
              className="text-black"
            />
          </div>
        </p>

        <AccordionItem value="item-1" className="   border border-white p-0  ">
          <AccordionTrigger className="w-full flex justify-between items-center m-0 bg-slate-800  px-2 py-3 border-b border-white">
            Header
            <img
              src="/icons/chevron-down.svg"
              alt=""
              className="w-4 h-4 ml-2 "
            />
          </AccordionTrigger>
          <AccordionContent className="px-2 py-3">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-1" className="   border border-white  ">
          <AccordionTrigger className="w-full flex justify-start bg-slate-800  px-2 py-3 border-b border-white">
            Body
          </AccordionTrigger>
          <AccordionContent className="px-2 py-3">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
