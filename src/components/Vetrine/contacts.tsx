import Image from "next/image";

export default function Contacts(id: any) {
  return (
    <>
      <div id={id.id} className="bg-mainColor p-2 md:p-6 ">
        <h1 className="font-title text-3xl text-center font-semibold mb-4">
          Contacts
        </h1>

        <div className="p-2 flex justify-around items-center">
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-title text-base md:text-xl font-semibold">
                Support email :
              </h3>
              <p className="font-body text-sm md:text-base font-normal">
                support@api-galaxy.com
              </p>
            </div>
            <div>
              <h3 className="font-title text-base md:text-xl font-semibold">
                Phone number :
              </h3>
              <p className="font-body text-sm md:text-base font-normal">
                +213 549502843
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-title text-base md:text-xl font-semibold">
              Maps location :
            </h3>
            <Image
              className="hidden md:block"
              src="/assets/maps.png"
              alt="API GALAXY"
              width={300}
              height={300}
              priority
            />
            <Image
              className="md:hidden"
              src="/assets/maps.png"
              alt="API GALAXY"
              width={180}
              height={180}
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
}
