import { Input } from "@/components/ui/input";

export function Search({
  value,
  setValue,
}: {
  value: string;
  setValue: (s: string) => void;
}) {
  return (
    <Input
      type="search"
      placeholder="Search..."
      className="m-auto  lg:w-full"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
