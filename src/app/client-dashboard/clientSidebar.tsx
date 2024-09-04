// Sidebar.js
"use client";
import { useApiByUserId } from "@/hooks/apis/api.queries";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const menuItems = [
  {
    ID: 90,
    name: "Dashboard",
    icon: "/icons/icon_dashboard.svg",
    url: "/client-dashboard",
  },
  {
    ID: 94,
    name: "Inbox",
    icon: "/icons/icon_inbox.svg",
    url: "/client-dashboard/inbox",
    active: false,
  },
  {
    ID: 91,
    name: "API subscriptions",
    icon: "/icons/icon_billing.svg",
    url: "/client-dashboard/api-subscriptions",
  },

  {
    ID: 92,
    name: "Billing",
    icon: "/icons/icon_billing.svg",
    url: "/client-dashboard/billing/transaction-history",
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
      },
    ],
  },
  // Add more client-specific links here
];
export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const pathname = usePathname();

  // Extract the active item and child from the current route
  const pathSegments = pathname.split("/");
  const activeItem = pathSegments[2]; // Assuming the item is the third segment
  let activeChildName = pathSegments[3]; // Assuming the child is the fourth segment

  const maApisListCallback = useCallback(() => useApiByUserId(1), []);
  const maApisList = maApisListCallback();
  console.log("maApisList-------", maApisList.data);

  let apiId = 0;
  if (activeItem != "apis") {
    activeChildName = pathname;
  } else {
    activeChildName = pathSegments[4];
    apiId = Number(pathSegments[3]);
  }

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
      className={`bg-black text-white  pb-4 dark:bg-sidebar  dark:text-white sticky top-0 transition-all duration-300 border-r overflow-y-auto border-black  ${
        isMenuOpen ? "w-1/4" : "w-16 lg:w-[6%] transform" // Use transform class for animation
      } h-screen max-h-full`}
    >
      <Logo toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <Menu
        isMenuOpen={isMenuOpen}
        apiId={apiId}
        maApisList={maApisList}
        activeItem={activeItem}
        activeChildName={activeChildName}
      />
    </div>
  );
}

const Logo = ({ toggleMenu, isMenuOpen }: any) => {
  return (
    <div
      className={`flex items-center w-full justify-between pt-4 px-4 ${
        isMenuOpen ? "" : "transform"
      }`}
    >
      {isMenuOpen && <img className="w-16" src="/logos/logo.svg" />}
      <img
        className="cursor-pointer w-8"
        src="/icons/buger.svg"
        onClick={toggleMenu}
      />
    </div>
  );
};

const Menu = ({
  isMenuOpen,
  apiId,
  maApisList,
  activeItem,
  activeChildName,
}: any) => {
  const activeOne = menuItems.find((item) => item.url.includes(activeItem));
  const [activeMenu, setActiveMenu] = useState(apiId || activeOne?.ID || 90);
  const [searchTerm, setSearchTerm] = useState("");

  const handleMenuClick = (ID: any) => {
    setActiveMenu(ID);
  };

  const filteredApis = useMemo(() => {
    if (!maApisList.isSuccess || !maApisList.data) return [];
    return maApisList.data.filter((api: any) =>
      api.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [maApisList.data, maApisList.isSuccess, searchTerm]);

  return (
    <div className="flex flex-col h-full max-h-full overflow-y-auto pt-6 text-sm">
      {menuItems.map((item: any) => (
        <RegularMenuItem
          key={item.ID}
          item={item}
          active={activeMenu === item.ID}
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
    <div key={key} className="flex flex-col items-start justify-start w-4/5">
      <Link
        href={item.url}
        className={`w-full flex items-center gap-2 py-3 cursor-pointer ${
          isActive ? "bg-orangePure rounded-r-3xl" : ""
        }`}
        onClick={() => onClick(item.ID)}
      >
        <img
          className={`w-5 ${isMenuOpen ? "ml-8" : "ml-4"} `}
          src={item.icon}
        />

        {isMenuOpen && <div>{item.name}</div>}
        {item.children && isMenuOpen && (
          <img className="pl-1 w-5" src="/icons/arrow.svg" />
        )}
      </Link>

      {isActive && item.children && (
        <div
          className={`${
            isMenuOpen ? "pl-8" : "pl-2"
          } pr-4 pt-2 flex flex-col justify-start items-start w-full gap-2`}
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
                className={`flex items-center gap-2 text-sm text-gray-400 pl-7 cursor-pointer ${
                  isMenuOpen ? "pl-7" : "pl-0"
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

const ApiMenuItem = ({
  item,
  active,
  onClick,
  isMenuOpen,
  activeChildName,
}: any) => {
  const isActive = active;

  // Assuming isApi should have some custom logic
  item.icon = "/icons/api_icon.svg";
  item.children = [
    {
      name: "Analyse",
      active: activeChildName == "Analyse",
      icon: "/icons/analytics.svg",
    },
    {
      name: "configuration",
      active: activeChildName == "configuration",
      icon: "/icons/config.svg",
    },
    {
      name: "Authorization",
      active: activeChildName == "configuration",
      icon: "/icons/auth.svg",
    },
  ];

  const [activeChild, setActiveChild] = useState(activeChildName);
  let url = `/dashboard/apis/${item.ID || 0}/Analyse`;

  return (
    <div className={cn("flex flex-col items-start justify-start w-full")}>
      <Link
        href={url}
        className={`w-full flex items-center gap-2 py-3 cursor-pointer ${
          isActive ? "bg-orangePure rounded-r-3xl" : ""
        }`}
        onClick={() => onClick(item.ID)}
      >
        <img
          className={`w-5 ${isMenuOpen ? "pl-4" : "pl-4"} `}
          src={item.icon}
        />

        {isMenuOpen && <div>{item.name}</div>}
        {item.children && isMenuOpen && (
          <img className="pl-1 w-3" src="/icons/arrow.svg" />
        )}
      </Link>

      {isActive && item.children && (
        <div
          className={`${
            isMenuOpen ? "pl-8" : "pl-2"
          } pr-4 pt-2 flex flex-col justify-start items-start w-full gap-2`}
        >
          {item.children.map((child: any) => {
            const subUrl = `/dashboard/apis/${item.ID || 0}/${child.name}`;
            return (
              <Link
                href={subUrl}
                onClick={() => setActiveChild(child.name)}
                className={`flex items-center gap-2 text-sm text-gray-400 pl-7 cursor-pointer ${
                  isActive ? "text-white" : ""
                } ${isMenuOpen ? "pl-7" : "pl-0"}`}
              >
                {child.icon && (
                  <img
                    className={`w-5 text-white p-2 ${
                      activeChild === child.name
                        ? "bg-orangePure w-9 border-1 border-orangePure rounded-xl"
                        : "w-9 border-1"
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

// ... (other components)

const Separator = ({ text }: any) => {
  return (
    <div className="flex items-center my-5">
      <div className="flex-grow border-t"></div>
      <span className="mx-2 font-semibold uppercase">{text}</span>
      <div className="flex-grow border-t"></div>
    </div>
  );
};
