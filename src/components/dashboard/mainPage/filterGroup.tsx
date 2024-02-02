import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultItems = ["item1", "item2", "item3", "item4", "item5"];

export const SelectButton = ({
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
        <SelectValue placeholder={name} />
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

const FilterGroup = () => {
  const daysItems = [
    { value: "Days", color: "blue" },
    { value: "Months", color: "green" },
    { value: "Years", color: "red" },
  ];

  const earningsItems = [
    { value: "Earnings", color: "darkorange" },
    { value: "Requests", color: "darkcyan" },
  ];

  return (
    <div className="flex my-4 items-center justify-between w-4/5 m-auto text-black">
      <SelectButton name="Days" items={daysItems} />
      <SelectButton name="Earnings" items={earningsItems} />
      <SelectButton name="last 7 days" />
      <Button>Apply</Button>
    </div>
  );
};

export default FilterGroup;
