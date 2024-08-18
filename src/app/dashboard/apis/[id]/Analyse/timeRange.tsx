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
    <div className="flex  justify-start gap-6 my-3 items-center">
      <h3 className="font-bold "> {name}</h3>
      <div className="flex rounded-s-none">
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
