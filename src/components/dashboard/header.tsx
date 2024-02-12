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

const Header = () => {
  // State to manage dropdown visibility
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

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
        <IconDropdown icon={<span>🔔</span>} />
        <IconDropdown icon={<span>⚙️</span>} />

        {/* Profile dropdown */}
        <UserNav />
        <IconDropdown
          icon={
            <div className="ml-4 relative">
              <img
                src="/images/login_bg_gateway.jpg" // replace with your image path
                alt="User profile"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
            </div>
          }
        />
      </div>
    </header>
  );
};

const IconDropdown = ({ icon }: any) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger> {icon} </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Header;
