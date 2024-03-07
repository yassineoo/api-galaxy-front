import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Button } from "../../../ui/button";
import AddNewApiForm from "../../genralTab/addApiPopUp";
import AddEndpointsForm from "./endpointsForm";
import ImportEndpoint from "./importEndpoint";

const AddNewEndpointModal = ({ apiID }: any) => {
  const [isModalOpen, setModalOpen] = useState(false);
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
      <Button onClick={openModal} className=" ">
        Import Docs
      </Button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            height: "90%",
            width: "90%",
            marginBottom: "0px",
            backgroundColor: "white",
            paddingBottom: "0px",
            borderRadius: "8px",
          },
        }}
      >
        {/*<span className="close" onClick={closeModal}>
          &times;
        </span> */}

        <ImportEndpoint apiID={apiID} />
      </Modal>
    </div>
  );
};

export default AddNewEndpointModal;
