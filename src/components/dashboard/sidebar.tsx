// Sidebar.js
"use client";
import { useApiByUserId } from "@/hooks/apis/api.queries";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import {
  CircleDollarSignIcon,
  HistoryIcon,
  LayoutDashboardIcon,
  MenuIcon,
  MessageSquareIcon,
  PlusCircleIcon,
  ReceiptIcon,
  ScrollTextIcon,
  UsersIcon,
} from "lucide-react";
import { create } from "zustand";
import { Tooltip } from "recharts";

const menuItems = [
  {
    ID: 90,
    name: "Dashboard",
    icon: LayoutDashboardIcon,
    url: "/dashboard",
    active: true,
  },
  {
    ID: 91,
    name: "Inbox",
    icon: MessageSquareIcon,
    url: "/dashboard/inbox",
    active: false,
  },
  {
    ID: 92,
    name: "Add new API",
    icon: PlusCircleIcon,
    url: "/dashboard/add-new-api",
    active: false,
  },
  {
    ID: 93,
    name: "Billing",

    icon: CircleDollarSignIcon,
    url: "/dashboard/billing/billing-information",
    active: false,
    children: [
      {
        name: "Billing Information",
        active: true,
        icon: ReceiptIcon,
        url: "/dashboard/billing/billing-information",
      },
      {
        name: "Transaction history",
        active: false,
        icon: HistoryIcon,
        url: "/dashboard/billing/transaction-history",
      },
      {
        name: "Subscribers",
        active: false,
        icon: UsersIcon,
        url: "/dashboard/billing/subscribers",
      },
    ],
  },
];

const useSidebar = create<{
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setIsOpen: (open: boolean) => void;
}>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setIsOpen: (open: boolean) => set({ isOpen: open }),
}));

function SidebarSheet({
  apiId,
  maApisList,
  activeItem,
  activeChildName,
}: {
  apiId: number;
  maApisList: any;
  activeItem: any;
  activeChildName: any;
}) {
  const { isOpen, setIsOpen } = useSidebar();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen} defaultOpen={false}>
      <SheetContent
        className="bg-black border-black dark:bg-sidebar text-white dark:text-white px-0 max-w-sm w-full"
        position="left"
      >
        <SheetHeader>
          <SheetTitle>
            <AppLogo />
          </SheetTitle>
        </SheetHeader>
        <Menu
          isMenuOpen={isOpen}
          apiId={apiId}
          maApisList={maApisList}
          activeItem={activeItem}
          activeChildName={activeChildName}
        />
      </SheetContent>
    </Sheet>
  );
}

function MobileSidebar({
  apiId,
  maApisList,
  activeItem,
  activeChildName,
}: {
  apiId: number;
  maApisList: any;
  activeItem: any;
  activeChildName: any;
}) {
  const { isOpen } = useSidebar();
  return (
    <div
      className={`text-white bg-black dark:bg-sidebar py-2  dark:text-white sticky top-0 transition-all duration-300 border-r overflow-hidden border-black w-16 h-screen max-h-screen`}
    >
      <Logo />
      <SidebarSheet
        apiId={apiId}
        maApisList={maApisList}
        activeItem={activeItem}
        activeChildName={activeChildName}
      />
      <Menu
        isMenuOpen={isOpen}
        apiId={apiId}
        maApisList={maApisList}
        activeItem={activeItem}
        activeChildName={activeChildName}
      />
    </div>
  );
}

// function MobileSidebar() {
//   const [isOpen, setIsOpen] = useState(true);

//   if (isOpen) return <SmallSidebar />;
// }

function DesktopSidebar({
  apiId,
  maApisList,
  activeItem,
  activeChildName,
}: {
  apiId: number;
  maApisList: any;
  activeItem: any;
  activeChildName: any;
}) {
  const { isOpen } = useSidebar();
  return (
    <div
      className={cn(
        `text-white bg-black dark:bg-sidebar py-2 pt-1  dark:text-white sticky top-0 transition-all border-r overflow-hidden border-black w-16 h-screen max-h-screen duration-100`,
        isOpen && "w-full max-w-xs"
      )}
    >
      <Logo />
      <Menu
        isMenuOpen={isOpen}
        apiId={apiId}
        maApisList={maApisList}
        activeItem={activeItem}
        activeChildName={activeChildName}
      />
    </div>
  );
}

export default function Sidebar() {
  const [isMobileScreen, setIsMobileScreen] = useState(false);
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

  console.log({ isOpen: useSidebar().isOpen });

  useEffect(() => {
    if (window.innerWidth <= 768) setIsMobileScreen(true);
    else setIsMobileScreen(false);
  }, []);

  {
    /* <div className="block md:hidden"> */
  }
  if (isMobileScreen)
    return (
      <MobileSidebar
        maApisList={maApisList}
        apiId={apiId}
        activeItem={activeItem}
        activeChildName={activeChildName}
      />
    );
  else
    return (
      <DesktopSidebar
        maApisList={maApisList}
        apiId={apiId}
        activeItem={activeItem}
        activeChildName={activeChildName}
      />
    );
}

function AppLogo() {
  return <img className="absolute top-2 left-2 w-6" src="/logos/logo.svg" />;
}
const Logo = () => {
  const { isOpen, open, close } = useSidebar();
  function toggleSidebar() {
    if (isOpen) close();
    else open();
    return;
  }

  return (
    <div
      className={`flex items-center w-full  justify-center md:justify-between pt-2 md:pt-3 md:px-4 transform md:transform-none
         `}
    >
      {isOpen && <img className="w-12" src="/logos/logo.svg" />}

      <Button variant="ghost" size="icon" onClick={toggleSidebar}>
        <MenuIcon className="size-6" />
      </Button>
    </div>
  );
};

