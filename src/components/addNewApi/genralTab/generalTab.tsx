"use client";
import { use, useCallback, useEffect, useRef, useState } from "react";
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
import { useUpdateApi } from "@/hooks/apis/api.Mutation";
import ProductCard from "./productCard";
import { useApiCategoryList } from "@/hooks/apisCategory/apiCategory.queries";
import { Switch } from "../../ui/switch";
import { Label } from "../../ui/label";
import ApiCategorySelect from "./apiCategorySelect";
import { ToastAction } from "@/components/ui/toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GenralApiInfoTab({ api }: any) {
  // Define states for input fields
  const [name, setName] = useState(api.Name);
  const [categoryId, setCategoryId] = useState(api.CategoryID);
  const [apiUrl, setApiUrl] = useState(api.ApiUrl);
  const [image, setImage] = useState(api.ImagePath); // Change to empty string
  const [keywords, setKeywords] = useState(api.Keywords);
  const [description, setDescription] = useState(api.Description);
  const [Visibility, setVisibility] = useState(api.Visibility);

  // Create a ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  const apiCategoryListQuery = useApiCategoryList();

  const {
    mutate: updateApi,
    isError,
    isPending,
    error,
    isSuccess,
  } = useUpdateApi();

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setImage(file ? URL.createObjectURL(file) : ""); // Use a fake URL for testing
  };
  useEffect(() => {
    if (isError) {
      toast.error("Error saving the modification try agian !");
    }
    if (isSuccess) {
      toast.success("you api has been modified succufully!");
    }
  }, [isError, isSuccess]);
  // Handle form submission
  const handleSubmit = async () => {
    try {
      const Data = {
        ID: api.ID,
        Name: name,
        ProviderID: 21,
        ApiUrl: apiUrl,
        CategoryID: categoryId,
        ImagePath: image, // Use the fake URL for testing
        Keywords: keywords,
        Description: description,
        Visibility: Visibility,
      };

      await updateApi(Data);
      //closeModal();

      console.log("API entity updated successfully!");
    } catch (error) {
      //errorToast();
      console.error("Error creating API entity:", error);
    }
  };

  // Handle click on placeholder image
  const handleImagePlaceholderClick = () => {
    fileInputRef?.current?.click(); // Programmatically trigger file input click
  };
  const handleSwitchChange = () => {
    setVisibility((prev: any) => !prev);
  };

  return (
    <div className="flex justify-start items-start gap-4 w-full ">
      <ToastContainer className="z-40" />
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-start gap-4">
            <img src="/icons/add-api.svg" alt="" className="w-4 h-4 ml-2 " />
            <CardTitle className="text-2xl">General Information</CardTitle>
          </div>
          <CardDescription>Update Information about your API</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm">
          <div className="grid gap-2">
            <div className="flex justify-start gap-2">
              <label htmlFor="Name" style={{ width: "30%" }}>
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
              {apiCategoryListQuery.isSuccess && (
                <>
                  <label htmlFor="Name" style={{ width: "30%" }}>
                    Api Category
                  </label>
                  <ApiCategorySelect
                    name={api.CategoryName}
                    items={apiCategoryListQuery.data.data}
                    defaultValue={api.CategoryID}
                    selectedOption={api.CategoryName}
                    handleSelectionChange={setCategoryId}
                  />
                </>
              )}
            </div>

            <div className="flex justify-start gap-2">
              <label htmlFor="ApiUrl" style={{ width: "30%" }}>
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
              <label htmlFor="Image" style={{ width: "30%" }}>
                Image
              </label>
              <input
                ref={fileInputRef}
                id="Image"
                type="file"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              {image ? (
                <img
                  src={image}
                  alt="Selected Image"
                  className="mt-2"
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
              <label htmlFor="Keywords" style={{ width: "30%" }}>
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
              <label htmlFor="Description" style={{ width: "30%" }}>
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

            <div className="flex flex-col justify-start gap-2">
              <h3>API Project is Private</h3>
              <div className="flex items-center justify-start gap-2">
                It’s not visible on the Hub and new users can’t access it I
                confirm that I own or have rights to publish this API according
                to the Hub Terms of Service
              </div>

              {!Visibility ? (
                <div className="flex items-center space-x-2">
                  <Switch
                    id="somthing"
                    checked={Visibility}
                    onClick={handleSwitchChange}
                  />
                  <Label htmlFor="airplane-mode">Public Api</Label>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Switch
                    id="somthing"
                    checked={Visibility}
                    onClick={handleSwitchChange}
                  />
                  <Label htmlFor="airplane-mode">Private Api</Label>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="w-full gap-4 m-auto  flex items-center justify-center">
          <Button className="w-1/3" onClick={() => {}}>
            Discard
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
                saving...
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
              "save"
            )}
          </Button>
        </CardFooter>
      </Card>
      <ProductCard
        averageRating={api.averageRating}
        latency={api.latency}
        availability={api.availability}
        imagePath={image}
        cardTitle={name}
        cardDescription={description}
      />
    </div>
  );
}
