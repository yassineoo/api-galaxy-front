"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Input } from "../../ui/input";
import { useCreateApi } from "@/hooks/apis/api.Mutation";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";
import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import { useAuthSession } from "@/components/auth-provider";

export default function AddNewApiForm({ closeModal }: any) {
  const router = useRouter();

  // Define states for input fields
  const [name, setName] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [image, setImage] = useState(""); // Change to empty string
  const [keywords, setKeywords] = useState("");
  const [description, setDescription] = useState("");

  // Create a ref for file input
  const fileInputRef = useRef<HTMLButtonElement>(null);

  const { session } = useAuthSession();
  const {
    mutateAsync: createApi,
    isError,
    isPending,
    error,
    isSuccess,
  } = useCreateApi(session?.token || "");

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const Data = {
        Name: name,
<<<<<<< HEAD
        ProviderID: session?.userId || 1,
=======
        ProviderID: session?.userId ||1,
>>>>>>> 2cfc2ee049048682233c1833503387fe169c7b5f
        ApiUrl: apiUrl,
        CategoryID: 1,
        ImagePath: image, // Use the fake URL for testing
        Keywords: keywords,
        Description: description,
      };

      const res = await createApi(Data);

      router.push(`/dashboard/apis/${res.ID}/configuration`);
      closeModal();

      console.log("API entity created successfully!");
    } catch (error) {
      console.error("Error creating API entity:", error);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error("Error saving the modification try agian !");
    }
    if (isSuccess) {
      toast.success("you api has been modified succufully!");
    }
  }, [isError, isSuccess]);

  // Handle click on placeholder image
  const handleImagePlaceholderClick = () => {
    fileInputRef?.current?.click(); // Programmatically trigger file input click
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-start gap-4">
          <img src="/icons/add-api.svg" alt="" className="w-4 h-4 ml-2 " />
          <CardTitle className="text-2xl">Add New Api</CardTitle>
        </div>
        <CardDescription>
          Create your own API and share it with the world
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex justify-start gap-2">
            <label htmlFor="Name" style={{ width: "25%" }}>
              Name
            </label>
            <Input
              id="Name"
              type="text"
              placeholder="Google Translator"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="flex justify-start gap-2">
            <label htmlFor="ApiUrl" style={{ width: "25%" }}>
              API URL
            </label>
            <Input
              id="ApiUrl"
              type="text"
              placeholder="https://api.example.com"
              value={apiUrl}
              onChange={(event) => setApiUrl(event.target.value)}
            />
          </div>
          <div className="flex justify-start gap-2">
            <label htmlFor="Image" style={{ width: "25%" }}>
              Image
            </label>
            <CldUploadWidget
              // Add this line

              uploadPreset="Pfe_Uplaod"
              onSuccess={(results) => {
                if (typeof results.info === "string") return;
                console.log("Public ID", results?.info?.public_id);
                setImage(results?.info?.public_id as string);
              }}
            >
              {({ open }) => {
                return (
                  <Button
                    ref={fileInputRef}
                    className="hidden"
                    onClick={() => open()}
                  >
                    Upload an Image
                  </Button>
                );
              }}
            </CldUploadWidget>
            {image ? (
              <CldImage
                src={image}
                alt="Selected Image"
                className="mt-2"
                width={200}
                height={200}
                style={{ maxWidth: "200px", cursor: "pointer" }}
                onClick={handleImagePlaceholderClick} // Add this line
              />
            ) : (
              <img
                src="/icons/placeholder-image.svg"
                alt="Placeholder Image"
                className="mt-2"
                style={{ maxWidth: "200px", cursor: "pointer" }}
                onClick={handleImagePlaceholderClick} // Add this line
              />
            )}
          </div>
          <div className="flex justify-start gap-2">
            <label htmlFor="Keywords" style={{ width: "25%" }}>
              Keywords
            </label>
            <Input
              id="Keywords"
              type="text"
              placeholder="Keyword1, Keyword2, Keyword3"
              value={keywords}
              onChange={(event) => setKeywords(event.target.value)}
            />
          </div>
          <div className="flex justify-start gap-2">
            <label htmlFor="Description" style={{ width: "25%" }}>
              Description
            </label>
            <Input
              id="Description"
              type="text"
              placeholder="Description about the API"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="w-full gap-4 m-auto  flex items-center justify-center">
        <Button className="w-1/3" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          className={`w-5/12  ${
            isPending ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
          } ${isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? (
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 016 12H2c0 3.042 1.135 5.824 3 7.938l1-1.647zM18 12a6.91 6.91 0 00-3-5.659V7h-1V4h4v4h-1v2h1a8 8 0 005-2.647l-1 1.646zM18 14h1v2h-4v-4h1V7h-1v-.344A8 8 0 0020 12h-2z"
                ></path>
              </svg>
            </span>
          ) : (
            "Create Api"
          )}
        </Button>
        {/* Display an error message if there is an error */}
        {isError && <p className="text-red-500">{error.message}</p>}
      </CardFooter>
    </Card>
  );
}
