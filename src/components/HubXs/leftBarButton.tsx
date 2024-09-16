import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

interface buttonType {
  iconPath: string;
  buttonText: string;
  option: boolean;
  filter?: number;
  setFilter?: any;
  index: number;
}

export default function LeftBarButton(buttonProp: buttonType) {
  return (
    <div
      className="my-1"
      key={buttonProp.index}
      onClick={() => {
        buttonProp.setFilter(buttonProp.index);
        console.log(
          "clicked",
          buttonProp.index,
          buttonProp.index === buttonProp.filter
        );
      }}
    >
      <span
        className={` ${
          buttonProp.index === buttonProp.filter
            ? "bg-blue-500  text-white"
            : "bg-usedGrey text-black "
        }    inline-block cursor-pointer hover:scale-105  border rounded p-2 w-40 md:w-48`}
      >
        <span className="ml-2 text-body  text-sm md:text-base">
          {buttonProp.buttonText}
        </span>
        <span className=""></span>
      </span>
    </div>
  );
}

export function LeftBarBarSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="inline-block cursor-pointer h-12 hover:scale-105  border rounded p-2 w-40 md:w-48" />
    </div>
  );
}

export function LeftBarButtonClickable(buttonProp: buttonType) {
  return (
    <div>
      <span className="inline-block bg-usedGrey border rounded p-2 w-40 md:w-48">
        <Image
          className="inline-block mr-1 "
          src={buttonProp.iconPath}
          alt="Card Image"
          width={25}
          height={25}
        />

        <span className="ml-2 text-body text-black text-sm md:text-base">
          {buttonProp.buttonText}
        </span>
        <span className=""></span>
      </span>
    </div>
  );
}
