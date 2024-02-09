import { SelectButton } from "@/components/dashboard/mainPage/filterGroup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { set } from "date-fns";
import { title } from "process";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import MultiSelect from "./object";

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

  const [name, setName] = useState(objectSelceted?.name || "");
  const [description, setDescription] = useState(
    objectSelceted?.description || ""
  );
  const [endpointList, setEndpointList] = useState(
    objectSelceted.endpoints || []
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
        if (item.id === objectSelceted.id) {
          return {
            ...item,
            name: name,
            description: description,
            endpoints: endpointList,
          };
        }
        return item;
      });
    });
    // Handle form submission logic here
    closeModal();
  };

  return (
    <div className="w-full ">
      <Button
        variant="ghost"
        className="col-span-1 flex justify-center items-center"
        onClick={openModal}
      >
        {edit ? objectSelceted.name : "Add New Object"}
      </Button>

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
                  id="group-name"
                  type="text"
                  placeholder="Object  Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="flex flex-col justify-start gap-2">
                <h3>Description</h3>
                <div className="flex items-center justify-start gap-2">
                  <Textarea
                    id="group-description"
                    placeholder="Object Description"
                    value={description}
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

export const PriceInput = ({ price, setPrice, label, unite }: any) => {
  return (
    <div className="flex items-center gap-4 py-1">
      <label className="w-1/3" htmlFor="price-number">
        {label}
      </label>

      <Input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        id="price-number"
        placeholder="Enter number"
        className="w-1/3"
      />
      <p>{unite}</p>
    </div>
  );
};
