import { useRef, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

export default function AddNewApiForm() {
  // Define states for input fields
  const [name, setName] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [image, setImage] = useState(""); // Change to empty string
  const [keywords, setKeywords] = useState("");
  const [description, setDescription] = useState("");

  // Create a ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle input field changes
  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleApiUrlChange = (event: any) => {
    setApiUrl(event.target.value);
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setImage(file ? URL.createObjectURL(file) : ""); // Use a fake URL for testing
  };

  const handleKeywordsChange = (event: any) => {
    setKeywords(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const Data = {
        Name: name,
        ProviderID: 21,
        ApiUrl: apiUrl,
        CategoryID: 1,
        ImagePath: "path/image", // Use the fake URL for testing
        Keywords: keywords,
        Description: description,
      };

      await fetch("http://localhost:5000/apis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Adjust content type if needed
          // Other headers as needed
        },
        body: JSON.stringify(Data),
        credentials: "include", // Include this if dealing with credentials
      });

      console.log("API entity created successfully!");
    } catch (error) {
      console.error("Error creating API entity:", error);
    }
  };

  // Handle click on placeholder image
  const handleImagePlaceholderClick = () => {
    fileInputRef?.current?.click(); // Programmatically trigger file input click
  };

  return (
    <Card className="w-1/2">
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
              onChange={handleNameChange}
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
              onChange={handleApiUrlChange}
            />
          </div>
          <div className="flex justify-start gap-2">
            <label htmlFor="Image" style={{ width: "25%" }}>
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
            <label htmlFor="Keywords" style={{ width: "25%" }}>
              Keywords
            </label>
            <Input
              id="Keywords"
              type="text"
              placeholder="Keyword1, Keyword2, Keyword3"
              value={keywords}
              onChange={handleKeywordsChange}
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
              onChange={handleDescriptionChange}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="w-full gap-4 m-auto  flex items-center justify-center">
        <Button className="w-1/3" onClick={handleSubmit}>
          Cancel
        </Button>
        <Button className="w-1/3" onClick={() => {}}>
          Create Api
        </Button>
      </CardFooter>
    </Card>
  );
}
