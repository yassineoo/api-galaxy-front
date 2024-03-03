"use client";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  return (
    <>
      <div className="contanier w-full mx-auto px-4 bg-white min-h-screen">
        {/* verify my password */}
        <div className="absolute top-[6rem] right-[50%] translate-x-[50%] shadow-xl rounded-3xl flex flex-col items-center max-w-sm w-full p-4">
          {/* your logo */}
          <div className="border-2 border-black border-dashed h-20 w-20 rounded-full" />
          <h3 className="font-Lora font-bold italic mt-4 mb-8 text-black">
            Verify your email
          </h3>
          <p className="text-center text-black">
            we send you verification code to your email, check it out !
          </p>
          <input
            type="text"
            className="my-4 w-5/6 outline-none border border-slate-500 px-4 py-2 rounded-md"
            placeholder="enter code .."
          />
          <button className="my-4 py-4 bg-goldColor font-semibold rounded-md w-5/6 text-black mb-5">
            Continuer
          </button>

          {/* retour */}
          <span
            onClick={() => router.back()}
            className="underline text-seconadryColor mb-5"
          >
            retour
          </span>
        </div>
      </div>
    </>
  );
};

export default page;
