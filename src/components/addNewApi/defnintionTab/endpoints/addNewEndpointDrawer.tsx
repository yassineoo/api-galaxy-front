import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import AddEndpointsForm from "./endpointsForm";

const AddNewEndpointDrawer = ({
  Label,
  apiID,
  variant,
  endpoint = {},
  edit,
}: any) => {
  console.log("endpoint selected ======= ", endpoint.ID);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {variant ? (
          <Button variant="ghost" className="text-blue-400 h-8 w-8 p-0">
            {Label}
          </Button>
        ) : (
          <Button>{Label}</Button>
        )}
      </DrawerTrigger>
      <DrawerContent className=" flex  h-[580px]  overflow-y-scroll  justify-between items-center">
        <DrawerHeader>
          <DrawerTitle>Add Endpoint </DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="flex  justify-center items-center w-2/3 pt-72  overflow-y-scroll">
          <AddEndpointsForm
            endpoint={endpoint}
            edit={edit}
            apiID={apiID}
            Colser={
              <DrawerClose asChild>
                <Button className="w-2/5 " variant="outline">
                  Cancel
                </Button>
              </DrawerClose>
            }
          />
        </div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddNewEndpointDrawer;
