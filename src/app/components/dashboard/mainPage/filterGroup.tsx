import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultItems = ["item1", "item2", "item3", "item4", "item5"];

export const FilterButton = ({ name, items = defaultItems }: any) => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={name} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item: any) => (
          <SelectItem value={item}>{item}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const FilterGroup = () => {
  return (
    <div className="flex my-4   items-center justify-between w-4/5 m-auto text-black ">
      <FilterButton name="Days" items={["Days", "Months", "Years"]} />
      <FilterButton name="Earnings" items={["Eernings", "Requests"]} />
      <FilterButton name="last 7days" />
      <Button>Apply</Button>
    </div>
  );
};
export default FilterGroup;
