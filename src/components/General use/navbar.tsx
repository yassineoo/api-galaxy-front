"use client";

import { useState, FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { clearAuthToken } from "@/lib/get-auth-token";
import { useMutation } from "@tanstack/react-query";

interface Links {
  services: string;
  about: string;
  pricing: string;
  contacts: string;
}

const smoothScroll = (id: string): void => {
  console.log(id);
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

const handleClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  id: string
): void => {
  e.preventDefault();
  smoothScroll(id);
};

const Navbar: FC<Links> = ({ services, about, pricing, contacts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const { mutate } = useMutation({
    mutationFn: async () => {
      console.log("MUTATION");
      await fetch("/api/authToken", { method: "DELETE" });
      // await signOut();
    },
  });
  return (
    <div className="navbarGradient  flex justify-between items-center p-1 px-6">
      <nav className="flex items-top p-2 justify-start flex-wrap">
        <Link
          href="/hub"
          className="navbar-logo flex items-center flex-shrink-0 text-white mr-6 cursor-pointer"
        >
          {/* SVG Logo */}
          <Image
            src="/logos/logo-blue-bg.svg"
            alt="API GALAXY"
            width={50}
            height={50}
            priority
          />
          <span className="ml-2 font-title font-semibold tracking-tight">
            API <br />
            GALAXY
          </span>
        </Link>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto lg:flex-grow-0 `}
        >
          <div className="text-sm lg:flex-grow text-white ml-4 ">
            <Link
              href={`#${services}`}
              onClick={(e) => handleClick(e, services)}
              className="block navbar-link mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-white"
            >
              Services
            </Link>
            <Link
              href={`#${about}`}
              onClick={(e) => handleClick(e, about)}
              className="navbar-link block mt-4 lg:inline-block lg:mt-0 mr-4  hover:text-white"
            >
              About
            </Link>
            <Link
              href={`#${pricing}`}
              onClick={(e) => handleClick(e, pricing)}
              className="navbar-link block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href={`#${contacts}`}
              onClick={(e) => handleClick(e, contacts)}
              className="navbar-link block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-white"
            >
              Contacts
            </Link>
          </div>
        </div>
      </nav>
      <div className="space-x-2 flex justify-start items-baseline font-body text-xs sm:text-base">
        {isAuthenticated ? (
          <>
            <div className="flex items-center space-x-2">
              {session?.user?.image && (
                <Image
                  src={session.user.image}
                  //src="/logos/logo-blue-bg.svg"
                  alt={session.user.name || "User Avatar"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <span className="text-white">{session?.user?.name}</span>
              <button
                type="submit"
                onClick={() => mutate()}
                className="navbar-button px-3 py-2 rounded bg-goldColor hover:bg-white hover:text-inherit/80"
              >
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="login navbar-button px-3 py-2 rounded hover:bg-deepBlue hover:text-gray-200 text-white transition-all"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="signup navbar-button px-3 py-2 rounded bg-goldColor hover:bg-white hover:text-inherit/80 transition-all"
            >
              Sign Up
            </Link>
          </>
        )}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-2 hover:text-white hover:border-white relative top-1"
          >
            <svg
              className="fill-current h-5 w-4"
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
