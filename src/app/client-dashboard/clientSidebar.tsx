"use client"; // this directive is required for Next.js for client components
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Correct import for Next.js 13+
import { cn } from "@/lib/utils"; // utility for conditional class names, assumed to be present in your project
import { Input } from "@/components/ui/input";

const menuItems = [
  {
    ID: 90,
    name: "Dashboard",
    icon: "/icons/icon_dashboard.svg",
    url: "/client-dashboard",
  },
  {
    ID: 91,
    name: "API subscriptions",
    icon: "",
    url: "/client-dashboard/api-subscriptions",
  },
  {
    ID: 92,
    name: "Billing",
    icon: "/icons/icon_billing.svg",
    url: "/client-dashboard/billing",
    children: [
      {
        name: "Transaction History",
        icon: "/icons/transaction-history.svg",
        url: "/client-dashboard/billing/transaction-history",
      },
      {
        name: "Subscriptions",
        icon: "/icons/credit-card.svg",
        url: "/client-dashboard/billing/subscriptions",
      }
    ],
  },
  // Add more client-specific links here
];

export default function ClientSidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const checkScreenSize = () => {
    if (window.innerWidth <= 888) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div
      className={`bg-black text-white pb-4 dark:bg-sidebar dark:text-white sticky top-0 transition-all duration-300 ${
        isMenuOpen ? "w-64" : "w-16 transform"
      } h-full min-h-screen flex flex-col`}
    >
      <Logo toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <Menu isMenuOpen={isMenuOpen} activePath={pathname} />
    </div>
  );
}

const Logo = ({ toggleMenu, isMenuOpen }:any) => (
  <div
    className={`flex items-center justify-between mt-4 px-4 ${
      isMenuOpen ? "" : "transform"
    }`}
  >
    {isMenuOpen && <img className="w-16" src="/logos/logo.svg" alt="Logo" />}
    <img
      className="cursor-pointer w-8"
      src="/icons/burger.svg"
      alt="Menu Toggle"
      onClick={toggleMenu}
    />
  </div>
);

const Menu = ({ isMenuOpen, activePath }:any) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchTerm) return menuItems;
    return menuItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="flex flex-col mt-6 text-sm">
      {filteredItems.map((item) => (
        <MenuItem
          key={item.ID}
          item={item}
          active={activePath.startsWith(item.url)}
          isMenuOpen={isMenuOpen}
        />
      ))}
      {isMenuOpen && (
        <div className="px-4 mt-2 mb-4">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ item, active, isMenuOpen } :any) => (
  <div className="flex flex-col items-start justify-start">
    <Link
      href={item.url}
      className={`w-full flex items-center gap-2 py-3 cursor-pointer ${
        active ? "bg-orangePure rounded-r-3xl" : ""
      }`}
    >
      <img
        className={`w-5 ${isMenuOpen ? "ml-8" : "ml-4"}`}
        src={item.icon}
        alt={item.name}
      />
      {isMenuOpen && <span>{item.name}</span>}
    </Link>
    {active && item.children && (
      <div className={`${isMenuOpen ? "ml-8" : "ml-2"} mt-2`}>
        {item.children.map((child:any) => (
          <Link key={child.url} href={child.url}>
            <div
              className={`flex items-center gap-2 text-sm text-gray-400 cursor-pointer ${
                isMenuOpen ? "ml-7" : "ml-0"
              }`}
            >
              <img className="w-5" src={child.icon} alt={child.name} />
              {isMenuOpen && <span>{child.name}</span>}
            </div>
          </Link>
        ))}
      </div>
    )}
  </div>
);
