"use client";

import { useState, FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import SearchApiInput from "./searchInput";

import { useAuthSession } from "../auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Navbar = ({
  apiHub = "hub",
  docs = "https://api-galaxy-docs.vercel.app/",
  ListApi = "s",
  myApis = "dashboard",
}: {
  apiHub?: string;
  docs?: string;
  ListApi?: string;
  myApis?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { session, isAuthenticated } = useAuthSession();


  return (
    <div className="bg-white sticky top-0 z-[1000] flex flex-row justify-between items-center py-2 px-4 shadow-md">
      <nav className="flex items-center justify-start flex-wrap">
        <div className="flex items-center flex-shrink-0 p-1 text-black mr-4">
          <Link href={apiHub}>
            <Image
              src="/logos/logo-white-bg.svg"
              alt="API GALAXY"
              width={50}
              height={50}
              priority
              className="cursor-pointer"
            />
          </Link>
        </div>

        <div className="hidden lg:block">
          <SearchApiInput />
        </div>

        <div
          className={`${isOpen ? "block" : "hidden"
            } w-full lg:flex lg:items-center lg:w-auto`}
        >
          <div className="text-base lg:flex-grow text-black ml-4">
            <Link
              href={apiHub}
              className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-mainColor"
            >
              API Hub
            </Link>
            <a
              href={docs}
              className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-mainColor"
            >
              Docs
            </a>
            <Link
              href={ListApi}
              className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-mainColor"
            >
              List your API
            </Link>
            <Link
              href={myApis}
              className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-mainColor"
            >
              My API's
            </Link>
          </div>
        </div>
      </nav>

      <div className="space-x-2 flex flex-row justify-start items-center font-body text-base sm:text-lg">
        {isAuthenticated ? (
          <div className="flex items-center space-x-2">

            {session?.user && (
              <Link href={`dashboard/profile`}>
                <Avatar>
                  <AvatarImage
                    src={"/placeholder-user.jpg"}
                    alt={session?.user?.name?.charAt(0) || "User Avatar"}
                  />
                  <AvatarFallback>
                    {session?.user?.name?.charAt(0) || "N/A"}
                  </AvatarFallback>
                </Avatar>

              </Link>
            )}

            <span className="text-black">{session?.user?.name}</span>
            <button
              onClick={() => signOut()}
              className="px-3 py-2 rounded bg-goldColor hover:bg-white hover:text-goldColor border border-goldColor"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="px-2 py-2 inline-block rounded text-center md:rounded-lg md:px-6 bg-mainColor hover:bg-deepBlue text-white"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-2 py-2 inline-block rounded text-center md:rounded-lg md:px-6 bg-goldColor hover:bg-white hover:text-goldColor border border-goldColor"
            >
              Sign Up
            </Link>
          </>
        )}

        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-2 py-2 hover:text-white hover:border-white relative top-1"
          >
            <svg
              className="fill-current text-black h-5 w-5"
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
