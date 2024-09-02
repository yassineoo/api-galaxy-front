// components/Header.js
"use client";
import { useState } from "react";
import { ModeToggle } from "../darkModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserNav } from "./usernav";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Notifications from "./notification";
import Settings from "./settings";
import { useAuthSession } from "../auth-provider";
import { useRouter } from "next/navigation";

const Header = () => {
  // State to manage dropdown visibility
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const { session } = useAuthSession();
  console.log("sessionnn", session);

  return (
    <header className="bg-white w-full  dark:bg-slate-900  p-4 flex justify-between 2xl:justify-around items-center">
      {/* Left side: Dashboard */}
      <div>
        <span className="text-lg font-bold">Dashboard</span>
      </div>

      {/* Right side: Dropdown menu */}

      {/* Dropdown toggle button */}

      {/* Add your icons here */}
      <div className="flex items-center justify-center gap-2">
        <ModeToggle />
        <Notifications />
        <Settings />

        {/* Profile dropdown */}

        <IconDropdown session={session}>
          {/* <div className="ml-4 relative flex justify-center items-center gap-6">
            {session?.user?.name}
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={session?.user?.image || ""}
                  alt="User Avatar"
                />
                <AvatarFallback>
                  {session?.user?.name || "User Avatar"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </div> */}
        </IconDropdown>
      </div>
    </header>
  );
};

const IconDropdown = ({ session }: any) => {
  const router = useRouter();
  const signOutUser = async () => {
    const isVerified = localStorage.getItem("isVerified");
    if (isVerified) {
      localStorage.removeItem("isVerified");
    }
    signOut().then(() => router.push("/login"));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="ml-4 relative flex justify-center items-center gap-6">
          {session?.user?.name}
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={session?.user?.image || ""} alt="User Avatar" />
              <AvatarFallback>
                {session?.user?.name || "User Avatar"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/profile/${session?.userId}`}>Profile </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/hub`}>Hub</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {" "}
          <span onClick={() => signOutUser()}>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Header;
