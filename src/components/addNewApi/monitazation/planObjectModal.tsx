import { SelectButton } from "@/components/dashboard/mainPage/filterGroup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import MultiSelect from "./object";
import { AlertDialogDemo } from "../defnintionTab/deleteModal";

const PlanObjectModal = ({
  edit,
  objectSelceted,
  setObjectList,
  optionsList,
}: any) => {
  const options = optionsList.map((item: any) => {
    return { value: item.ID, label: item.Name };
  });
  const [isModalOpen, setModalOpen] = useState(false);

  const [Name, setName] = useState(objectSelceted?.Name || "");
  const [Description, setDescription] = useState(
    objectSelceted?.Description || ""
  );
  const [endpointList, setEndpointList] = useState(
    objectSelceted.Endpoints || []
  );

  const openModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    Modal.setAppElement("body"); // Set the app element to the body element
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSelectChange = (selectedOptions: any) => {
    setEndpointList(selectedOptions);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setObjectList((prev: any) => {
      return prev.map((item: any) => {
        if (item.ID === objectSelceted.ID) {
          return {
            ...item,
            Name: Name,
            Description: Description,
            Endpoints: endpointList,
          };
        }
        return item;
      });
    });
    // Handle form submission logic here
    closeModal();
  };

  const handleDeleteObject = () => {
    setObjectList((prev: any) => {
      console.log(objectSelceted.ID, prev);

      return prev.filter((item: any) => item.ID != objectSelceted.ID);
    });
  };

  return (
    <div className="w-full ">
      <div className="flex justify-start gap-1 items-center col-span-1 ">
        <AlertDialogDemo action={handleDeleteObject} name="object" />

        <Button
          variant="ghost"
          className=" px-1 text-sm flex justify-center items-center"
          onClick={openModal}
        >
          {edit ? objectSelceted.Name : "Add New Object"}
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            height: "85%",
            width: "50%",
            margin: "auto",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
          },
        }}
      >
        <Card className="w-full border-none shadow-none">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-start gap-4">
              <img src="/icons/add-api.svg" alt="" className="w-4 h-4 ml-2 " />
              <h2 className="text-2xl"> Plan Object </h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col justify-start gap-2">
              <h3>Name</h3>
              <div className="flex items-center justify-start gap-2">
                <Input
                  id="group-Name"
                  type="text"
                  placeholder="Object  Name"
                  value={Name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="flex flex-col justify-start gap-2">
                <h3>Description</h3>
                <div className="flex items-center justify-start gap-2">
                  <Textarea
                    id="group-Description"
                    placeholder="Object Description"
                    value={Description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-start gap-2">
                <MultiSelect
                  options={options}
                  selectedValues={endpointList}
                  onChange={handleSelectChange}
                />
              </div>
              <hr className="my-2 border-t" />
            </div>
          </CardContent>
          <CardFooter className="w-full gap-4 m-auto  flex items-center justify-center">
            <Button className="w-1/3" onClick={closeModal}>
              Cancel
            </Button>
            <Button className={`w-5/12 `} onClick={handleSubmit}>
              Save
            </Button>
          </CardFooter>
        </Card>
      </Modal>
    </div>
  );
};

export default PlanObjectModal;
