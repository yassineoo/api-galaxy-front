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
import { useApiCategoryList } from "@/hooks/apisCategory/apiCategory.queries";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import EditPlanModal from "./editPlanModal";
import FeutureModal from "./feutureModal";

import PlanObjectModal from "./planObjectModal";
import {
  useCreateApiPlans,
  useUpdateApiPlans,
} from "@/hooks/plans/plans.Mutation";
import { defaultPlans } from "@/utils/endpoints.functions";
import { useApiEndpointsList } from "@/hooks/Endpoints/Endpoints.queries";
import { LoadingButton } from "@/components/shared/loadingButton";

export default function MonetizationTab({ api, apiPlans, edit }: any) {
  // Create a ref for file input
  const planss = apiPlans?.Plans?.slice(0, 4);
  console.log("planss )))))))))))", planss);

  const [publicPlans, setPublicPlans] = useState(
    planss.length != 0 ? planss : defaultPlans
  );
  const [objectList, SetObjectList] = useState(
    edit
      ? apiPlans.ObjectPlans
      : [
          {
            ID: Math.floor(Math.random() * 1000000 + 1),
            Name: "Requests",
            Description: "every Requests  is included",
            endpointList: [
              {
                ID: 1,
                Name: "GET /users",
              },
              {
                ID: 2,
                Name: "GET /users/:ID",
              },
              {
                ID: 3,
                Name: "POST /users",
              },
            ],
            Cross: [{}, {}, {}, {}],
          },
        ]
  );
  const apiCategoryListQuery = useApiCategoryList();
  const endpointsList = useApiEndpointsList(api.ID);
  const {
    mutateAsync: createPlan,
    isPending: isCreationPending,
    isError: isCreationError,
    isSuccess: isCreationSuccess,
  } = useCreateApiPlans();
  const {
    mutateAsync: updatePlan,
    isPending,
    isError,
    isSuccess,
  } = useUpdateApiPlans();

  useEffect(() => {
    if (isError) {
      toast.error("Error saving the modification try agian !");
    }
    if (isSuccess) {
      toast.success("you api plans has been modified succufully!");
    }
  }, [isCreationError, isCreationSuccess]);
  // Handle form submission
  const handleSubmit = async () => {
    try {
      const Data = {
        ApiID: api.ID,
        PublicPlans: publicPlans,
        ObjectList: objectList,
      };

      edit ? await updatePlan(Data) : await createPlan(Data);
      //await updateApi(Data);
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
              isCreationPending || isPending
                ? "bg-gray-500"
                : "bg-blue hover:bg-blue-700"
            } ${isCreationPending ? "cursor-not-allowed" : "cursor-pointer"}`}
            onClick={handleSubmit}
            disabled={isCreationPending}
          >
            QSDQS
            {isCreationPending || isPending ? <LoadingButton /> : "save"}
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
  return (
    <div className="grid grid-cols-5 gap-8 mb-2 w-full">
      <div className="col-span-1"></div> {/* Empty column */}
      {publicPlans.map((publicPlan: any, index: number) => (
        <PlanHeader
          index={index}
          key={publicPlan?.Name}
          publicPlans={publicPlans}
          setPublicPlans={setPublicPlans}
        />
      ))}
      {objectList.map((object: any) => (
        <FeutureLine
          key={object.ID}
          ID={object.ID}
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
  ID,
  publicPlans,
  endpointsList,
  setObjectList,
  objectList,
}: any) => {
  const objectSelceted = objectList.find((object: any) => object.ID === ID);

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
  const [isActive, setIsActive] = useState(plan.Active);

  useEffect(() => {
    setPublicPlans((prev: any) => {
      const newPlans = [...prev];
      newPlans[index].Active = isActive;
      return newPlans;
    });
  }, [isActive]);

  const handleSwitchClick = () => {
    setIsActive((prevIsActive: any) => !prevIsActive);
  };

  return (
    <div className="col-span-1 flex flex-col items-center gap-2 py-8">
      <CardTitle className="text-xl">{plan?.Name}</CardTitle>

      <Switch checked={isActive} onClick={handleSwitchClick} />

      <CardDescription className="text-xs">
        {plan.Type === "Usage" ? "Pay per Use" : plan?.Price + "$/Monthly"}
      </CardDescription>
      <EditPlanModal index setPublicPlans={setPublicPlans} plan={plan} />
    </div>
  );
};
