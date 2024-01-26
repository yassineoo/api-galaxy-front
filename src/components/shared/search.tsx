import { Input } from "@/components/ui/input";

export function Search() {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="m-auto md:w-[100px] lg:w-full"
      />
    </div>
  );
}
