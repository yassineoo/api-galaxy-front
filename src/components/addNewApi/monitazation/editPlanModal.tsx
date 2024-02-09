import { SelectButton } from "@/components/dashboard/mainPage/filterGroup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { set } from "date-fns";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const EditPlanModal = ({ plan, setPublicPlans }: any) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRecommendedPlan, setRecommendedPlan] = useState(plan?.recomndedPlan);
  const [isRateActivated, setRateActivated] = useState(plan?.rate > 0);
  const [planType, setPlanType] = useState(plan?.type);
  const [price, setPrice] = useState(plan?.price);
  const [rateLimit, setRateLimit] = useState(plan?.rate);

  const [rateLimitType, setRateLimitType] = useState(plan?.rateUnite);

  const openModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    Modal.setAppElement("body"); // Set the app element to the body element
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleRecommendedPlanChange = () => {
    setRecommendedPlan((prev: any) => !prev);
  };
  const handleRateActivatedChange = () => {
    setRateActivated((prev) => !prev);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setPublicPlans((prev: any) => {
      return prev.map((item: any) => {
        if (item.name === plan.name) {
          return {
            ...item,
            recomndedPlan: isRecommendedPlan,
            rate: rateLimit,
            rateUnite: rateLimitType,
            type: planType,
            price: price,
          };
        }
        return item;
      });
    });
    // Handle form submission logic here
    closeModal();
  };

  return (
    <div className="w-full">
      <Button className="w-full " onClick={openModal}>
        Edit{" "}
      </Button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "50%",
            margin: "auto",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
          },
        }}
      >
        <Card className="w-full border-none shadow-none">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-start gap-4">
              <img src="/icons/add-api.svg" alt="" className="w-4 h-4 ml-2 " />
              <h2 className="text-2xl">Edit your plan</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col justify-start gap-2">
              <div className="flex items-center justify-start gap-2 py-1">
                <h3 className="w-1/3">Plan Type</h3>
                <RadioGroup
                  defaultValue={planType}
                  onChange={(e) =>
                    setPlanType((e.target as HTMLInputElement).value)
                  }
                  className="ml-2 flex gap-8"
                >
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="Monthely" id="r1" />
                    <label className="  cursor-pointer" htmlFor="r1">
                      Monthely
                    </label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="Usage" id="r2" />
                    <label className="  cursor-pointer" htmlFor="r2">
                      Usage
                    </label>
                  </div>
                </RadioGroup>
              </div>
              <hr className="my-2 border-t" />
              <div className="flex items-center gap-4 py-1 ">
                <label className="w-1/3" htmlFor="recommended-plan-switch">
                  Rate Limiting
                </label>

                <Switch
                  id="recommended-plan-switch"
                  checked={isRateActivated}
                  onClick={handleRateActivatedChange}
                />

                <Input
                  value={rateLimit}
                  onChange={(e) => setRateLimit(e.target.value)}
                  type="number"
                  id="rate-limit-number"
                  placeholder="Enter number"
                  className="w-1/4"
                  disabled={!isRateActivated}
                />
                <SelectButton
                  width="w-1/5"
                  disabled={!isRateActivated}
                  handleSelectionChange={(e: any) => setRateLimitType(e)}
                  defaultValue={rateLimitType}
                  items={[
                    {
                      label: "seconds",
                      value: "s",
                    },
                    {
                      label: "miniutes",
                      value: "m",
                    },
                    {
                      label: "hours",
                      value: "h",
                    },
                  ]}
                />
              </div>
              <hr className="my-2 border-t" />
              <div className="flex items-center gap-4 py-1">
                <label className="w-1/3" htmlFor="price-number">
                  Subscription Price
                </label>

                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  id="price-number"
                  placeholder="Enter number"
                  className="w-1/4"
                />
                <p>{"$"}</p>
              </div>
              <hr className="my-2 border-t" />
              <div className="flex items-center gap-4 py-1">
                <label className="w-1/3" htmlFor="recommended-plan-switch">
                  Recommended Plan
                </label>

                <Switch
                  id="recommended-plan-switch"
                  checked={isRecommendedPlan}
                  onClick={handleRecommendedPlanChange}
                />
              </div>

              <hr className="my-2 border-t" />
            </div>
          </CardContent>
          <CardFooter className="w-full gap-4 m-auto  flex items-center justify-center">
            <Button className="w-1/3" onClick={closeModal}>
              Cancel
            </Button>
            <Button className={`w-5/12 `} onClick={handleSubmit}>
              Save
            </Button>
          </CardFooter>
        </Card>
      </Modal>
    </div>
  );
};

export default EditPlanModal;
