import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";

type TableColumn = {
  header: string;
  id?: string; // Optional for unique key
};

interface SkeletonTableProps {
  columns: any[];
  name: string;
  rows?: number; // Optional for number of skeleton rows
}

export function SkeletonTable({ columns, name, rows = 1 }: SkeletonTableProps) {
  return (
    <div>
      <h2 className="font-bold m-4"> {name}</h2>
      <div className="rounded-md border bg-white dark:bg-transparent">
        <Table>
          <TableHeader>
            {/* Single TableRow with multiple TableHead elements */}
            <TableRow>
              {columns.map((column: TableColumn) => (
                <TableHead key={column.id || column.header}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id || column.header}
                    className="flex text-center"
                  >
                    <Skeleton className="h-8 w-24 " />
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id || column.header}
                    className="flex text-center"
                  >
                    <Skeleton className="h-8 w-24 " />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
