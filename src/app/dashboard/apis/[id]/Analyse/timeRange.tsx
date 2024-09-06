import { Button } from "@/components/ui/button";
import { timeFilter } from "@/utils/constants";
import { TimeRangeFilter } from "./interfaces";

function TimeFilterButton({
  value,
  active,
  onClick,
}: {
  value: string;
  active: string;
  onClick: any;
}) {
  return (
    <Button
      variant={active == value ? "default" : "outline"}
      className="flex justify-start rounded-none  " // Adjust spacing as needed
      onClick={() => onClick(value)} // Replace with your desired action
    >
      {value}
    </Button>
  );
}

export default function TimeFilterButtons({
  timeSelected,
  setTimeSelected,
  name,
}: {
  timeSelected: string;
  setTimeSelected: (value: TimeRangeFilter) => void;
  name: string;
}) {
  return (
    <div className="flex w-full flex-col lg:flex-row justify-start gap-2 lg:gap-4 my-3 items-start lg:items-center">
      <h3 className="font-bold"> {name}</h3>
      <div className="flex flex-wrap flex-1 justify-center lg:justify-start  rounded-s-none w-full max-w-full ">
        {timeFilter.map((option) => (
          <TimeFilterButton
            active={timeSelected}
            onClick={() => setTimeSelected(option.value)}
            key={option.value}
            value={option.value}
          />
        ))}
      </div>
    </div>
  );
}
