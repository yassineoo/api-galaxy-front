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

export const columns: ColumnDef<any>[] = [
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
        <Button onClick={() => deleteReviewReport(row.getValue("id"))}>
          Delete
        </Button>
      );
    },
  },
  // Add more columns as needed
];
