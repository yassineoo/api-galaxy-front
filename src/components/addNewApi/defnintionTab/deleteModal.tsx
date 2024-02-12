import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Button } from "../../ui/button";

const DeleteModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("body"); // Set the app element to the body element
  }, []);

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
      <img
        src="/icons/delete.svg "
        onClick={openModal}
        alt=""
        className="w-4 h-4 pointer"
      />

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
        {/*<span className="close" onClick={closeModal}>
          &times;
        </span> */}

        <div className="flex flex-col justify-between items-start gap-4">
          <h1 className="text-2xl font-bold">Delete Path Parmeter </h1>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={closeModal}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteModal;
