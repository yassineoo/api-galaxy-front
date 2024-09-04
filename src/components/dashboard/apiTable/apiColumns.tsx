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
      const {
        mutate: publishApi,
        isPending,
        isSuccess,
      } = useUpdateStatusApi(session?.token || "");

      return (
        <div className="flex items-center justify-center gap-8 w-full">
          {isSuccess ? (
            <Button variant="ghost" className=" px-3" disabled>
              Published
            </Button>
          ) : isPending ? (
            <Button variant="ghost" className=" px-3" disabled>
              Publishing...
            </Button>
          ) : (
            <Button
              // variant="ghost"
              className=" px-3"
              onClick={() => {
                publishApi(api.id);
              }}
            >
              Publish
            </Button>
          )}
          <Button variant="ghost" className="h-8 w-8 p-0">
            <Link href={`/api/${api.id}`}>View Details</Link>{" "}
          </Button>
        </div>
      );
    },
  },
  // Add more columns as needed
];
