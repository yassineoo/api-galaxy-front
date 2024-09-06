"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AuthorizationModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const handleCloseModal = () => {
    closeModal();
  };
  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>You are Unauthorized</DialogTitle>
          <DialogDescription>
            You are unauthorized to visit the last page , please login first .
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
