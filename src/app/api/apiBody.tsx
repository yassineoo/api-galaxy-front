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
import { Input } from "@/components/ui/input";
import Result from "./result";
import { useEffect, useState } from "react";
import About from "./about";
import Footer from "../../components/Vetrine/footer";

import { useApiEndpointsById } from "@/hooks/Endpoints/Endpoints.queries";
import { ParametersTypes } from "@/hooks/Endpoints/interfaces";
import { useSendRequest } from "@/hooks/apis/api.Mutation";
import CommentsContainer from "../test/discussion";
import PrcingTabs from "@/components/addNewApi/monitazation/pricingCardsApi";
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

export function ApiTabs({ api }: any) {
  const endpointList = useApiEndpointsById(api.ID);
  const [selectedNodeId, setSelectedNodeId] = useState(100);
  const [resquestResult, setResquestResult] = useState();
  console.log("selectedNodeId ", selectedNodeId);

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
        <TabsList className="grid  grid-cols-4 w-1/3  ml-8 my-2">
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="discussion">Discussion</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
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
              <>
                {" "}
                <ParamterControler
                  setResquestResult={setResquestResult}
                  slectedApiUrl={api.ApiUrl}
                  sendRequest={sendRequest}
                  selectedNodeId={selectedNodeId}
                  endpointList={endpointList.data}
                />
                <CodeResult
                  apiUrl={api.ApiUrl}
                  resquestResult={resquestResult}
                  selectedNodeId={selectedNodeId}
                  endpointList={endpointList.data}
                />
              </>
            )}
          </div>
        </TabsContent>
        <TabsContent
          value="about"
          className="w-full   flex flex-col justify-start mx-12 items-start "
        >
          <About apiDocs={api.ApiDocs} />
        </TabsContent>
        <TabsContent
          value="discussion"
          className="  flex justify-center items-start"
        >
          <CommentsContainer />
        </TabsContent>
        <TabsContent
          value="pricing"
          className="w-full bg-gray-100   flex justify-center items-start "
        >
          <PrcingTabs api={api} />
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
}: any) {
  // States for each input field
  const selectedEndpoint = endpointList.find(
    (endpoint: any) => endpoint.ID == selectedNodeId
  );
  return (
    <Tabs defaultValue="CodeSnippet" className=" h-[760px] w-1/2 ">
      <TabsList className="my-2">
        <TabsTrigger value="CodeSnippet">CodeSnippet</TabsTrigger>
        <TabsTrigger value="Result">Result</TabsTrigger>
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

const ParamterControler = ({
  setResquestResult,
  slectedApiUrl,
  sendRequest,
  selectedNodeId = 14,
  endpointList,
}: any) => {
  // States for each input field
  const selectedEndpoint = endpointList?.find(
    (endpoint: any) => endpoint?.ID == selectedNodeId
  );

  const [url, setUrl] = useState(selectedEndpoint?.Url || "koko");
  const [apiKey, setApiKey] = useState("azeazazdqzsdq");
  const [bodyParams, setBodyParams] = useState({});
  const [headerParams, setHeaderParams] = useState({});
  const [queryParams, setQueryParams] = useState({});
  const [pathParams, setPathParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Use useEffect to update the url state when selectedEndpoint changes
  useEffect(() => {
    setUrl(selectedEndpoint?.Url || ""); // Update url when selectedEndpoint changes

    // Initialize bodyParams, headerParams, and queryParams based on selectedEndpoint.Parameters
    if (selectedEndpoint?.Parameters) {
      const initialBodyParams = {} as any;
      const initialHeaderParams = {} as any;
      const initialQueryParams = {} as any;

      selectedEndpoint.Parameters.forEach(
        (param: {
          Key: string;
          ExampleValue: string;
          ParameterType: string;
        }) => {
          switch (param.ParameterType) {
            case ParametersTypes.BodyParmater:
              initialBodyParams[param.Key] = param.ExampleValue || "";
              break;
            case ParametersTypes.HeaderParmater:
              initialHeaderParams[param.Key] = param.ExampleValue || "";
              break;
            case ParametersTypes.QueryParmater:
              initialQueryParams[param.Key] = param.ExampleValue || "";
              break;
            // Add additional cases for other parameter types if needed
            default:
              break;
          }
        }
      );

      setBodyParams(initialBodyParams);
      setHeaderParams(initialHeaderParams);
      setQueryParams(initialQueryParams);
    }
  }, [selectedEndpoint]);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Example: Make a request using the input values
      const Data = {
        Method: selectedEndpoint?.Methode,
        URL: `${slectedApiUrl}/${url}`, // Use the updated url state
        Headers: headerParams,
        Params: queryParams,
        Data: bodyParams,
        EndpointID: selectedNodeId,
      };
      const response = await sendRequest(Data);
      setResquestResult(response);

      console.log("Request sent!", response);

      // console.log(response.data);
    } catch (error) {
      console.error("Error making the request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setApiKey("");
    setBodyParams({});
    setHeaderParams({});
    setQueryParams({});
    setPathParams({});
  };

  return (
    <div className="flex flex-col w-1/2 mt-[56px]  border border-t  h-[595px]">
      <ParamsHeader
        selectedEndpoint={selectedEndpoint}
        isLoading={isLoading}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
      />
      {/* ... */}
      <Accordion
        type="multiple"
        className="overflow-scroll w-full py-4 bg-[#14073D] h-full text-white"
      >
        <p className=" p-4 w-full text-white">
          {selectedEndpoint?.Description || "No description available"}
        </p>
        <ParamterInput name="Url" value={url} disabled />

        {selectedEndpoint?.Parameters && (
          <>
            <ParameterSection
              baseUrl={selectedEndpoint?.Url}
              setUrl={setUrl}
              type={ParametersTypes.PathParmater}
              parameters={selectedEndpoint?.Parameters}
              state={pathParams}
              setState={setPathParams}
            />
            <ParameterSection
              setUrl={setUrl}
              type={ParametersTypes.HeaderParmater}
              parameters={selectedEndpoint?.Parameters}
              state={headerParams}
              setState={setHeaderParams}
            />
            <ParameterSection
              setUrl={setUrl}
              type={ParametersTypes.QueryParmater}
              parameters={selectedEndpoint?.Parameters}
              state={queryParams}
              setState={setQueryParams}
            />
            <ParameterSection
              setUrl={setUrl}
              type={ParametersTypes.BodyParmater}
              parameters={selectedEndpoint?.Parameters}
              state={bodyParams}
              setState={setBodyParams}
            />
          </>
        )}
      </Accordion>
    </div>
  );
};

const ParameterSection = ({
  type,
  setUrl,
  parameters,
  state,
  setState,
  baseUrl,
}: any) => {
  const handleChange = (key: any, value: any) => {
    if (type === ParametersTypes.PathParmater) {
      setUrl((prv: any) => {
        return getUrl(value, baseUrl);
      });
    }
    setState((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getUrl = (pathParamValue: string, baseUrl: string) => {
    const pathParams = parameters?.filter(
      (param: any) => param.ParameterType === ParametersTypes.PathParmater
    );
    const url = pathParams?.reduce((acc: string, param: any) => {
      return acc.replace(`{${param.Key}}`, pathParamValue);
    }, baseUrl);
    return url;
  };
  console.log("paramters =========== ", parameters);

  const renderInputs = () => {
    let params = parameters?.filter(
      (param: any) => param.ParameterType === type
    );

    // Add static parameters for "HeaderParmater"
    if (type === ParametersTypes.HeaderParmater && params) {
      params = [
        { ID: 0, Key: "host", ValueType: "string", ExampleValue: "google.com" },
        {
          ID: 1,
          Key: "Api Key",
          ValueType: "string",
          ExampleValue: "SQLIJ-lknlslq-jhvjjsb-qsjdbqk",
        },
        ...params,
      ];
    }

    return params?.map((param: any) => (
      <ParamterInput
        key={param.ID}
        name={param.Key}
        placeholder={param.ValueType}
        value={state[param.Key] || param.ExampleValue}
        onChange={(value: any) => handleChange(param.Key, value)}
      />
    ));
  };

  return (
    <AccordionItem value={`item-${type}`} className="border border-white p-0">
      <AccordionTrigger className="w-full flex justify-between items-center m-0 bg-slate-800 px-2 py-3 border-b border-white">
        {type}
        <img src="/icons/chevron-down.svg" alt="" className="w-4 h-4 ml-2" />
      </AccordionTrigger>
      <AccordionContent className="px-2 py-3">
        {renderInputs()}
      </AccordionContent>
    </AccordionItem>
  );
};
const ParamterInput = ({
  name,
  value,
  onChange,
  placeholder,
  disabled,
}: any) => {
  return (
    <div className="flex px-4 py-2 my-2 w-full items-center justify-between gap-6">
      <label htmlFor={name} className="w-1/5">
        {name}
      </label>
      <Input
        type="text"
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-black w-full md:w-4/5"
        disabled={disabled}
      />
    </div>
  );
};

const ParamsHeader = ({
  selectedEndpoint,
  isLoading,
  handleReset,
  handleSubmit,
}: any) => {
  return (
    <div className="w-full py-1  px-2 flex justify-between items-center bg-gray-100 dark:bg-slate-900 dark:text-white">
      <h2 className="text-lg  font-semibold">{`${selectedEndpoint?.Methode}/ ${selectedEndpoint?.Url}`}</h2>
      <div className="flex gap-2">
        <Button className="" onClick={handleReset}>
          Reset
        </Button>
        {isLoading ? (
          <Button className="" onClick={handleSubmit}>
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </Button>
        ) : (
          <Button className="" onClick={handleSubmit}>
            Run test
          </Button>
        )}
      </div>
    </div>
  );
};
