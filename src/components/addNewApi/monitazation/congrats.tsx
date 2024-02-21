import React from "react";
import { FaCheckCircle } from "react-icons/fa";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteApiEndpoints } from "@/hooks/Endpoints/Endpoints.Mutation";

export function Congratulations({ action, endpoint, name }: any) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className=" mt-6">Subscribe</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-8 flex justify-center gap-10 items-center">
            Congratulations! <FaCheckCircle size={50} color="#28a745" />{" "}
          </AlertDialogTitle>
          <AlertDialogDescription className="w-full text-center">
            You have successfully subscribed 🎉
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Congratulations;
