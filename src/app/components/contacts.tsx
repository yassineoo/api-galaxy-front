import Image from "next/image";


export default function Contacts() {
    return (
        <>
            <div className="bg-mainColor p-6 text-3xl text-center font-semibold font-title">
                <h1>Contacts</h1>

                <div className="p-4 flex justify-between md:justify-around items-center" >

                    <div className="flex flex-col gap-4">
                        <div>
                            <h3 className="font-title text-xl font-semibold">
                                Support email :
                            </h3>
                            <p className="font-body text-base font-normal">
                                support@api-galaxy.com
                            </p>
                        </div>
                        <div>
                            <h3 className="font-title text-xl font-semibold">
                                Phone number :
                            </h3>
                            <p className="font-body text-base font-normal">
                                +213 549502843
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="font-title text-xl font-semibold">
                            Maps location :
                        </h3>
                        <Image
                            src="/assets/maps.png"
                            alt="API GALAXY"
                            width={300}
                            height={300}
                            priority
                        />

                    </div>
                </div>


            </div>
        </>
    );
}