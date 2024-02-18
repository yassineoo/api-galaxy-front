import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { useUpdateApi, useUpdateDocs } from "@/hooks/apis/api.Mutation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { defaultText } from "@/app/api/about";
import { formats, modules } from "@/utils/reactQuill";
import { ToastContainer, toast } from "react-toastify";

export default function DocsTab({ api }: any) {
  // Define states for input fields
  const [docs, setDocs] = useState<string>(api?.ApiDocs?.Content || "");

  const {
    mutateAsync: updateApiDocs,
    isError,
    isPending,
    error,
    isSuccess,
  } = useUpdateDocs();

  useEffect(() => {
    console.log(docs);
  }, [docs]);
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
        Content: docs as string,
        docsId: api?.ApiDocs?.ID as number,
        apiID: api.ID as number,
      };

      await updateApiDocs(Data);

      // Show success notification
      //  toast.success("Your API has been modified successfully!");

      console.log("API entity updated successfully!");
    } catch (error) {
      // Show error notification
      //toast.error("Error saving the modification, try again!");

      console.error("Error creating API entity:", error);
    }
  };

  return (
    <div className="flex justify-start items-start gap-4 w-full ">
      <ToastContainer />
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-start gap-4">
            <img src="/icons/add-api.svg" alt="" className="w-4 h-4 ml-2 " />
            <CardTitle className="text-2xl">Update Docs</CardTitle>
          </div>
          <CardDescription>
            Maximize the effectiveness of your API by crafting a comprehensive
            README to include with your project on the platform. A meticulously
            written README acts as a beacon, guiding developers through the
            nuances of your API, ensuring they grasp its capabilities, implement
            it correctly, and fully recognize its value
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm">
          <div className="grid gap-2 py-10">
            <QuillNoSSRWrapper
              modules={modules}
              formats={formats}
              theme="snow"
              value={docs}
              onChange={setDocs}
            />
          </div>
        </CardContent>
        <CardFooter className="w-full gap-4 m-auto  flex items-center justify-center">
          <Button className="w-1/3" onClick={() => {}}>
            Discard
          </Button>
          <Button
            className={`w-5/12  ${
              isPending
                ? "bg-gray-500"
                : "bg-bluePure text-white hover:bg-blue-700"
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
          {/* Display an error message if there is an error */}
          {isError && <p className="text-red-500">{error.message}</p>}
        </CardFooter>
      </Card>
    </div>
  );
}

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
