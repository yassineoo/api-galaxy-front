// app/apis/columns.tsx
import { Button } from "@/components/ui/button";
import { deleteReview } from "@/actions/api";
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
import { useQueryClient } from "@tanstack/react-query";
import { useAuthSession } from "@/components/auth-provider";

export type ApiEntity = {
  providerID: number;
  Name: string;
  ImagePath: string;
  CategoryID: number;
  Status: string; // Assuming status is a string like 'active', 'inactive', etc.
};

export const columns: ColumnDef<ApiEntity>[] = [
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => row.getValue("reason"),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.getValue("description"),
  },
  {
    accessorKey: "comment",
    header: "Review",
    cell: ({ row }) => row.getValue("comment"),
  },
  {
    accessorKey: "username",
    header: "Author",
    cell: ({ row }) => row.getValue("username"),
  },
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => row.getValue("id"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const query = useQueryClient();
      const { session } = useAuthSession();

      const deleteReviewReport = (id: number) => {
        deleteReview(id, session?.token ?? "");
        query.invalidateQueries({ queryKey: ["reviewReportsList"] });
      };
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
              onClick={() => deleteReviewReport(row.getValue("id"))}
            >
              delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  // Add more columns as needed
];
