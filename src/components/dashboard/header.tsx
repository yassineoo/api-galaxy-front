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
import { useSession } from "next-auth/react";
import Link from "next/link";
import Notifications from "./notification";
import Settings from "./settings";

const Header = () => {
  // State to manage dropdown visibility
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const { data: session, status } = useSession();

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

        <IconDropdown
          userId={session?.userId}
          icon={
            <div className="ml-4 relative flex justify-center items-center gap-6">
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
            </div>
          }
        />
      </div>
    </header>
  );
};

const IconDropdown = ({ icon, userId }: any) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger> {icon} </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {" "}
          <Link href={`/dashboard/profile/${userId}`} passHref>
            Profile{" "}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Header;
