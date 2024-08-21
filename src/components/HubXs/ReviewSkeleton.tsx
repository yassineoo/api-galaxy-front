import { Skeleton } from "@/components/ui/skeleton";
import { CardContent, Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReviewSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-[150px]" /> {/* Placeholder for reviewer's name */}
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" /> {/* Placeholder for rating */}
          <Skeleton className="h-6 w-full" />    {/* Placeholder for review text line 1 */}
          <Skeleton className="h-6 w-[80%]" />   {/* Placeholder for review text line 2 */}
          <Skeleton className="h-6 w-[60%]" />   {/* Placeholder for review text line 3 */}
        </div>
      </CardContent>
    </Card>
  );
}