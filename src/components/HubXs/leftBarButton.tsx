import Image from "next/image";

interface buttonType {
    iconPath: string,
    buttonText: string,
    option: boolean
}

export default function LeftBarButton(buttonProp: buttonType) {
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
                    {buttonProp.buttonText}</span>
                <span className=""></span>
            </span>
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
                    {buttonProp.buttonText}</span>
                <span className=""></span>
            </span>
        </div>
    );
}