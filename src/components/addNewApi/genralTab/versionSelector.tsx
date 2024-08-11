import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ManageVersions from "./manageVersion";

export default function VersionSelector() {
  const [selectedVersion, setSelectedVersion] = useState({
    version: "v1.2.3",
    status: "Current",
  });
  const versions = [
    {
      version: "v1.2.3",
      status: "Current",
    },
    {
      version: "v1.2.2",
      status: "Old",
    },
    {
      version: "v1.2.1",
      status: "Old",
    },
  ];

  const handleVersionSelect = (version: {
    version: string;
    status: string;
  }) => {
    setSelectedVersion(version);
  };

  return (
    <div className="ml-12">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <ViewIcon className="w-4 h-4" />
            <span>Version {selectedVersion.version}</span>
            <ChevronDownIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Select Version</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {versions.map((version) => (
              <DropdownMenuItem
                key={version.version}
                onSelect={() => handleVersionSelect(version)}
              >
                <div className="flex items-center justify-between gap-2">
                  <span>{version.version}</span>
                  {version.version === selectedVersion.version && (
                    <div className="rounded-full bg-green-100 px-2 py-1 text-green-600">
                      Current
                    </div>
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <ManageVersions versions={versions} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// ... (rest of the code remains the same)

function ChevronDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ViewIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
      <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
