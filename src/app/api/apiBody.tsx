"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeSnippet from "./codeSnippet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import ApiDocsGraph from "./apiDoc";
import { Label } from "recharts";
import { Input } from "@/components/ui/input";
import Result from "./result";
import { useState } from "react";
import About from "./about";
import Footer from "../components/Vetrine/footer";
import Plans from "../components/Vetrine/plans";
const codeString = `
const axios = require('axios');

axios.get('https://yourapi.com/endpoint')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
`;

const result = `{
  "coupons": [
    {
      "id": "1",
      "useDate": "2023-11-28T00:00:00.000Z",
      "eventId": "e312504a-3286-4801-be4f-dd2ddcb26213",
      "user": {
        "user_id": "8fb2a159-84ee-42df-a250-022f4ca1b7d5",
        "phoneNumber": "+213555555555",
        "status": "banned",
        "type": "client",
        "adminPassword": null,
        "createdAt": "2023-09-22T09:27:34.162Z",
        "deletedAt": null,
        "updatedAt": "2023-11-28T08:10:06.336Z",
        "points": 1760,
        "email": "_@yahoo.com",
        "emailState": "not_verified",
        "displayName": "معين26",
        "stripCustomerId": "cus_OgSZ0GyXPvYx6y",
        "refreshToken": "$2a$12$GOxCKBr5Xg66cGTPgdMHMOZFEOzkyv.EHLDO6pNlg.7A4Ky27Fi9W",
        "storeId": null,
        "imageUrl": "0c3062a2-d48b-40b2-af37-aa3bff4852b5.jpg",
        "referrerId": "8fb2a159-84ee-42df-a250-022f4ca1b7d5",
        "online": false,
        "contactDetails": null,
        "store": null
      },
      "coupon": {
        "id": 1,
        "percentage": 30,
        "promoCode": "COUPON5",
        "eventId": "e312504a-3286-4801-be4f-dd2ddcb26213",
        "minPoints": "90"
      },
      "event": {
        "title": "الفعالية",
        "id": "e312504a-3286-4801-be4f-dd2ddcb26213"
      }
    },
    {
      "id": "2",
      "useDate": "2023-11-28T00:00:00.000Z",
      "eventId": "e312504a-3286-4801-be4f-dd2ddcb26213",
      "user": {
        "user_id": "8fb2a159-84ee-42df-a250-022f4ca1b7d5",
        "phoneNumber": "+213555555555",
        "status": "banned",
        "type": "client",
        "adminPassword": null,
        "createdAt": "2023-09-22T09:27:34.162Z",
        "deletedAt": null,
        "updatedAt": "2023-11-28T08:10:06.336Z",
        "points": 1760,
        "email": "_@yahoo.com",
        "emailState": "not_verified",
        "displayName": "معين26",
        "stripCustomerId": "cus_OgSZ0GyXPvYx6y",
        "refreshToken": "$2a$12$GOxCKBr5Xg66cGTPgdMHMOZFEOzkyv.EHLDO6pNlg.7A4Ky27Fi9W",
        "storeId": null,
        "imageUrl": "0c3062a2-d48b-40b2-af37-aa3bff4852b5.jpg",
        "referrerId": "8fb2a159-84ee-42df-a250-022f4ca1b7d5",
        "online": false,
        "contactDetails": null,
        "store": null
      },
  }
}
`;

export function ApiTabs() {
  return (
    <Tabs defaultValue="endpoints">
      <TabsList className="grid  grid-cols-4 w-1/3  ml-8 my-2">
        <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="discussion">Discussion</TabsTrigger>
        <TabsTrigger value="pricing">Pricing</TabsTrigger>
      </TabsList>
      <TabsContent
        value="endpoints"
        className="w-full  flex flex-col justify-center "
      >
        <ApiDocsGraph />
        <div className="w-full flex justify-center h-screen">
          <ParamterControler />
          <CodeResult />
        </div>
      </TabsContent>
      <TabsContent
        value="about"
        className="w-full   flex flex-col justify-start mx-12 items-start "
      >
        <About />
      </TabsContent>
      <TabsContent
        value="discussion"
        className="w-full  bg-orange-400 flex justify-center items-start"
      ></TabsContent>
      <TabsContent
        value="pricing"
        className="w-full  bg-purple-400 flex justify-center items-start "
      ></TabsContent>
    </Tabs>
  );
}

