// AdminSidebar.js
"use client";
import { useApiById, useApiByUserId } from "@/hooks/apis/api.queries";
import Link from "next/link";
import { memo, useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const pathname = usePathname();

  // Extract the active item and child from the current route
  const pathSegments = pathname.split("/");
  const activeItem = pathSegments[2]; // Assuming the item is the third segment
  const activeChildName = pathSegments[3]; // Assuming the child is the fourth segment

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const checkScreenSize = () => {
    if (window.innerWidth <= 888) {
      // Assuming 768px is your 'medium' breakpoint
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
      className={`bg-blue-900 text-white pb-4 dark:bg-blue-950 overflow-scroll dark:text-white sticky top-0 transition-all duration-300 ${
        isMenuOpen ? "w-1/4" : "w-16 lg:w-[6%] transform" // Use transform class for animation
      } h-full min-h-screen`}
    >
      <Logo toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

      <Menu
        isMenuOpen={isMenuOpen}
        activeItem={activeItem}
        activeChildName={activeChildName}
      />

      <div className="flex  w-full justify-center items-center text-bold    ">
        Disconnect
      </div>
    </div>
  );
}

const Logo = ({ toggleMenu, isMenuOpen }: any) => {
  return (
    <div className={`flex items-center w-full  justify-between  mt-4 px-4 `}>
      {isMenuOpen && <img className="w-16" src="/logos/logo.svg" />}
      <img
        className="cursor-pointer w-8"
        src="/icons/buger.svg"
        onClick={toggleMenu}
      />
    </div>
  );
};

const Menu = ({ isMenuOpen, activeItem, activeChildName }: any) => {
  const menuItems = [
    {
      name: "Dashboard",
      icon: "/icons/icon_dashboard.svg",
      url: "/admin",
      active: true,
    },
    {
      name: "Users",
      icon: "/icons/icon_business_time_solid.svg",
      url: "/admin/users",
      active: false,
    },
    {
      name: "Apis",
      icon: "/icons/icon_business_time_solid.svg",
      url: "/admin/apis",
      active: false,
    },
    {
      name: "Reports",
      icon: "/icons/icon_billing.svg",
      url: "/admin/reports",
      active: false,
    },
    {
      name: "Settings",
      icon: "/icons/icon_billing.svg",
      url: "/admin/settings",
      active: false,
    },
  ];

  const activeOne = menuItems.find((item) =>
    item.url.toLowerCase().includes(activeItem)
  );
  const [activeMenu, setActiveMenu] = useState<string>(
    activeOne?.name || "Dashboard"
  ); // 90 is the id of the dashboard

  const handleMenuClick = (Name: string) => {
    setActiveMenu(Name);
  };
  return (
    <div className="flex flex-col mt-6 text-sm">
      {menuItems.map((item) => (
        <RegularMenuItem
          key={item.name}
          item={item}
          active={activeMenu === item.name}
          onClick={handleMenuClick}
          isMenuOpen={isMenuOpen}
          activeChildName={activeChildName}
        />
      ))}
    </div>
  );
};

// ... (other imports)

const RegularMenuItem = ({
  item,
  active,
  onClick,
  isMenuOpen,
  activeChildName,
  key,
}: any) => {
  const isActive = active;
  const [activeChild, setActiveChild] = useState(activeChildName);

  return (
    <div className="flex flex-col items-start justify-start w-4/5" key={key}>
      <Link
        href={item.url}
        className={`w-full flex items-center gap-2 py-3 cursor-pointer ${
          isActive ? "bg-slate-200 rounded-r-3xl text-black" : ""
        }`}
        onClick={() => onClick(item.name)}
      >
        <img
          className={`w-5 text-black ${isMenuOpen ? "ml-8" : "ml-4"} `}
          src={item.icon}
        />

        {isMenuOpen && <div>{item.name}</div>}
        {item.children && isMenuOpen && (
          <img className="ml-1 w-5" src="/icons/arrow.svg" />
        )}
      </Link>

      {isActive && item.children && (
        <div
          className={`${
            isMenuOpen ? "ml-8" : "ml-2"
          } mr-4 mt-2 flex flex-col justify-start items-start w-full gap-2`}
        >
          {item.children.map((child: any) => {
            const handleChildClick = () => {
              console.log("child.url ========= ", child.url);

              setActiveChild(child.url);
            };
            return (
              <Link
                href={child.url}
                onClick={handleChildClick}
                className={`flex items-center gap-2 text-sm text-gray-400 ml-7 cursor-pointer ${
                  isMenuOpen ? "ml-7" : "ml-0"
                }`}
              >
                {child.icon && (
                  <img
                    className={`w-5 text-white p-2 ${
                      activeChild == child.url
                        ? "bg-orangePure w-9 border-1 border-orangePure rounded-xl"
                        : "w-9 border-1 rounded-xl"
                    }`}
                    src={child.icon}
                  />
                )}
                {isMenuOpen && <div>{child.name}</div>}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
