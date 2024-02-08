import React, { useState } from "react";
import Modal from "react-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

const PopupForm = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal}>Open Popup</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "50%",
            margin: "auto",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
          },
        }}
      >
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-start gap-4">
              <img src="/icons/add-api.svg" alt="" className="w-4 h-4 ml-2 " />
              <CardTitle className="text-2xl">Monetize Your Api</CardTitle>
            </div>
            <CardDescription>
              Update Information about your API Plans
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm">
            <Button className="w-1/3" onClick={closeModal}>
              Discard
            </Button>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
};

export default PopupForm;
