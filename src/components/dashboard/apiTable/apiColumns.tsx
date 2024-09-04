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
import Link from "next/link";
import { useUpdateStatusApi } from "@/hooks/apis/api.Mutation";
import { useAuthSession } from "@/components/auth-provider";

export type ApiEntity = {
  providerID: number;
  Name: string;
  ImagePath: string;
  CategoryID: number;
  Status: string; // Assuming status is a string like 'active', 'inactive', etc.
  id: number;
};

export const columns: ColumnDef<ApiEntity>[] = [
  {
    accessorKey: "name",
    header: "API Name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "provider_id",
    header: "Provider ID",
    cell: ({ row }) => row.getValue("provider_id"),
  },
  {
    accessorKey: "image_path",
    header: "Image",
    cell: ({ row }) => (
      <CldImage
        src={`${row.getValue("image_path")}`}
        width={40}
        height={40}
        alt="API Image"
      />
    ),
  },
  {
    accessorKey: "category_id",
    header: "Category ID",
    cell: ({ row }) => row.getValue("category_id"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => row.getValue("status"),
  },
  {
    accessorKey: "id",
    header: "API Id",
    cell: ({ row }) => row.getValue("id"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const api = row.original;
      console.log("api", api);
      const { session } = useAuthSession();
      const { mutate: publishApi, isPending } = useUpdateStatusApi(
        session?.token || ""
      );

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
            <DropdownMenuItem>
              <Link href={`/api/${api.id}`}>View API Details</Link>{" "}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                publishApi(api.id);
              }}
            >
              Publish Api
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  // Add more columns as needed
];
