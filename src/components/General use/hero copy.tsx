import Image from "next/image";
import Link from "next/link";

export default function Hero(): JSX.Element {
  return (
    <div className="bg-white text-black flex justify-between">
      <div className="p-10">
        <h1 className="font-title font-semibold text-4xl sm:text-5xl ">
          <p className="text-mainColor">Discover ,</p>
          Share and <br />
          monetize your APIs
        </h1>
        <p className="font-title font-medium my-4 ">
          The one-stop hub for developers and businesses <br /> to access
          cutting-edge API solutions.
        </p>

        <div>
          <div className="flex justify-start space-x-2 md:space-x-4 text-xs md:xl">
            <Link href="/browse" passHref>
              <button
                type="button"
                className="bg-mainColor text-white font-semibold py-2 px-4 md:py-2 md:px-5 rounded hover:bg-skyBlue focus:outline-none focus:ring-2 focus:ring-mainColor focus:ring-opacity-50 shadow-lg sm:py-1 sm:px-2 sm:text-sm"
              >
                Start Browsing
              </button>
            </Link>
            <Link href="/provider" passHref>
              <button
                type="button"
                className="bg-transparent text-mainColor font-semibold py-2 px-4 md:py-2 md:px-5 rounded border border-mainColor hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-mainColor focus:ring-opacity-50 sm:py-1 sm:px-2 sm:text-sm"
              >
                Become a Provider
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden sm:block self-end ">
        <Image
          src="/assets/hero.png"
          alt="API GALAXY"
          width={300}
          height={300}
          priority
        />
      </div>
    </div>
  );
}
