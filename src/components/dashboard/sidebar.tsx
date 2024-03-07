// Sidebar.js
"use client";
import { useApiById, useApiByUserId } from "@/hooks/apis/api.queries";
import Link from "next/link";
import { memo, useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const pathname = usePathname();

  // Extract the active item and child from the current route
  const pathSegments = pathname.split("/");
  const activeItem = pathSegments[2]; // Assuming the item is the third segment
  let activeChildName = pathSegments[3]; // Assuming the child is the fourth segment
  const maApisListCallback = useCallback(() => useApiByUserId(123), []);
  const maApisList = maApisListCallback();
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
      className={` bg-black text-white  pb-4 dark:bg-sidebar overflow-scroll dark:text-white sticky top-0 ${
        isMenuOpen ? " w-1/4 " : " w-16 lg:w-[6%]  "
      } h-full min-h-screen `}
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

const Menu = ({
  isMenuOpen,
  apiId,
  maApisList,
  activeItem,
  activeChildName,
}: any) => {
  const menuItems = [
    {
      ID: 90,
      name: "Dashboard",
      icon: "/icons/icon_dashboard.svg",
      url: "/dashboard",
      active: true,
    },
    {
      ID: 91,
      name: "Inbox",
      icon: "/icons/icon_inbox.svg",
      url: "/dashboard/inbox",
      active: false,
    },
    {
      ID: 92,
      name: "Add new API",
      icon: "/icons/icon_business_time_solid.svg",
      url: "/dashboard/add-new-api",
      active: false,
    },
    {
      ID: 93,
      name: "Billing",

      icon: "/icons/icon_billing.svg",
      url: "/dashboard/billing/billing-information",
      active: false,
      children: [
        {
          name: "Billing Information",
          active: true,
          icon: "/icons/credit-card.svg",
          url: "/dashboard/billing/billing-information",
        },
        {
          name: "Transaction history",
          active: false,
          icon: "/icons/transaction-history.svg",
          url: "/dashboard/billing/transaction-history",
        },
        {
          name: "Subscription",
          active: false,
          icon: "/icons/subscription.svg",
          url: "/dashboard/billing/subscription",
        },
      ],
    },
  ];

  const activeOne = menuItems.find((item) => item.url.includes(activeItem));
  const [activeMenu, setActiveMenu] = useState<number>(
    apiId || activeOne?.ID || 90
  ); // 90 is the id of the dashboard

  const handleMenuClick = (ID: number) => {
    setActiveMenu(ID);
  };

  return (
    <div className="flex flex-col mt-6 text-sm">
      {menuItems.map((item) => (
        <RegularMenuItem
          key={item.ID}
          item={item}
          active={activeMenu === item.ID}
          onClick={handleMenuClick}
          isMenuOpen={isMenuOpen}
          activeChildName={activeChildName}
        />
      ))}
      {isMenuOpen && <Separator text="MY apis" />}
      {isMenuOpen && maApisList.isLoading && <div>Loading...</div>}
      {isMenuOpen &&
        maApisList.isSuccess &&
        maApisList.data.data
          .map((api: any) => {
            return {
              ID: api.ID,
              name: api.Name,
              active: api.ID == apiId,
            };
          })
          .map((item: any) => (
            <ApiMenuItem
              key={item.ID}
              item={item}
              active={activeMenu == item.ID}
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
}: any) => {
  const isActive = active;
  const [activeChild, setActiveChild] = useState(activeChildName);

  return (
    <div className="flex flex-col items-start justify-start w-4/5">
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
    <div className="flex flex-col items-start justify-start w-4/5">
      <Link
        href={url}
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
            const subUrl = `/dashboard/apis/${item.ID || 0}/${child.name}`;
            return (
              <Link
                href={subUrl}
                onClick={() => setActiveChild(child.name)}
                className={`flex items-center gap-2 text-sm text-gray-400 ml-7 cursor-pointer ${
                  isActive ? "text-white" : ""
                } ${isMenuOpen ? "ml-7" : "ml-0"}`}
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
