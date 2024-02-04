// app/apis/columns.tsx
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";

export const Endpointscolumns: ColumnDef<any>[] = [
  {
    accessorKey: "GroupName", // Access the nested Name property
    header: "Group",
    cell: ({ row }) => row.getValue("GroupName"), // Access the nested Name property
  },
  {
    accessorKey: "Name", // Access the nested Name property
    header: "Name",
    cell: ({ row }) => row.getValue("Name"), // Access the nested Name property
  },
  {
    accessorKey: "Methode",
    header: "Method",
    cell: ({ row }) => row.getValue("Methode"),
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
