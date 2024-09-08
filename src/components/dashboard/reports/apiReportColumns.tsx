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
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative max-w-lg w-full bg-white dark:bg-gray-800 max-h-[80%] overflow-y-auto rounded-lg shadow-lg p-6">
        {/* Screenshots Section */}
        {screenshots && screenshots.length > 0 ? (
          <div className="space-y-4">
            {screenshots.map((sc: string, index: number) => (
              <CldImage
                key={index}
                src={sc}
                alt={"screenshot"}
                className="w-full h-auto object-cover rounded-lg"
                width={400}
                height={300}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No screenshots available
          </p>
        )}

        {/* Close Button */}
        <Image
          src={"/icons/close_icon.svg"}
          alt="close_icon"
          width={24}
          height={24}
          className="absolute top-4 right-4 cursor-pointer hover:opacity-75 transition-opacity duration-150"
          onClick={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
};
