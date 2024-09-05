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

        <div className="flex space-x-4">
          <Link href="/hub" passHref>
            <button
              type="button"
              className="bg-gradient-to-r from-mainColor to-blue-400 text-white font-semibold py-3 px-6 rounded shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
            >
              Start Browsing
            </button>
          </Link>
          <Link href="/provider" passHref>
            <button
              type="button"
              className="bg-transparent text-black font-semibold py-3 px-6 rounded border border-white hover:bg-white hover:text-blue-800 shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Become a Provider
            </button>
          </Link>
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
