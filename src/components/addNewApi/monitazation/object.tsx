import { SelectOptions } from "@/app/dashboard/apis/[id]/Analyse/interfaces";
import React, { useState } from "react";
import Select, { MultiValue } from "react-select";

export const SelectMulti = () => {
  const options: SelectOptions = [
    { value: 14, label: "getClients" },
    { value: 12, label: "getUserd" },
    { value: 13, label: "getAdmins" },
    // Add more options as needed
  ];

  const [selectedValues, setSelectedValues] = useState<SelectOptions>([]);

  const handleSelectChange = (selectedOptions: SelectOptions) => {
    setSelectedValues(selectedOptions);
  };

  return (
    <div>
      <h1>Your Component</h1>
      <MultiSelect
        options={options}
        selectedValues={selectedValues}
        onChange={handleSelectChange}
      />
    </div>
  );
};

const MultiSelect = ({
  options,
  selectedValues,
  onChange,
}: {
  options: SelectOptions;
  selectedValues: SelectOptions;
  onChange: (selectOption: SelectOptions) => void;
}) => {
  return (
    <Select
      className="text-black"
      isMulti
      options={options}
      value={selectedValues}
      onChange={onChange}
    />
  );
};

export default MultiSelect;
