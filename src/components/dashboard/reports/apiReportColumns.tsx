// app/apis/columns.tsx
import Image from "next/image";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { CldImage } from "next-cloudinary";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.getValue("description"),
  },
  {
    accessorKey: "user_id",
    header: "Reportor",
    cell: ({ row }) => row.getValue("user_id"),
  },
  {
    accessorKey: "name",
    header: "API Name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "screenshots",
    header: "Proofs",
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);
      const handleClose = () => setIsOpen(false);
      return (
        <div>
          <Image
            onClick={() => setIsOpen(true)}
            src={"/icons/eye_icon.svg"}
            alt="eye"
            width={20}
            height={20}
          />
          <Dialog
            setIsOpen={handleClose}
            isOpen={isOpen}
            screenshots={row.getValue("screenshots")}
          />
        </div>
      );
    },
  },
  // Add more columns as needed
];

const Dialog = ({
  isOpen,
  setIsOpen,
  screenshots,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  screenshots: string[];
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#00000030] flex items-center justify-center">
      <div className="relative max-w-lg w-full bg-white max-h-[60%] overflow-y-scroll p-4">
        {screenshots.map((sc: string) => (
          <CldImage
            src={sc}
            alt={"screenshot"}
            className="w-full bg-cover"
            width={200}
            height={200}
          />
        ))}

        <Image
          src={"/icons/close_icon.svg"}
          alt="close_icon"
          width={20}
          height={20}
          className="absolute top-3 right-3"
          onClick={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
};
