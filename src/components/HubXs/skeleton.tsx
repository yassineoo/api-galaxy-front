import { Skeleton } from "@/components/ui/skeleton";
import { CardContent, Card } from "@/components/ui/card";

export default function CardSkeleton() {
  return (
    <Card>
      <div className="p-6">
        <Skeleton className="h-[200px]" />
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-6 w-[100px]" />
        </div>
      </CardContent>
    </Card>
  );
}
