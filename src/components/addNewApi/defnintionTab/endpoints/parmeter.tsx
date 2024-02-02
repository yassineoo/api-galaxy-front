import { SelectButton } from "@/components/dashboard/mainPage/filterGroup";
import { Input } from "@/components/ui/input";
import { use, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Parameter, ParametersTypes } from "@/hooks/Endpoints/interfaces";
import { useFormContext } from "./parameterContext";

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

const ParameterTableHeader = () => {
  return (
    <div className="flex items-center gap-4 w-full bg-blue-200 rounded-sm p-2">
      <label className="text-sm text-center w-1/6">Name</label>
      <label className="text-sm text-center w-[120px]">Type</label>
      <label className="text-sm text-center w-2/6">Example value</label>
      <label className="text-sm text-center w-1/6">Required</label>
      <label className="text-sm text-center w-1/6">Actions</label>
    </div>
  );
};

const ParameterColumn = ({ index }: any) => {
  const { parameters, setParameters, setEndpointUrl, endpointUrl } =
    useFormContext();
  const parameter = parameters[index];
  console.log("parameter", parameter);

  // Local state for the component
  const [localKey, setLocalKey] = useState(parameter?.key);
  const [selectedType, setSelectedType] = useState(parameter?.type);
  const [example, setExample] = useState(parameter?.example);

  useEffect(() => {
    // Update global state when local state changes
    setParameters((prevParameters: any) => {
      console.log(prevParameters);
      console.log(localKey, selectedType, example);

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
      console.log(
        "=////////////////////////////////////////////=======================",
        localKey,
        index,
        parameters[index]?.key
      );
      setLocalKey(parameters[index]?.key);
    }
    console.log(
      "parameters updating localKey =======================",
      index,
      localKey,
      parameters[index]?.key
    );
    console.log(parameters);
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
    console.log("updatedEndpointUrl original", endpointUrl);

    console.log(
      `updatedEndpointUrl wt should be replaced : /{${parameters[index]?.key}}`
    );
    updatedEndpointUrl = updatedEndpointUrl.replace(
      `/{${parameters[index]?.key}}`,
      ""
    );

    console.log("updatedEndpointUrl final", updatedEndpointUrl);
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
        //onChange={(e) => setlocalKey(e.target.value)}
      />
      <SelectButton
        width="w-[120px]"
        className="text-sm text-center w-4"
        defaultValue={selectedType}
        handleSelectionChange={handleTypeChange}
        name="Type"
        items={[
          { value: "string", color: "black" },
          { value: "number", color: "black" },
          { value: "boolean", color: "black" },
          { value: "date", color: "black" },
          { value: "object", color: "black" },
          { value: "time", color: "black" },
        ]}
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
