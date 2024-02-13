"use client";
import { useState, FC } from "react";
import Link from "next/link";
import Image from "next/image";

interface Links {
  apiHub: string;
  docs: string;
  ListApi: string;
  myApis: string;
}

const Navbar: FC<Links> = ({
  apiHub = "s",
  docs = "s",
  ListApi = "s",
  myApis = "s",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" bg-white flex flex-row justify-between align-top py-2 px-4">
      <nav className="flex items-center md:p-2 justify-start flex-wrap">
        <div className="flex items-center flex-shrink-0 p-1 text-black md:mr-4">
          {/* SVG Logo */}
          <Image
            src="/logos/logo-white-bg.svg"
            alt="API GALAXY"
            width={50}
            height={50}
            priority
          />
        </div>

        <div className="relative">
          <input
            className="border  rounded-md p-2 pl-10 w-10/12 md:w-80 text-sm md:text-base"
            type="text"
            placeholder="Search"
          />
          <Image
            className="absolute left-3 top-1/2 transform -translate-y-1/2 "
            src="/assets/magnifying-glass.png"
            alt="API GALAXY"
            width={20}
            height={20}
            priority
          />
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto lg:flex-grow-0`}
        >
          <div className="text-sm lg:flex-grow text-black ml-4">
            <Link
              href={apiHub || ""}
              className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-mainColor"
            >
              {" "}
              API Hub{" "}
            </Link>
            <Link
              href={docs || ""}
              className="block mt-4 lg:inline-block lg:mt-0 mr-4  hover:text-mainColor"
            >
              Docs
            </Link>
            <Link
              href={ListApi || ""}
              className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-mainColor"
            >
              List your API
            </Link>
            <Link
              href={myApis || ""}
              className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-mainColor"
            >
              My API's
            </Link>
          </div>
        </div>
      </nav>
      <div className="space-x-2 flex flex-row justify-start items-center line font-body  text-xs sm:text-base">
        <Link
          href="/login"
          className=" px-2 py-2 inline-block rounded text-center md:rounded-lg md:px-6 bg-mainColor hover:bg-deepBlue"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="px-2 py-2 inline-block rounded text-center w-16 md:w-auto md:rounded-lg md:px-6 border text-white bg-goldColor hover:bg-white hover:text-goldColor hover:border-goldColor"
        >
          Sign Up
        </Link>
        <div className="lg:hidden relative bottom-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className=" px-2 py-2 hover:text-white hover:border-white relative top-1"
          >
            <svg
              className="fill-black h-5 w-4"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
