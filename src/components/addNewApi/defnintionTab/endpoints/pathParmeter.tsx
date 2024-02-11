import { SelectButton } from "@/components/dashboard/mainPage/filterGroup";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Parameter, ParametersTypes } from "@/hooks/Endpoints/interfaces";
import { useFormContext } from "./parameterContext";
import { ParameterTableHeader } from "./standardParameter";
import { ValueTypes } from "@/utils/endpoints.functions";

const PathParameters = () => {
  const { parameters } = useFormContext();

  return (
    <div className="flex flex-col gap-4 pt-6 w-full">
      <ParameterTableHeader />
      {parameters
        .filter(
          (p: Parameter) => p.parameterType == ParametersTypes.PathParmater
        )
        .map((parameter: any, index: number) => (
          <ParameterColumn index={index} />
        ))}
    </div>
  );
};

const ParameterColumn = ({ index }: any) => {
  const { parameters, setParameters, setEndpointUrl, endpointUrl } =
    useFormContext();
  const parameter = parameters[index];

  // Local state for the component
  const [localKey, setLocalKey] = useState(parameter?.key);
  const [selectedType, setSelectedType] = useState(parameter?.valueType);
  const [example, setExample] = useState(parameter?.exampleValue);

  useEffect(() => {
    // Update global state when local state changes
    setParameters((prevParameters: any) => {
      const updatedParameters = [...prevParameters];
      updatedParameters[index] = {
        ...updatedParameters[index],
        // name: localKey,
        type: selectedType,
        example: example,
      };
      return updatedParameters;
    });
  }, [localKey, selectedType, example, index, setParameters]);

  useEffect(() => {
    // Update the endpoint URL when the parameter name changes
    //setEndpointUrl(updatedEndpointUrl);
    if (localKey !== parameters[index]?.key) {
      setLocalKey(parameters[index]?.key);
    }
  }, [parameters]);
  const handleTypeChange = (value: any) => {
    setSelectedType(value);
  };

  const getPlaceholder = () => {
    switch (selectedType) {
      case "string":
        return "Enter valid string";
      case "number":
        return "Enter valid number";
      case "boolean":
        return "Enter true/false";
      case "date":
        return "yyyy-mm-dd";
      case "object":
        return "Enter valid JSON object";
      case "time":
        return "Enter valid time";
      default:
        return "";
    }
  };

  const handleDelete = () => {
    // Remove the parameter from the state

    // Update the endpoint URL by removing the parameter
    let updatedEndpointUrl = endpointUrl;

    updatedEndpointUrl = updatedEndpointUrl.replace(
      `/{${parameters[index]?.key}}`,
      ""
    );

    const updatedParameters = parameters.filter(
      (p: any) => p.key !== parameters[index]?.key
    );
    setParameters(updatedParameters);

    setEndpointUrl(updatedEndpointUrl);
  };

  return (
    <div className="flex items-center gap-4 w-full ">
      <Input
        disabled
        className="text-sm text-center w-1/6 "
        type="text"
        placeholder="Name"
        value={localKey}
      />
      <SelectButton
        width="w-[120px]"
        className="text-sm text-center w-4"
        defaultValue={selectedType}
        handleSelectionChange={handleTypeChange}
        name="Type"
        items={ValueTypes}
      />

      <Input
        className="text-sm text-center w-2/6"
        type="text"
        placeholder={getPlaceholder()}
        value={example}
        onChange={(e) => setExample(e.target.value)}
      />
      <div className="flex items-center justify-center w-1/6 space-x-2">
        {/* You can handle the checkbox state here using the global state */}
        {/* <Checkbox id="terms" checked={parameter.required} /> */}
        <Checkbox />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Required
        </label>
      </div>
      <div className="flex items-center justify-center gap-4 w-1/6">
        <img
          src="/icons/delete.svg "
          onClick={handleDelete}
          alt=""
          className="w-4 h-4 pointer"
        />
      </div>
    </div>
  );
};

export default PathParameters;
