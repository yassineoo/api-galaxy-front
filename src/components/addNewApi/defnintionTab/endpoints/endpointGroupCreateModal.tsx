import React, { use, useEffect, useState } from "react";
import Modal from "react-modal";
import { Button } from "../../../ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCreateEndpointsGroup } from "@/hooks/Endpoints Group/EndpointsGroup.Mutation";
import { Textarea } from "@/components/ui/textarea";

const CreateEndpointsGroupForm = ({ apiId }: any) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const createEndpointGroup = useCreateEndpointsGroup();

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
    try {
      e.preventDefault();
      createEndpointGroup.mutate({
        ApiId: apiId,
        Group: groupName,
        Description: groupDescription,
      });
      // Handle form submission logic here
      closeModal();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <Button onClick={openModal}>Add New Group</Button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "40%",
            height: "75%",
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

        <Card className="w-full border-none shadow-none">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-start gap-4">
              <img src="/icons/add-api.svg" alt="" className="w-4 h-4 ml-2 " />
              <h2 className="text-2xl">Add New Group</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col justify-start gap-2">
              <h3>Group Name</h3>
              <div className="flex items-center justify-start gap-2">
                <Input
                  id="group-name"
                  type="text"
                  placeholder="Group Name"
                  value={groupName}
                  onChange={(event) => setGroupName(event.target.value)}
                />
              </div>
              <div className="flex flex-col justify-start gap-2">
                <h3>Group Description</h3>
                <div className="flex items-center justify-start gap-2">
                  <Textarea
                    id="group-description"
                    placeholder="Group Description"
                    value={groupDescription}
                    onChange={(event) =>
                      setGroupDescription(event.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="w-full gap-4 m-auto  flex items-center justify-center">
            <Button className="w-1/3" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              className={`w-5/12  ${
                createEndpointGroup.isPending
                  ? "bg-gray-500"
                  : "bg-blue-500 hover:bg-blue-700"
              } ${
                createEndpointGroup.isPending
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={handleSubmit}
              disabled={createEndpointGroup.isPending}
            >
              {createEndpointGroup.isPending ? (
                <span className="flex items-center">
                  Creating...
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                </span>
              ) : (
                "Create"
              )}
            </Button>
          </CardFooter>
        </Card>
      </Modal>
    </div>
  );
};

export default CreateEndpointsGroupForm;
