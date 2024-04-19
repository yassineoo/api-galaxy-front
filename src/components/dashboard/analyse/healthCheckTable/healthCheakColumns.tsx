// app/apis/columns.tsx
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";

export const HealthCheckcolumns: ColumnDef<any>[] = [
  {
    accessorKey: "Timestamp", // Access the nested Name property
    header: "Time",
    cell: ({ row }) => row.getValue("Timestamp"), // Access the nested Name property
  },

  {
    accessorKey: "EndpointName", // Access the nested Endpoint property
    header: "Endpoint",
    cell: ({ row }) => row.getValue("EndpointName"), // Access the nested Name property
  },

  {
    accessorKey: "Methode",
    header: "Method",
    cell: ({ row }) => row.getValue("Methode"),
  },
  {
    accessorKey: "Status",
    header: "Status",
    cell: ({ row }) => row.getValue("Status"),
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
