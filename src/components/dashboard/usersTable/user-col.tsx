// app/apis/columns.tsx
import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";
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

export type UserEntity = {
  id: number;
  name: string;
  email: string;
  role: string;
  image_path: string;
};

export const userColumn: ColumnDef<UserEntity>[] = [
  {
    accessorKey: "username",
    header: "UserName",
    cell: ({ row }) => row.getValue("username"),
  },
  {
    accessorKey: "email",
    header: "email",
    cell: ({ row }) => row.getValue("email"),
  },
  {
    accessorKey: "image_path",
    header: "Image",
    cell: ({ row }) => (
      <CldImage
        src={`${row.getValue("image_path")}`}
        width={20}
        height={20}
        alt="API Image"
      />
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => row.getValue("role"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => row.getValue("status"),
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
              onClick={() => navigator.clipboard.writeText(api.name.toString())}
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
