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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getColorByLetter } from "@/app/dashboard/inbox/chats_list";
import Link from "next/link";
import { useUpdateStatusUser } from "@/hooks/apis/api.Mutation";
import { useAuthSession } from "@/components/auth-provider";

export type UserEntity = {
  id: number;
  name: string;
  email: string;
  role: string;
  image_path: string;
  is_active: boolean;
  last_login: string;
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
    cell: ({ row }) => {
      return row.getValue("image_path") ? (
        <CldImage
          src={`${row.getValue("image_path")}`}
          width={20}
          height={20}
          alt="API Image"
        />
      ) : (
        <Avatar>
          <AvatarImage alt="Avatar" src={row.getValue("username")} />
          <AvatarFallback
            className={`text-lg uppercase text-white ${getColorByLetter(
              (row.getValue("username") as string).charAt(0)
            )}`}
          >
            {(row.getValue("username") as string).charAt(0)}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => row.getValue("role"),
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => (row.getValue("is_active") ? "Active" : "Inactive"),
  },
  {
    accessorKey: "last_login",
    header: "last_login",
    cell: ({ row }) => row.getValue("last_login"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const api = row.original;

      const { session } = useAuthSession();
      const {
        mutate: banUser,
        isPending,
        isSuccess,
      } = useUpdateStatusUser(session?.token || "");

      return (
        <div className="flex items-center justify-center gap-8 w-full">
          {isSuccess ? (
            <Button variant="ghost" className=" px-3" disabled>
              Banned
            </Button>
          ) : isPending ? (
            <Button variant="ghost" className=" px-3" disabled>
              Loading...
            </Button>
          ) : (
            <Button
              // variant="ghost"
              className=" px-3"
              onClick={() => {
                banUser(api.id);
              }}
            >
              Ban user
            </Button>
          )}
        </div>
      );
    },
  },
  // Add more columns as needed
];
