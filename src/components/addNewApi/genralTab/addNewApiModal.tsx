import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Button } from "../../ui/button";
import AddNewApiForm from "./addApiPopUp";

const AddNewApiModal = () => {
  const [isModalOpen, setModalOpen] = useState(true);

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
      <Button onClick={openModal}>Add New Api</Button>
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

        <AddNewApiForm closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default AddNewApiModal;
