import { use, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { SelectButtonColor } from "@/components/dashboard/mainPage/filterGroupColor";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@/components/ui/tabs";
import PathParameters from "./pathParmeter";
import { FormContext } from "./parameterContext";
import { Parameter, ParametersTypes } from "@/hooks/Endpoints/interfaces";
import StandardParameter from "./standardParameter";
import { Button } from "@/components/ui/button";
import {
  useCreateApiEndpoints,
  useUpdateApiEndpoints,
} from "@/hooks/Endpoints/Endpoints.Mutation";
import { randomBytes } from "crypto";
import {
  DefaultParameters,
  extractPathParameters,
} from "@/utils/endpoints.functions";

const AddEndpointsForm = ({ closeModal, endpoint, edit }: any) => {
  const [parameters, setParameters] = useState<Parameter[]>(
    endpoint?.Parameters?.filter(
      (p: any) => p.ParameterType === ParametersTypes.PathParmater
    ).map((p: any) => {
      return {
        id: p.ID,
        key: p.Key,
        valueType: p.ValueType,
        exampleValue: p.ExampleValue,
        parameterType: p.ParameterType,
        required: p.Required,
      };
    }) || []
  );

  console.log(
    endpoint?.Parameters?.filter(
      (p: any) => p.ParameterType === ParametersTypes.PathParmater
    ).map((p: any) => {
      return {
        id: p.ID,
        key: p.Key,
        valueType: p.ValueType,
        exampleValue: p.ExampleValue,
        parameterType: p.ParameterType,
        required: p.Required,
      };
    })
  );
  console.log("#######################################################");

  const [standardParameters, setStandardParameters] = useState<Parameter[]>(
    endpoint?.Parameters?.filter(
      (p: any) => p.ParameterType !== ParametersTypes.PathParmater
    ).map((p: any) => {
      return {
        id: p.ID,
        key: p.Key,
        valueType: p.ValueType,
        exampleValue: p.ExampleValue,
        parameterType: p.ParameterType,
        required: p.Required,
      };
    }) || DefaultParameters
  );
  const [endpointName, setEndpointName] = useState<string>(
    endpoint?.Name || ""
  );
  const [endpointUrl, setEndpointUrl] = useState<string>(endpoint?.Url || "");
  const [UrlMessage, setUrlMessage] = useState<string>(
    "use {curly braces} to indicate path parameters if needed. e.g., /employees/{id}"
  ); // ["", "valid", "invalid"
  const [endpointMethod, setEndpointMethod] = useState<string>(
    endpoint?.Methode || "GET"
  );
  const [endpointDescription, setEndpointDescription] = useState<string>(
    endpoint?.Description || ""
  );

  const handleUrlChange = (url: string) => {
    setEndpointUrl(url);

    // Check if curly braces are balanced
    const isCurlyBracesBalanced =
      url.split("{").length - 1 === url.split("}").length - 1;

    // Check for special characters in the URL
    const containsSpecialCharacters = /[^a-zA-Z0-9\/{}_]/.test(url);

    // Update the URL message based on the checks
    if (!isCurlyBracesBalanced) {
      setUrlMessage("Error: Unbalanced curly braces in the URL.");
    } else if (containsSpecialCharacters) {
      setUrlMessage("Error: URL contains invalid characters.");
    } else {
      setUrlMessage(
        "use {curly braces} to indicate path parameters if needed. e.g., /employees/{id}"
      );
    }
    const pathParameters = extractPathParameters(url);
    console.log("pathParameters", pathParameters);

    setParameters(pathParameters);
    console.log("parametersUpdated", parameters);
  };
  // Function to extract path parameters from the URL

  const {
    mutate: createEndpoint,
    isError,
    isPending,
    error,
  } = useCreateApiEndpoints();
  const {
    mutate: updateEndpoint,
    isError: isUpdateError,
    isPending: isUpdatePending,
    error: updateError,
  } = useUpdateApiEndpoints();
  // Handle form submission
  const handleSubmit = async () => {
    try {
      const Data = {
        ID: endpoint?.ID || 0,
        Name: endpointName,
        Description: endpointDescription,
        Methode: endpointMethod,
        Url: endpointUrl,
        ApiID: 3,
        GroupID: 0,
        Parameters: [
          ...parameters,
          ...standardParameters.filter((p) => p.key != ""),
        ],
      };
      console.log("this is data is sent to the server");
      console.log(Data);

      if (edit) await updateEndpoint(Data);
      else await createEndpoint(Data);
      //closeModal();
      closeModal();

      console.log("API Endpoint request finshees  successfully!");
    } catch (error) {
      console.error("Error creating API entity:", error);
    }
  };
  return (
    <Card className="w-full text-sm pb-32 ">
      <CardHeader>
        <CardTitle className="text-base">Add New Endpoint</CardTitle>
        <CardDescription className="text-sm">
          Define your Endpoint
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormContext.Provider
          value={{
            parameters,
            setParameters,
            endpointUrl,
            setEndpointUrl,
            standardParameters,
            setStandardParameters,
          }}
        >
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-2 w-4/5">
              <label className=" w-1/5 flex " htmlFor=" endpoint-name">
                Name{" "}
                <span className="text-red-500 text-lg ml-2 mt-[1px]">*</span>
              </label>
              <Input
                id="endpoint-name"
                type="text"
                className="border border-gray-300 rounded-md px-4 py-2"
                value={endpointName}
                onChange={(e) => setEndpointName(e.target.value)}
              />
            </div>
            <div className="flex items-center space-2 w-4/5">
              <label className="text-md w-1/5" htmlFor=" endpoint-description">
                Description
                <span className="text-red-500 text-lg ml-2 mt-[1px]">*</span>
              </label>
              <Textarea
                id="endpoint-description"
                className="border border-gray-300 rounded-md px-4 py-2"
                value={endpointDescription}
                onChange={(e) => setEndpointDescription(e.target.value)}
              />
            </div>

            {/*the params part ----------------------------------------------- */}
            <div className="flex items-center  gap-4 w-full ">
              <SelectButtonColor
                items={[
                  { value: "GET", color: "green" },
                  { value: "POST", color: "blue" },
                  { value: "PUT", color: "orange" },
                  { value: "DELETE", color: "red" },
                  { value: "PATCH", color: "purple" },
                  // Add more HTTP methods as needed
                ]}
                defaultValue={"GET"}
                handleSelectionChange={setEndpointMethod}
              />
              <div className="flex flex-col items-start  w-full space-2">
                <Input
                  id="endpoint-url"
                  type="text"
                  placeholder="api/{id}/clients"
                  className="border border-gray-300 rounded-md px-4 py-2"
                  value={endpointUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                />
              </div>
            </div>
            <p
              className={`${
                UrlMessage.indexOf("Error") ? "text-gray-400" : "text-red-500"
              } ml-48  text-sm`}
            >
              {UrlMessage}
            </p>

            <Tabs defaultValue="Query">
              <TabsList className="grid  grid-cols-4 w-2/3 gap-2 ml-8 my-2">
                <TabsTrigger value="Path-Parematers">
                  Path parematers
                </TabsTrigger>
                <TabsTrigger value="Query">Query</TabsTrigger>
                <TabsTrigger value="Headers">Headers</TabsTrigger>
                <TabsTrigger value="Body">Body</TabsTrigger>
              </TabsList>
              <TabsContent
                value="Path-Parematers"
                className="w-full  flex flex-col justify-center items-start px-8  "
              >
                <PathParameters />
              </TabsContent>
              <TabsContent
                value="Query"
                className="w-full  flex flex-col justify-center items-start px-8  "
              >
                <StandardParameter
                  parameterType={ParametersTypes.QueryParmater}
                />
              </TabsContent>
              <TabsContent
                value="Headers"
                className="w-full  flex flex-col justify-center items-start px-8 "
              >
                <StandardParameter
                  parameterType={ParametersTypes.HeaderParmater}
                />
              </TabsContent>
              <TabsContent
                value="Body"
                className="w-full  flex flex-col justify-center items-start px-8 "
              >
                <StandardParameter
                  parameterType={ParametersTypes.BodyParmater}
                />
              </TabsContent>
            </Tabs>
          </div>
        </FormContext.Provider>
      </CardContent>
      <CardFooter className=" w-full  items-center flex justify-between">
        <Button className="w-1/3" onClick={handleSubmit}>
          {edit ? "Save modifcations" : "create Endpoint"}
        </Button>
        <Button className="w-1/3" onClick={closeModal}>
          Discard
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddEndpointsForm;
