import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <>
      <div className="flex flex-col items-center gap-6 p-6 md:flex-row md:items-start md:gap-10 lg:p-10">
        <Avatar className="h-20 w-20">
          <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col items-center gap-2 md:items-start">
          <h2 className="text-2xl font-bold">Jared Palmer</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            example@acme.inc
          </p>
          <div className="flex items-center gap-2 text-sm">
            <UserIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400">Admin</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CalendarDaysIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400">
              Joined January 2023
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckIcon className="h-4 w-4 text-green-500" />
            <p className="text-green-500">Active</p>
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex justify-center p-6 md:p-10">
        <Button>Edit Profile</Button>
      </div>

      <div className="pl-8">
        <span className="my-4 px-6 font-semibold"> Reviews </span>
        <Separator className="h-1" />

        <div className="flex flex-col items-start  justify-start my-6">
          <div className="flex justify-start items-center gap-6">
            <Avatar className="h-10 w-10 bg-fuchsia-500 p-1 ">
              <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div>
              <h3>Jared Palmer</h3>
              <p> xqs,qm qsmq </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CalendarDaysIcon(props: any) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function CheckIcon(props: any) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function UserIcon(props: any) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
