"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeSnippet from "./codeSnippet";
import ApiDocsGraph from "./apiDoc";
import { Input } from "@/components/ui/input";
import Result from "./result";
import { useEffect, useState } from "react";
import About from "./about";
import Footer from "../../components/Vetrine/footer";
import { Report } from "./Report";
import { useApiEndpointsById } from "@/hooks/Endpoints/Endpoints.queries";
import { ParametersTypes } from "@/hooks/Endpoints/interfaces";
import { useSendRequest } from "@/hooks/apis/api.Mutation";
import CommentsContainer from "../test/discussion";
import PrcingTabs from "@/components/addNewApi/monitazation/pricingCardsApi";
import { ResizableDemo } from "./resizeable";
import ReviewsTab from "../test/reviews";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import ParamterControler from "./paramterController";
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

export function ApiTabs({ api,api_id,user_id }: any) {
  const endpointList = useApiEndpointsById(api.ID);
  const [selectedNodeId, setSelectedNodeId] = useState(100);
  const [resquestResult, setResquestResult] = useState();
  const [defaultValue, setDefaultValue] = useState("CodeSnippet");
  const {
    mutateAsync: sendRequest,
    isError,
    isPending,
    isSuccess,
  } = useSendRequest();
  // States for each input field

  return (
    <>
      <Tabs defaultValue="endpoints">
        <TabsList className="grid  grid-cols-5 w-2/3  md:w-1/2  lg:w-1/3  ml-8 my-2">
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="discussion">Reviews</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="report">Report</TabsTrigger>
        </TabsList>
        <TabsContent
          value="endpoints"
          className="w-full  flex flex-col justify-center "
        >
          {endpointList.isLoading && <div>Loading...</div>}
          {endpointList.isSuccess && (
            <ApiDocsGraph
              selectedNodeId={selectedNodeId}
              endpointsList={endpointList.data}
              setSelectedNodeId={setSelectedNodeId}
            />
          )}
          <div className="w-full flex justify-center h-screen">
            {endpointList.isSuccess && (
              <ResizableDemo
                componentOne={
                  <ParamterControler
                    setDefaultValue={setDefaultValue}
                    setResquestResult={setResquestResult}
                    sendRequest={sendRequest}
                    ApiID={api.ID}
                    selectedNodeId={selectedNodeId}
                    endpointList={endpointList.data}
                  />
                }
                componentTwo={
                  <CodeResult
                    defaultValue={defaultValue}
                    apiUrl={api.ApiUrl}
                    resquestResult={resquestResult}
                    selectedNodeId={selectedNodeId}
                    endpointList={endpointList.data}
                  />
                }
              />
            )}
          </div>
        </TabsContent>
        <TabsContent
          value="about"
          className="w-full flex flex-col justify-start mx-12 items-start"
        >
          <About apiDocs={api.ApiDocs} />
        </TabsContent>
        <TabsContent
          value="discussion"
          className="flex justify-center items-start"
        >
          <ReviewsTab />
        </TabsContent>
        <TabsContent
          value="pricing"
          className="w-full bg-gray-100   flex justify-center items-start "
        >
          <PrcingTabs api={api} />
        </TabsContent>
        <TabsContent
          value="report"
          className="w-full flex flex-col justify-start mx-12 items-start"
        >
          <Report userId = {user_id} api_id={api_id} />
        </TabsContent>
      </Tabs>
      <section className="mt-28">
        <Footer />
      </section>
    </>
  );
}

export function CodeResult({
  resquestResult,
  endpointList,
  selectedNodeId,
  apiUrl,
  defaultValue = "CodeSnippet",
}: any) {
  // States for each input field
  const selectedEndpoint = endpointList.find(
    (endpoint: any) => endpoint.ID == selectedNodeId
  );
  return (
    <Tabs defaultValue={defaultValue} className=" h-screen ">
      <TabsList className="my-2">
        <TabsTrigger value="CodeSnippet">CodeSnippet</TabsTrigger>
        <TabsTrigger value="Result" className="relative">
          {defaultValue == "Result" && (
            <span className=" flex h-3 w-3  absolute -top-2 -right-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
          Result
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="Result"
        className="w-full   bg-slate-900 flex flex-col justify-center "
      >
        <div className="m-0 pt-2   w-full flex justify-center ">
          <Result codeString={resquestResult} language="javascript" />
        </div>
      </TabsContent>
      <TabsContent
        value="CodeSnippet"
        className="w-full   bg-slate-900 flex flex-col justify-center "
      >
        <div className="m-0 pt-2   w-full flex justify-center ">
          <CodeSnippet
            apiUrl={apiUrl}
            codeString={codeString}
            language="javascript"
            selectedEndpoint={selectedEndpoint}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
