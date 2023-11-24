import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterButton = ({ name }: any) => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={name} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};

const FilterGroup = () => {
  return (
    <div className="flex my-4   items-center justify-between w-4/5 m-auto text-black ">
      <FilterButton name="Days" />
      <FilterButton name="Earnings" />
      <FilterButton name="last 7days" />
      <Button>Apply</Button>
    </div>
  );
};
export default FilterGroup;
