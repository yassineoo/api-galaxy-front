import { use, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { SelectButton } from "@/components/dashboard/mainPage/filterGroup";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { TabsContent } from "@/components/ui/tabs";
import PathParameters from "./parmeter";
import { FormContext } from "./parameterContext";
import { Parameter, ParametersTypes } from "@/hooks/Endpoints/interfaces";

const AddEndpointsForm = () => {
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [endpointName, setEndpointName] = useState<string>("");
  const [endpointUrl, setEndpointUrl] = useState<string>("");
  const [UrlMessage, setUrlMessage] = useState<string>(
    "use {curly braces} to indicate path parameters if needed. e.g., /employees/{id}"
  ); // ["", "valid", "invalid"
  const [endpointMethod, setEndpointMethod] = useState<string>("GET");
  const [endpointDescription, setEndpointDescription] = useState<string>("");

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
  // Function to extract path parameters from the URL
  const extractPathParameters = (url: string) => {
    const regex = /\{(\w+)\}/g; // Matches anything inside curly braces
    const matches = url.match(regex);

    if (matches) {
      const pathParameters = matches.map((match, index) => {
        const paramName = match.substring(1, match.length - 1); // Remove curly braces
        return {
          key: paramName,
          valueType: "string",
          exampleValue: "",
          parameterType: ParametersTypes.PathParmater,
          required: true,
        }; // Default type is string
      });
      console.log("pathParameters", pathParameters);

      return pathParameters;
    }

    return [];
  };

  return (
    <Card className="w-full text-sm">
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
          }}
        >
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-2 w-2/3">
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
            <div className="flex items-center space-2 w-2/3">
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
              <SelectButton
                items={[
                  { value: "GET", color: "green" },
                  { value: "POST", color: "blue" },
                  { value: "PUT", color: "orange" },
                  { value: "DELETE", color: "red" },
                  { value: "PATCH", color: "purple" },
                  // Add more HTTP methods as needed
                ]}
                defaultValue={"GET"}
              />
              <div className="flex flex-col items-start mt-[18px] w-full space-2">
                <Input
                  id="endpoint-url"
                  type="text"
                  placeholder="api/{id}/clients"
                  className="border border-gray-300 rounded-md px-4 py-2"
                  value={endpointUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                />
                <p className="text-gray-400 text-sm">{UrlMessage}</p>
              </div>
            </div>

            <Tabs defaultValue="Query">
              <TabsList className="grid  grid-cols-4 w-1/2  ml-8 my-2">
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
              ></TabsContent>
              <TabsContent
                value="Headers"
                className="w-full  flex flex-col justify-center items-start px-8 "
              ></TabsContent>
              <TabsContent
                value="Body"
                className="w-full  flex flex-col justify-center items-start px-8 "
              ></TabsContent>
            </Tabs>
          </div>
        </FormContext.Provider>
      </CardContent>
    </Card>
  );
};

export default AddEndpointsForm;