const Menu = ({ apiId, maApisList, activeItem, activeChildName }: any) => {
  const { isOpen } = useSidebar();
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
    <div className="flex flex-col flex-1 h-full pt-6 text-sm">
      <div className="flex flex-col  ">
        {menuItems.map((item: any) => (
          <RegularMenuItem
            key={item.ID}
            item={item}
            active={activeMenu === item.ID}
            onClick={handleMenuClick}
            isMenuOpen={isOpen}
            activeChildName={activeChildName}
          />
        ))}
      </div>
      {isOpen && (
        <>
          <Separator text="MY APIs" />
          <div className="px-4 pt-2 pb-4">
            <Input
              type="text"
              placeholder="Search APIs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-black dark:text-white"
            />
          </div>
          {maApisList.isLoading && (
            <div className="hidden md:block px-4">Loading...</div>
          )}
          <div className="h-64 relative max-h-full overflow-x-hidden ">
            <div className="flex flex-col items-start justify-start h-full">
              {maApisList.isSuccess &&
                filteredApis.map((api: any) => (
                  <ApiMenuItem
                    key={api.id}
                    item={{
                      ID: api.id,
                      name: api.name,
                      active: api.id == apiId,
                    }}
                    active={activeMenu == api.id}
                    onClick={handleMenuClick}
                    isMenuOpen={isOpen}
                    activeChildName={activeChildName}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ... (other imports)

const RegularMenuItem = ({
  item,
  active,
  onClick,
  activeChildName,
  key,
}: any) => {
  const isActive = active;
  const [activeChild, setActiveChild] = useState(activeChildName);
  const { isOpen } = useSidebar();
  return (
    <div
      key={key}
      className="flex flex-col items-start justify-start w-4/5 ml-1 "
    >
      <Link
        href={item.url}
        className={`w-full pl-4 flex items-center gap-2 py-3 cursor-pointer   rounded-r-3xl ${
          isActive ? "bg-orangePure hover:bg-orangePure" : "hover:bg-zinc-800"
        }`}
        onClick={() => onClick(item.ID)}
      >
        {/* <img className={`w-5 md:pl-8 pl-4 `} src={item.icon} /> */}
        <item.icon className="size-5" />
        {isOpen && <div className="text-white">{item.name}</div>}
        {isOpen && item.children && (
          <img className="pl-1 w-5" src="/icons/arrow.svg" />
        )}
      </Link>

      {isActive && isOpen && item.children && (
        <div
          className={`
            md:pl-8 pl-2 pr-4 pt-2 flex flex-col justify-start items-start w-full gap-2`}
        >
          {item.children.map((child: any) => {
            const handleChildClick = () => {
              setActiveChild(child.url);
            };
            return (
              <Link
                href={child.url}
                onClick={handleChildClick}
                className={`flex items-center gap-2  w-full text-sm group text-gray-400 cursor-pointer md:pl-7 pl-0`}
              >
                {child.icon && (
                  <child.icon
                    className={` text-white   ${
                      activeChild == child.url
                        ? "bg-orangePure hover:bg-orangePure w-9 border-1 border-orangePure rounded-full"
                        : "w-9 border-1 rounded-xl group-hover:bg-zinc-800"
                    }`}
                  />
                )}
                {isOpen && <div className="">{child.name}</div>}
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
      active: activeChildName === "Analyse",
      icon: "/icons/analytics.svg",
    },
    {
      name: "configuration",
      active: activeChildName === "configuration",
      icon: "/icons/config.svg",
    },
    {
      name: "Authorization",
      active: activeChildName === "configuration",
      icon: "/icons/auth.svg",
    },
  ];

  const [activeChild, setActiveChild] = useState(activeChildName);
  let url = `/dashboard/apis/${item.ID || 0}/Analyse`;

  return (
    <div
      className={cn(
        "flex flex-col items-start justify-start w-full text-white"
      )}
    >
      <Link
        href={url}
        className={`w-full pl-4 flex items-center gap-2 py-3 cursor-pointer rounded-r-3xl ${
          isActive ? "bg-orangePure" : "hover:bg-zinc-800"
        }`}
        onClick={() => onClick(item.ID)}
      >
        <img className={`w-5`} src={item.icon} />

        <div>{item.name}</div>
        {item.children && <img className="pl-1 w-3" src="/icons/arrow.svg" />}
      </Link>

      {isActive && item.children && (
        <div
          className={`md:pl-7 pl-2 pt-2 flex flex-col justify-start items-start w-full gap-2`}
        >
          {item.children.map((child: any) => {
            const subUrl = `/dashboard/apis/${item.ID || 0}/${child.name}`;
            return (
              <Link
                href={subUrl}
                onClick={() => setActiveChild(child.name)}
                className={`flex w-full pr-4 group items-center gap-2 text-sm text-gray-400 cursor-pointer ${
                  isActive ? "text-white" : ""
                } ${isMenuOpen ? "pl-7" : "pl-0"}`}
              >
                {child.icon && (
                  <img
                    className={`w-5 text-white p-2 ${
                      activeChild === child.name
                        ? "bg-orangePure w-9 border-1 border-orangePure rounded-xl"
                        : "w-9 border-1 group-hover:bg-zinc-800 rounded-xl"
                    }`}
                    src={child.icon}
                  />
                )}
                <div>{child.name}</div>
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
