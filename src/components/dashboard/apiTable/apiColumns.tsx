// app/apis/columns.tsx
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export type ApiEntity = {
  providerID: number;
  Name: string;
  ImagePath: string;
  CategoryID: number;
  Status: string; // Assuming status is a string like 'active', 'inactive', etc.
};

export const columns: ColumnDef<ApiEntity>[] = [
  {
    accessorKey: "Name",
    header: "API Name",
    cell: ({ row }) => row.getValue("Name"),
  },
  {
    accessorKey: "ProviderID",
    header: "Provider ID",
    cell: ({ row }) => row.getValue("ProviderID"),
  },
  {
    accessorKey: "ImagePath",
    header: "Image",
    cell: ({ row }) => <img src={row.getValue("ImagePath")} alt="API Image" />,
  },
  {
    accessorKey: "CategoryID",
    header: "Category ID",
    cell: ({ row }) => row.getValue("CategoryID"),
  },
  {
    accessorKey: "Status",
    header: "Status",
    cell: ({ row }) => row.getValue("Status"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const api = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
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
      );
    },
  },
  // Add more columns as needed
];
