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
import { title } from "process";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const FeutureModal = ({ index, plan, objectSelceted, setObjectList }: any) => {
  const Quota = objectSelceted?.Cross[index];

  const [isModalOpen, setModalOpen] = useState(false);
  const [LimitType, setLimitType] = useState(Quota?.LimitType || "soft");
  const [LimitFee, setLimitFee] = useState(Quota?.LimitFee || 0);
  const [QuotaType, setQuotaType] = useState(Quota?.QuotaType || "Month");
  const [QuotaValue, setQuotaValue] = useState(Quota?.QuotaValue || 0);
  const [Price, setPrice] = useState(Quota?.Price || 0);

  const openModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    Modal.setAppElement("body"); // Set the app element to the body element
  }, []);

  useEffect(() => {
    console.log("QuotaValue", QuotaValue, typeof Number(QuotaValue));
  }, [QuotaValue]);
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setObjectList((prev: any) => {
      return prev.map((item: any) => {
        if (item.ID === objectSelceted?.ID) {
          return {
            ...item,
            // i want to update the cross:
            Cross: item.Cross.map((cross: any, i: any) => {
              if (i === index) {
                return {
                  ...cross,
                  Price: Number(Price),
                  LimitType: LimitType,
                  LimitFee: Number(LimitFee),
                  QuotaType: QuotaType,
                  QuotaValue: Number(QuotaValue),
                  Add: true,
                };
              }
              return cross;
            }),
          };
        }
        return item;
      });
    });
    // Handle form submission logic here
    closeModal();
  };

  const handleDelete = () => {
    setObjectList((prev: any) => {
      return prev.map((item: any) => {
        if (item.ID === objectSelceted?.ID) {
          return {
            ...item,
            // i want to update the cross:
            Cross: item.Cross.map((cross: any, i: any) => {
              if (i === index) {
                return {
                  ...cross,
                  Price: 0,
                  LimitType: "soft",
                  LimitFee: 0,
                  QuotaType: "Month",
                  QuotaValue: 0,
                  Add: false,
                };
              }
              return cross;
            }),
          };
        }
        return item;
      });
    });
    closeModal();
  };

  return (
    <div className="w-full flex justify-center items-center">
      {Quota?.Add ? (
        <Button variant={"ghost"} onClick={openModal} className="w-full">
          {plan?.Type == "Usage"
            ? `${Quota.Price} $/use`
            : `${Quota.QuotaValue}/${Quota.QuotaType}`}
        </Button>
      ) : (
        <Button
          className="text-2xl flex justify-center items-center "
          onClick={openModal}
        >
          +
        </Button>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            height: plan?.Type == "Usage" ? "50%" : "85%",
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
              <h2 className="text-2xl">{`${plan?.Name}/${objectSelceted?.Name}`}</h2>
            </div>
          </CardHeader>
          <CardContent>
            {plan?.Type == "Usage" ? (
              <div className="flex flex-col justify-start gap-2">
                <PriceInput
                  Price={Price}
                  setPrice={setPrice}
                  label="Object Price"
                  unite="$/use"
                />
                <hr className="my-2 border-t" />
              </div>
            ) : (
              <div className="flex flex-col justify-start gap-2">
                <div className="flex items-center justify-start gap-2 py-1">
                  <h3 className="w-1/3">Quota Type</h3>
                  <RadioGroup
                    defaultValue={QuotaType}
                    onClick={(e) => {
                      setQuotaType((e.target as HTMLInputElement).value);
                    }}
                    className="ml-2 flex gap-8"
                  >
                    <div className="flex items-center space-x-4">
                      <RadioGroupItem value="Month" id="r1" />
                      <label className="  cursor-pointer" htmlFor="r1">
                        Monthely
                      </label>
                    </div>
                    <div className="flex items-center space-x-4">
                      <RadioGroupItem value="Day" id="r2" />
                      <label className="  cursor-pointer" htmlFor="r2">
                        Daily
                      </label>
                    </div>
                  </RadioGroup>
                </div>
                <hr className="my-2 border-t" />
                <div className="flex items-center gap-4 py-1 ">
                  <label className="w-1/3" htmlFor="recommended-plan-switch">
                    Quota Limite
                  </label>

                  <Input
                    value={QuotaValue}
                    onChange={(e) =>
                      setQuotaValue((e.target as HTMLInputElement).value)
                    }
                    type="number"
                    id="rate-Limit-number"
                    placeholder="Enter number"
                    className="w-1/4"
                    //disabled={!isRateActivated}
                  />
                </div>
                <hr className="my-2 border-t" />
                <div className="flex items-center gap-4 py-1">
                  <label className="w-1/3" htmlFor="Price-number">
                    Limit Type
                  </label>
                  <RadioGroup
                    defaultValue={LimitType}
                    onClick={(e) => {
                      setLimitType((e.target as HTMLInputElement).value);
                      console.log(
                        "this is test from FeutureModal",
                        QuotaType,
                        (e.target as HTMLInputElement).value
                      );
                    }}
                    className="ml-2 flex gap-8"
                  >
                    <div className="flex items-center space-x-4">
                      <RadioGroupItem value="soft" id="r1Type" />
                      <label className="  cursor-pointer" htmlFor="r1Type">
                        Soft Lmite
                      </label>
                    </div>
                    <div className="flex items-center space-x-4">
                      <RadioGroupItem value="hard" id="r2Type" />
                      <label className="  cursor-pointer" htmlFor="r2Type">
                        Hard Limit
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                {LimitType === "soft" && (
                  <div className="flex items-center gap-4 py-1 ">
                    <label className="w-1/3" htmlFor="recommended-plan-switch">
                      Limit Fee
                    </label>

                    <Input
                      value={LimitFee}
                      onChange={(e) =>
                        setLimitFee((e.target as HTMLInputElement).value)
                      }
                      type="number"
                      id="rate-Limit-number"
                      placeholder="Enter number"
                      className="w-1/3"
                      //disabled={!isRateActivated}
                    />
                    <p>{"$"}</p>
                  </div>
                )}

                <hr className="my-2 border-t" />
              </div>
            )}
          </CardContent>
          <CardFooter className="w-full gap-4 m-auto  flex items-center justify-center">
            <Button className="w-1/3" onClick={closeModal}>
              Cancel
            </Button>
            <Button className="w-1/3" onClick={handleDelete}>
              Delete
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

export default FeutureModal;

export const PriceInput = ({ Price, setPrice, label, unite }: any) => {
  return (
    <div className="flex items-center gap-4 py-1">
      <label className="w-1/3" htmlFor="Price-number">
        {label}
      </label>

      <Input
        value={Price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        id="Price-number"
        placeholder="Enter number"
        className="w-1/3"
      />
      <p>{unite}</p>
    </div>
  );
};
