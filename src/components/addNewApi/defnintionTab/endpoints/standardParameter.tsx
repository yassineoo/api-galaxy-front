import { SelectButton } from "@/components/dashboard/mainPage/filterGroupColor";
import { Input } from "@/components/ui/input";
import { use, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Parameter, ParametersTypes } from "@/hooks/Endpoints/interfaces";
import { useFormContext } from "./parameterContext";
import { Button } from "@/components/ui/button";
import { randomBytes } from "crypto";

const StandardParameter = ({ parameterType }: any) => {
  const { standardParameters, setStandardParameters } = useFormContext();

  const handleAddParameter = () => {
    const newParameter: Parameter = {
      id: randomBytes(16).toString("hex"),
      key: "",
      exampleValue: "",
      parameterType: parameterType,
      valueType: "string",
      required: false,
    };
    setStandardParameters([...standardParameters, newParameter]);
  };

  return (
    <div className="flex flex-col gap-4 pt-6 w-full">
      <ParameterTableHeader />
      {standardParameters
        .filter((p: Parameter) => p.parameterType == parameterType)
        .map((parameter: any, index: number) => (
          <ParameterColumn key={parameter.id} index={parameter.id} />
        ))}
      <Button onClick={() => handleAddParameter()}>Add parameter</Button>
    </div>
  );
};

export const ParameterTableHeader = () => {
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
  const { standardParameters, setStandardParameters } = useFormContext();
  const parameter = standardParameters.find((p: any) => p.id === index);

  // Local state for the component
  const [isRequired, setIsRequired] = useState(parameter?.required || false);
  const [localKey, setLocalKey] = useState(parameter?.key);
  const [selectedType, setSelectedType] = useState(parameter?.valueType);
  const [example, setExample] = useState(parameter?.exampleValue);

  useEffect(() => {
    // Update global state when local state changes
    setStandardParameters((prevParameters: any) => {
      const updatedParameters = [...prevParameters];
      const parameterIndex = updatedParameters.findIndex(
        (p) => p.id === parameter.id
      );

      if (parameterIndex !== -1) {
        updatedParameters[parameterIndex] = {
          ...updatedParameters[parameterIndex],
          isRequired: isRequired,
          key: localKey,
          valueType: selectedType,
          exampleValue: example,
        };
      }

      return updatedParameters;
    });
  }, [localKey, selectedType, example, isRequired]);

  const handleTypeChange = (value: any) => {
    setSelectedType(value);
  };

  const handleCheckboxChange = () => {
    // Update the checkbox state
    setIsRequired(!isRequired);
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
    const updatedParameters = standardParameters.filter(
      (p: any) => p.id !== parameter.id
    );
    setStandardParameters(updatedParameters);
  };

  return (
    <div className="flex items-center gap-4 w-full ">
      <Input
        className="text-sm text-center w-1/6 "
        type="text"
        placeholder="Name"
        value={localKey}
        onChange={(e) => setLocalKey(e.target.value)}
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
        <Checkbox
          id={`checkbox-${index}`}
          checked={isRequired}
          onClick={handleCheckboxChange}
        />
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

export default StandardParameter;
