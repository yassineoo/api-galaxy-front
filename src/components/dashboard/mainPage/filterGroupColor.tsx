import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultItems = ["item1", "item2", "item3", "item4", "item5"];

export const SelectButtonColor = ({
  width = "w-[180px]",
  name = "Select",
  defaultValue,
  items = defaultItems,
  handleSelectionChange,
}: any) => {
  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(value) => {
        handleSelectionChange(value);
      }}
    >
      <SelectTrigger className={`${width}`}>
        <SelectValue placeholder={defaultValue} />
      </SelectTrigger>
      <SelectContent>
        {items?.map(({ value, color }: any) => (
          <SelectItem key={value} value={value} style={{ color: color }}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectButtonColor;
