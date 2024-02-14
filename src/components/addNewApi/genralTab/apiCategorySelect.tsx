import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { memo } from "react";

const defaultItems = ["item1", "item2", "item3", "item4", "item5"];

export const ApiCategorySelect = ({
  defaultValue,
  items = defaultItems,
  handleSelectionChange = (value: any) =>
    console.log("default on change", value),
}: any) => {
  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(value) => {
        handleSelectionChange(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={defaultValue} />
      </SelectTrigger>
      <SelectContent>
        {items?.map((item: any) => (
          <SelectItem key={item.ID} value={item.ID}>
            {item.CategoryName} {/* Use the specific property here */}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default memo(ApiCategorySelect);