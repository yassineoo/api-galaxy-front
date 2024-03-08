// app/apis/columns.tsx
import { Button } from "@/components/ui/button";
import { Collection } from "@/hooks/Endpoint collections/interfaces";
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

export const CollectionColumns: ColumnDef<Collection>[] = [
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
