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
    header: "Cllection Name",
    cell: ({ row }) => row.getValue("Name"),
  },
  {
    accessorKey: "Description",
    header: "Description",
    cell: ({ row }) => row.getValue("Description"),
  },

  // Add more columns as needed
];
