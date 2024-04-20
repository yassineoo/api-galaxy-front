// app/apis/columns.tsx
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";

export const HealthCheckcolumns: ColumnDef<any>[] = [
  {
    accessorKey: "CheckedAt", // Access the nested Name property
    header: "CheckedAt",
    cell: ({ row }) => row.getValue("CheckedAt"), // Access the nested Name property
  },

  {
    accessorKey: "Status",
    header: "Status",
    cell: ({ row }) => {
      row.getValue("Status") == "Success" ? (
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500" />
          <span className="text-green-500 font-medium">Success</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="text-red-500 font-medium">Failed</span>
        </div>
      );
    },
  },
  {
    accessorKey: "ResponseTime",
    header: "Latency",
    cell: ({ row }) => row.getValue("ResponseTime"),
  },

  // Add more columns as needed
];

/*

   <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="text-blue-400">Move To</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-gray-300 shadow-lg p-2 cursor-pointer space-y-2"
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(api.providerID.toString())
                }
              >
                Copy Provider ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View API Details</DropdownMenuItem>
              <DropdownMenuItem>Edit API</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

*/
