import Image from "next/image";
import Link from "next/link";

export default function Hero(): JSX.Element {
  return (
    <div className="bg-gradient-to-r from-mainColor via-sky-500 to-blue-600 text-white flex justify-between items-center border-b p-6 sm:p-10">
      <div className="max-w-lg">
        <h1 className="font-title font-bold text-4xl sm:text-5xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
            Discover,
          </span>
          <br />
          Share and <br />
          Monetize your APIs
        </h1>
        <p className="font-medium mt-4 mb-8 text-lg sm:text-xl">
          The one-stop hub for developers and businesses to access cutting-edge
          API solutions.
        </p>
        <div className="flex space-x-4">
          <Link href="/hub" passHref>
            <button
              type="button"
              className="bg-gradient-to-r from-white to-gray-300 text-blue-800 font-semibold py-3 px-6 rounded shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
            >
              Start Browsing
            </button>
          </Link>
          <Link href="/provider" passHref>
            <button
              type="button"
              className="bg-transparent text-white font-semibold py-3 px-6 rounded border border-white hover:bg-white hover:text-blue-800 shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Become a Provider
            </button>
          </Link>
        </div>
      </div>

      <div className="hidden sm:block">
        <Image
          src="/assets/hero.png"
          alt="API GALAXY"
          width={350}
          height={350}
          priority
          className="transform transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
}
