// Sidebar.js
"use client";
import { useApiById, useApiByUserId } from "@/hooks/apis/api.queries";
import Link from "next/link";
import { memo, useCallback, useEffect, useState } from "react";

export default function Sidebar({ apiId }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const maApisListCallback = useCallback(() => useApiByUserId(123), []);
  const maApisList = maApisListCallback();

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
      className={` bg-black text-white  dark:bg-sidebar dark:text-white sticky top-0 ${
        isMenuOpen ? " w-1/4 " : " w-16 lg:w-[6%]  "
      } h-screen`}
    >
      <Logo toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <Menu isMenuOpen={isMenuOpen} apiId={apiId} maApisList={maApisList} />
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

const Menu = ({ isMenuOpen, apiId, maApisList }: any) => {
  const [activeMenu, setActiveMenu] = useState<number>(apiId || 90); // 90 is the id of the dashboard

  const menuItems = [
    {
      ID: 90,
      name: "Dashboard",
      icon: "/icons/icon_dashboard.svg",
      active: true,
    },
    {
      ID: 91,

      name: "Inbox",
      icon: "/icons/icon_inbox.svg",
      active: false,
    },
    {
      ID: 92,

      name: "Add new API",
      icon: "/icons/icon_business_time_solid.svg",
      active: false,
    },
    {
      ID: 93,

      name: "Billing",
      icon: "/icons/icon_billing.svg",
      active: false,
      children: [
        {
          name: "Billing Information",
          active: true,
          icon: "/icons/credit-card.svg",
        },
        {
          name: "transaction history",
          active: false,
          icon: "/icons/transaction-history.svg",
        },
        {
          name: "Subscription",
          active: false,
          icon: "/icons/subscription.svg",
        },
      ],
    },
  ];

  const handleMenuClick = (event: any) => {
    setActiveMenu(event.target.value);
  };

  return (
    <div className="flex flex-col mt-6 text-sm">
      {menuItems.map((item) => (
        <MenuLink
          isMenuOpen={isMenuOpen}
          key={item.ID}
          item={item}
          onClick={() => setActiveMenu(item.ID)}
          active={activeMenu === item.ID}
        />
      ))}
      {isMenuOpen && <Separator text="MY apis" />}
      {isMenuOpen && maApisList.isLoading && <div>Loading...</div>}
      {isMenuOpen &&
        maApisList.isSuccess &&
        maApisList.data.data
          .map((api: any) => {
            console.log(
              "api maping ============= ",
              api.ID,
              api.ID == apiId,
              apiId
            );

            return {
              ID: api.ID,
              name: api.Name,
              active: api.ID == apiId,
            };
          })
          .map((item: any) => (
            <MenuLink
              isMenuOpen={isMenuOpen}
              key={item.ID}
              item={item}
              isApi
              onClick={handleMenuClick}
              active={activeMenu == item.ID}
            />
          ))}
    </div>
  );
};

// ... (other imports)

const RegularMenuItem = ({ item, active, onClick, isMenuOpen }: any) => {
  const isActive = active;

  let url = `/dashboard${item.name.toLowerCase().replace(/ /g, "-")}`;

  return (
    <div className="flex flex-col items-start justify-start w-4/5">
      <Link
        href={url}
        className={`w-full flex items-center gap-2 py-3 cursor-pointer ${
          isActive ? "bg-orangePure rounded-r-3xl" : ""
        }`}
        onClick={onClick}
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
            const subUrl = `/${item.name
              .toLowerCase()
              .replace(/ /g, "-")}/${child.name
              .toLowerCase()
              .replace(/ /g, "-")}`;
            return (
              <Link
                href={subUrl}
                onClick={onClick}
                className={`flex items-center gap-2 text-sm text-gray-400 ml-7 cursor-pointer ${
                  isMenuOpen ? "ml-7" : "ml-0"
                }`}
              >
                {child.icon && (
                  <img
                    className={`w-5 text-white p-2 ${
                      isActive
                        ? "bg-orangePure w-7 border-4 border-orangePure rounded-xl"
                        : ""
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

const ApiMenuItem = ({ item, active, onClick, isMenuOpen }: any) => {
  const isActive = active;

  // Assuming isApi should have some custom logic
  item.icon = "/icons/api_icon.svg";
  item.children = [
    {
      name: "Analyse",
      active: true,
      icon: "/icons/analytics.svg",
    },
    {
      name: "configuration",
      active: false,
      icon: "/icons/config.svg",
    },
    {
      name: "Authorization",
      active: false,
      icon: "/icons/auth.svg",
    },
  ];

  const [activeChild, setActiveChild] = useState("Billing Information");
  let url = `/dashboard/apis/${item.ID || 0}`;

  return (
    <div className="flex flex-col items-start justify-start w-4/5">
      <Link
        href={url}
        className={`w-full flex items-center gap-2 py-3 cursor-pointer ${
          isActive ? "bg-orangePure rounded-r-3xl" : ""
        }`}
        onClick={onClick}
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
            const subUrl = `/${item.name
              .toLowerCase()
              .replace(/ /g, "-")}/${child.name
              .toLowerCase()
              .replace(/ /g, "-")}`;
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
                        ? "bg-orangePure w-7 border-4 border-orangePure rounded-xl"
                        : ""
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

const MenuLink = ({
  item,
  active,
  onClick,
  isApi,
  isMenuOpen,
  isAddNewApi,
}: any) => {
  if (isApi) {
    return (
      <ApiMenuItem
        key={item.ID}
        item={item}
        active={active}
        onClick={onClick}
        isMenuOpen={isMenuOpen}
      />
    );
  } else {
    return (
      <RegularMenuItem
        key={item.ID}
        item={item}
        active={active}
        onClick={onClick}
        isMenuOpen={isMenuOpen}
      />
    );
  }
};

const Separator = ({ text }: any) => {
  return (
    <div className="flex items-center my-5">
      <div className="flex-grow border-t"></div>
      <span className="mx-2 font-semibold uppercase">{text}</span>
      <div className="flex-grow border-t"></div>
    </div>
  );
};