export function CodeResult() {
  return (
    <Tabs defaultValue="CodeSnippet" className=" h-[760px] w-1/2 ">
      <TabsList className="my-2">
        <TabsTrigger value="Result">CodeSnippet</TabsTrigger>
        <TabsTrigger value="CodeSnippet">Result</TabsTrigger>
      </TabsList>
      <TabsContent
        value="Result"
        className="w-full   bg-slate-900 flex flex-col justify-center "
      >
        <div className="m-0 pt-2   w-full flex justify-center ">
          <Result codeString={result} language="javascript" />
        </div>
      </TabsContent>
      <TabsContent
        value="CodeSnippet"
        className="w-full   bg-slate-900 flex flex-col justify-center "
      >
        <div className="m-0 pt-2   w-full flex justify-center ">
          <CodeSnippet codeString={codeString} language="javascript" />
        </div>
      </TabsContent>
    </Tabs>
  );
}

const ParamterControler = () => {
  // States for each input field
  const [url, setUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle the submit action
  const handleSubmit = async () => {
    setIsLoading(true); // Start loading
    // Axios request goes here
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    try {
      const response = await axios.put(url, {
        headers: { "Api-Key": apiKey },
        body: { userName, email },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error making the request:", error);
    } finally {
      // setIsLoading(false); // Stop loading
    }
  };

  // Function to reset all fields
  const handleReset = () => {
    setUrl("");
    setApiKey("");
    setEmail("");
    setUserName("");
  };

  return (
    <div className="flex flex-col w-1/2 mt-[55px] pt-2 border border-t text-white h-[569px]">
      <div className="w-full py-1 px-2 flex justify-between items-center">
        <h2 className="text-lg text-black font-semibold">Put :/ModifyUser</h2>
        <div className="flex gap-2">
          <Button className="" onClick={handleReset}>
            Reset
          </Button>
          {isLoading ? (
            <Button className="" onClick={handleSubmit}>
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </Button>
          ) : (
            <Button className="" onClick={handleSubmit}>
              Run test
            </Button>
          )}
        </div>
      </div>
      <Accordion
        type="single"
        collapsible
        className="overflow-scroll w-full py-4 bg-[#14073D] h-full"
      >
        <p className=" p-4 w-full">
          This endpoint is used to translate text from one language to another
          using the post method
        </p>
        <ParamterInput name="Url" placeholder="www.google.com" />

        <AccordionItem value="item-1" className="   border border-white p-0  ">
          <AccordionTrigger className="w-full flex justify-between items-center m-0 bg-slate-800  px-2 py-3 border-b border-white">
            Header
            <img
              src="/icons/chevron-down.svg"
              alt=""
              className="w-4 h-4 ml-2 "
            />
          </AccordionTrigger>
          <AccordionContent className="px-2 py-3">
            <ParamterInput
              name="host"
              placeholder="www.google.com"
              onChange={setUrl}
              value={url}
            />
            <ParamterInput
              onChange={setApiKey}
              value={apiKey}
              name="Api Key"
              placeholder="IEFJPQEJFPQ?LDNQ?SLQ?SDPQOSDQNFLEN"
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-1" className="   border border-white  ">
          <AccordionTrigger className="w-full flex justify-between  bg-slate-800  px-2 py-3 border-b border-white">
            Body
            <img
              src="/icons/chevron-down.svg"
              alt=""
              className="w-4 h-4 ml-2 "
            />
          </AccordionTrigger>
          <AccordionContent className="px-2 py-3">
            <ParamterInput
              name="userName"
              placeholder="yassine"
              onChange={setUserName}
              value={userName}
            />
            <ParamterInput
              name="email"
              placeholder="email"
              onChange={setEmail}
              value={email}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const ParamterInput = ({ name, value, onChange, placeholder }: any) => {
  return (
    <div className="flex px-4 py-2 my-2 w-full items-center justify-between gap-6">
      <label htmlFor={name} className="w-1/5">
        {name}
      </label>
      <Input
        type="text"
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-black w-full md:w-4/5"
      />
    </div>
  );
};
