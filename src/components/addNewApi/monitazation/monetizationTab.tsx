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
import { useUpdateApi } from "@/hooks/apis/api.Mutation";
import { useApiCategoryList } from "@/hooks/apisCategory/apiCategory.queries";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import EditPlanModal from "./editPlanModal";
import FeutureModal from "./feutureModal";
import YourComponent, { SelectMulti } from "./object";
import {
  useApiEndpointsById,
  useApiEndpointsList,
} from "@/hooks/Endpoints/Endpoints.queries";
import PlanObjectModal from "./planObjectModal";
export default function MonetizationTab({ api }: any) {
  // Create a ref for file input

  const endpointsList = useApiEndpointsList(api.ID);

  const [publicPlans, setPublicPlans] = useState([
    {
      name: "Basic",
      active: true,
      price: 0,
      type: "Usage",
      rate: "1000",
      rateUnite: "Request",
      recomndedPlan: true,
    },
    {
      name: "PRO",
      active: true,
      price: 10,
      type: "Monthely",
      rate: "1000",
      rateUnite: "Request",
      recomndedPlan: false,
    },
    {
      name: "Ultra",
      active: true,
      price: 100,
      type: "Monthely",
      rate: "1000",
      rateUnite: "Request",
      recomndedPlan: false,
    },
    {
      name: "Mega",
      active: true,
      price: 1000,
      type: "Monthely",
      rate: "1000",
      rateUnite: "Request",
      recomndedPlan: true,
    },
  ]);
  const [objectList, SetObjectList] = useState([
    {
      id: 1,
      name: "Requests",
      description: "every Requests  is included",
      endpointList: [
        {
          id: 1,
          name: "GET /users",
        },
        {
          id: 2,
          name: "GET /users/:id",
        },
        {
          id: 3,
          name: "POST /users",
        },
      ],
      cross: [{}, {}, {}, {}],
    },
    {
      id: 2,
      name: "Requests",
      description: "every Requests  is included",
      endpointList: [
        {
          id: 1,
          name: "GET /users",
        },
        {
          id: 2,
          name: "GET /users/:id",
        },
        {
          id: 3,
          name: "POST /users",
        },
      ],
      cross: [{}, {}, {}, {}],
    },
  ]);
  const apiCategoryListQuery = useApiCategoryList();

  const { mutate: updateApi, isPending, isError, isSuccess } = useUpdateApi();

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
      const Data = {};

      //  await updateApi(Data);
      //closeModal();

      console.log("API entity updated successfully!");
    } catch (error) {
      console.error("Error creating API entity:", error);
    }
  };

  /*
  const handleSwitchChange = () => {
    setVisibility((prev: any) => !prev);
  };
  */

  return (
    <div className="flex justify-start items-start gap-4 w-full ">
      <ToastContainer className="z-40" />
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-start gap-4">
            <img src="/icons/add-api.svg" alt="" className="w-4 h-4 ml-2 " />
            <CardTitle className="text-2xl">Monetize Your Api</CardTitle>
          </div>
          <CardDescription>
            Update Information about your API Plans
            <SelectMulti />
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm">
          <Tabs defaultValue="Public ">
            <TabsList className="grid  grid-cols-5 w-2/3  ml-8 my-2">
              <TabsTrigger value="Public ">Public </TabsTrigger>
              <TabsTrigger value="Private">Private</TabsTrigger>
              <TabsTrigger value="Transactions">Transactions</TabsTrigger>
            </TabsList>
            <TabsContent
              value="Public "
              className="w-full  flex flex-col justify-center items-start px-8 "
            >
              <PlanHeaders
                publicPlans={publicPlans}
                setPublicPlans={setPublicPlans}
                endpointsList={endpointsList}
                objectList={objectList}
                setObjectList={SetObjectList}
              />
            </TabsContent>
            <TabsContent
              value="Private"
              className="w-full  flex flex-col justify-center items-start px-8 "
            ></TabsContent>
            <TabsContent
              value="Transactions"
              className="w-full  flex flex-col justify-center items-start px-8 "
            ></TabsContent>
          </Tabs>
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
    </div>
  );
}

const PlanHeaders = ({
  publicPlans,
  setPublicPlans,
  endpointsList,
  objectList,
  setObjectList,
}: any) => {
  console.log("publicPlans ============= ", publicPlans);

  return (
    <div className="grid grid-cols-5 gap-8 mb-2 w-full">
      <div className="col-span-1"></div> {/* Empty column */}
      {publicPlans.map((publicPlan: any, index: number) => (
        <PlanHeader
          index={index}
          key={publicPlan?.name}
          publicPlans={publicPlans}
          setPublicPlans={setPublicPlans}
        />
      ))}
      {objectList.map((object: any) => (
        <FeutureLine
          key={object.id}
          id={object.id}
          publicPlans={publicPlans}
          endpointsList={endpointsList}
          objectList={objectList}
          setObjectList={setObjectList}
        />
      ))}
    </div>
  );
};

const FeutureLine = ({
  id,
  publicPlans,
  endpointsList,
  setObjectList,
  objectList,
}: any) => {
  const objectSelceted = objectList.find((object: any) => object.id === id);
  console.log("objectSelceted ============= ", objectSelceted);

  return (
    <>
      {endpointsList.isLoading && <p>loading ...</p>}

      {endpointsList.isSuccess && (
        <PlanObjectModal
          edit
          optionsList={endpointsList.data}
          objectList={objectList}
          setObjectList={setObjectList}
          objectSelceted={objectSelceted}
        />
      )}

      <FeutureModal
        plan={publicPlans[0]}
        objectSelceted={objectSelceted}
        setObjectList={setObjectList}
        index={0}
      />
      <FeutureModal
        plan={publicPlans[1]}
        objectSelceted={objectSelceted}
        setObjectList={setObjectList}
        index={1}
      />
      <FeutureModal
        plan={publicPlans[2]}
        objectSelceted={objectSelceted}
        setObjectList={setObjectList}
        index={2}
      />
      <FeutureModal
        plan={publicPlans[3]}
        objectSelceted={objectSelceted}
        setObjectList={setObjectList}
        index={3}
      />
    </>
  );
};

const PlanHeader = ({ index, publicPlans, setPublicPlans }: any) => {
  const plan = publicPlans[index];

  return (
    <div className="col-span-1 flex flex-col   items-center gap-2 py-8">
      <CardTitle className="text-xl">{plan?.name}</CardTitle>

      <Switch checked={plan?.active} />
      <CardDescription className="text-xs">
        {plan.type == "Usage" ? "Pay per Use" : plan?.price + "$/Monthely"}
      </CardDescription>
      <EditPlanModal index setPublicPlans={setPublicPlans} plan={plan} />
    </div>
  );
};
