import React, { useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import { reportAnAPI } from "@/actions/api";
import { toast } from "react-toastify";
import { useAuthSession } from "@/components/auth-provider";
export const Report = ({ userId, api_id }: any) => {
  const { session } = useAuthSession();
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const handleUpload = (result: any) => {
    if (result.event === "success") {
      //    console.log("called success")
      setUploadedImages([...uploadedImages, result.info.secure_url]);
    } else {
      setError("Failed to upload image. Please try again.");
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) {
      setError("description is required !");
      return;
    }

    const success = await reportAnAPI(
      { description, screenshots: uploadedImages },
      api_id,
      userId,

      session?.token || ""
    );
    console.log("report res ", success);

    if (success) {
      setDescription("");
      toast.success("report submitted successufully !", {
        position: "top-right",
        autoClose: 5000, // Auto close after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="form-group">
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            cols={45}
            rows={8}
            className="outline-none p-3 rounded-md border-2 border-blue-600"
            placeholder="Describe the issue you encountered..."
          />
        </div>

        <div className="border-2 border-blue-600 flex justify-between items-center p-2 w-full">
          <label
            htmlFor="screenshots"
            className=" text-slate-500 text-sm opacity-80 font-semibold"
          >
            Upload Screenshots (optional)
          </label>
          <CldUploadButton
            uploadPreset={"Pfe_Uplaod"} // Replace with your Cloudinary upload preset
            onUpload={handleUpload}
            className="p-2 rounded-md bg-blue-500 hover:bg-blue-400 cursor-pointer text-white block my-2"
          >
            Upload Screenshot
          </CldUploadButton>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button
          type="submit"
          className="cursor-pointer my-3 bg-green-500 text-white hover:bg-green-400 p-2"
        >
          submit
        </button>
      </form>
    </div>
  );
};
