import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Button } from "../../../ui/button";
import AddNewApiForm from "../../genralTab/addApiPopUp";
import AddEndpointsForm from "./endpointsForm";

const AddNewEndpointModal = ({
  Label,
  apiID,
  variant,
  endpoint = {},
  edit,
}: any) => {
  const [isModalOpen, setModalOpen] = useState(false);
  console.log("endpoint00000000000@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log(endpoint);
  console.log("endpoint00000000000@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

  useEffect(() => {
    Modal.setAppElement("body"); // Set the app element to the body element
  }, []);

  const openModal: any = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {variant ? (
        <Button
          onClick={openModal}
          variant="ghost"
          className="text-blue-400 h-8 w-8 p-0"
        >
          {Label}
        </Button>
      ) : (
        <Button onClick={openModal}>{Label}</Button>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "65%",
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

        <AddEndpointsForm
          closeModal={closeModal}
          endpoint={endpoint}
          edit={edit}
          apiID={apiID}
        />
      </Modal>
    </div>
  );
};

export default AddNewEndpointModal;
