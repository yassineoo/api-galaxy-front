import React, { useState } from "react";
import Select from "react-select";

export const SelectMulti = () => {
  const options = [
    { value: 14, label: "getClients" },
    { value: 12, label: "getUserd" },
    { value: 13, label: "getAdmins" },
    // Add more options as needed
  ];

  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelectChange = (selectedOptions: any) => {
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

const MultiSelect = ({ options, selectedValues, onChange }: any) => {
  return (
    <Select
      isMulti
      options={options}
      value={selectedValues}
      onChange={onChange}
    />
  );
};

export default MultiSelect;
