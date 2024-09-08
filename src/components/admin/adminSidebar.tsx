// Sidebar.js
"use client";
import { useApiByUserId } from "@/hooks/apis/api.queries";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, usePathname } from "next/navigation";
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
  SettingsIcon,
  LoaderIcon,
} from "lucide-react";
import { create } from "zustand";
import { Tooltip } from "recharts";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboardIcon,

    url: "/admin",
    active: true,
    ID: 90,
  },
  {
    name: "Users",
    icon: UsersIcon,

    url: "/admin/users",
    active: false,
    ID: 91,
  },
  {
    name: "Apis",
    icon: LoaderIcon,

    url: "/admin/apis",
    active: false,
    ID: 92,
  },
  {
    name: "Content",
    icon: ReceiptIcon,

    url: "/admin/reports",
    active: false,
    ID: 93,
  },
  {
    name: "Settings",
    icon: SettingsIcon,

    url: "/admin/settings",
    active: false,
    ID: 94,
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
        className="bg-[#0f172a] border-black dark:bg-sidebar text-white dark:text-white px-0 max-w-sm w-full"
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
        `text-white bg-[#0f172a] dark:bg-sidebar py-2 pt-1  dark:text-white sticky top-0 transition-all border-r overflow-hidden border-black w-16 h-screen max-h-screen duration-100`,
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
    </div>
  );
};
