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
  name = "Select",
  defaultValue,
  items = defaultItems,
  handleSelectionChange = (value: any) =>
    console.log("default on change", value),
}: any) => {
  console.log("items", items);
  console.log("items type", typeof items?.length);

  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(value) => {
        handleSelectionChange(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={name} />
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

const FilterGroup = () => {
  return (
    <div className="flex my-4   items-center justify-between w-4/5 m-auto text-black ">
      <SelectButton name="Days" items={["Days", "Months", "Years"]} />
      <SelectButton name="Earnings" items={["Eernings", "Requests"]} />
      <SelectButton name="last 7days" />
      <Button>Apply</Button>
    </div>
  );
};
export default FilterGroup;
