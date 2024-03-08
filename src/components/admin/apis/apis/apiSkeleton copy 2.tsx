import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function SkeletonTable() {
  return (
    <div>
      <h2 className="font-bold m-4"> Api List</h2>
      <div className="rounded-md border bg-white dark:bg-transparent">
        <Table>
          <TableHeader>
            <TableRow></TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="h-24 flex text-center">
                <Skeleton className="h-4 " />
                <Skeleton className="h-4 " />

                <Skeleton className="h-4 " />
                <Skeleton className="h-4 " />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
