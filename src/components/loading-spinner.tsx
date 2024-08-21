import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

export default function LoadingSpinner({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={cn("grid w-full h-full place-content-center", className)}>
      <Loader2Icon className="animate-spin size-10" />
    </div>
  );
}
