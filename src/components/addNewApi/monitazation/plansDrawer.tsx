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
import { DemoPaymentMethod } from "./paymentCard";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Congratulations from "./congrats";

const PlanConfermationModal = ({ plan }: any) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button>Subscribe</Button>
      </DrawerTrigger>
      <DrawerContent className="flex  h-[580px]  overflow-y-scroll   justify-between items-center">
        <DrawerHeader>
          <DrawerTitle>Plan Confirmation </DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="flex w-2/3  justify-start gap-4">
          {(plan.Price != 0 || plan.Type != "Monthly") && (
            <div className="">
              <DemoPaymentMethod plan={plan} />
            </div>
          )}
          <hr className="my-2 border-t" />
          <DrawerFooter className="w-1/2 flex flex-col h-full">
            <Card className="py-4 px-3 flex justify-center items-center flex-col">
              <CardTitle className="text-md pb-1">{plan.Name}</CardTitle>
              <CardDescription>
                {plan.Type == "Usage"
                  ? "Pay per Use"
                  : `${plan.Price}$/Monthly`}{" "}
              </CardDescription>
              <CardDescription>
                {" "}
                {plan.Rate <= 0 ? (
                  <p className="text-gray-400 text-2xl">unlimted rate </p>
                ) : (
                  <p className="flex justify-center items-center text-sm ">
                    {plan?.Rate} requests per{" "}
                    {plan?.RateUnite == "h"
                      ? "Hour"
                      : plan?.RateUnite == "m"
                      ? "Minute"
                      : "Secondes"}
                  </p>
                )}
              </CardDescription>
            </Card>
            <hr className="my-2 border-t" />
            <Card className="py-4 px-3">
              <CardTitle className="text-md pb-3">Payment Summary</CardTitle>
              <CardDescription className="flex justify-between">
                <span>Price : </span> {plan.Price} $
              </CardDescription>
              <CardDescription className="flex justify-between">
                <span>tax : </span> {"0 %"}
              </CardDescription>
              <hr className="my-2 border-t" />
              <CardDescription className="flex justify-between">
                <span>Total : </span> {plan.Price } $
              </CardDescription>
            </Card>

            <DrawerClose>
              <Button variant="outline" className="w-full ">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PlanConfermationModal;
