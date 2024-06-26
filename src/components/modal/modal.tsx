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
import { SetStateAction } from "react";

export default function EmailModal({
  closeModal,
}: {
  closeModal: (value: SetStateAction<boolean>) => void;
}) {
  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Your Email</DialogTitle>
          <DialogDescription>
            We've sent a confirmation email to your inbox. Please check your
            email and click the link to activate your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => closeModal(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
