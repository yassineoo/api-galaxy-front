import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function SkeletonTable({
  columns,
  name,
}: {
  columns: any;
  name: string;
}) {
  console.log(columns, "columns");

  return (
    <div>
      <h2 className="font-bold m-4"> {name}</h2>
      <div className="rounded-md border bg-white dark:bg-transparent">
        <Table>
          <TableHeader>
            {columns.map((headerGroup: any) => (
              <TableHead key={headerGroup.id}>{headerGroup?.header}</TableHead>
            ))}
            <TableRow></TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              {columns.map((headerGroup: any) => (
                <TableCell colSpan={5} className=" flex text-center">
                  <Skeleton className="h-8 " />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
