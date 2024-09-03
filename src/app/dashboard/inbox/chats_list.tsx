"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Chat } from "./chat.interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

import { RingLoader } from "react-spinners";
import { useAuthSession } from "@/components/auth-provider";

function SearchIcon(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function ChatsList({
  chats,
  userId,
  selectedChatId,
  onSelect,
}: {
  chats: Chat[];
  userId: number;
  selectedChatId: number | null;
  onSelect: (id: number) => void;
}) {
  const params = useParams();
  const chatId = params.chatId as string;

  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  // const [selectedChatId, setSelectedChatId] = useState<number | undefined>(
  // chatId && chats.map((chat) => chat.id).includes(parseInt(chatId))
  // ? parseInt(chatId)
  // : undefined
  // );

  // const chatrooms = chats.filter((chat) =>
  // chat.users.map((u) => u.name.toLowerCase().includes(search)).includes(true)
  // );

  // const handleChatClick = async (chatId: number) => {
  // setLoading(true);
  // onSelect(chatId);
  // await router.push(`/dashboard/inbox/${chatId}`);
  // setLoading(false);
  // };

  return (
    <div className="w-56 min-w-56 md:w-72 md:min-w-72 overflow-y-auto overflow-x-hidden">
      <div className="space-y-2 p-4 w-full">
        {chats?.map((chat) => {
          const otherMember: Chat["users"][0] = chat.users.filter(
            (u) => u.id !== userId
          )[0];
          return (
            <div
              key={chat.id}
              className={`flex items-center gap-3 rounded-md p-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer ${
                selectedChatId === chat.id ? "bg-gray-300 dark:bg-gray-700" : ""
              }`}
              onClick={() => onSelect(chat.id)}
            >
              {loading && selectedChatId === chat.id ? (
                <RingLoader size="78" speedMultiplier={0.5} color="blue" />
              ) : (
                <>
                  <Avatar>
                    <AvatarImage alt="Avatar" src={otherMember?.avatar} />
                    <AvatarFallback className="text-lg uppercase">
                      {otherMember.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium break-words line-clamp-1">
                      {otherMember.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 break-words">
                      {chat?.lastMessage?.message}
                    </div>
                    {chat?.lastMessage?.createdAt && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 block md:hidden">
                        {format(
                          new Date(chat?.lastMessage?.createdAt ?? new Date()),
                          "p"
                        )}
                      </div>
                    )}
                  </div>
                  {chat?.lastMessage?.createdAt && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 hidden md:block">
                      {format(
                        new Date(chat?.lastMessage?.createdAt ?? new Date()),
                        "p"
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ChatListSearch() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  async function handleSearch() {
    if (!inputRef.current) return;
    router.replace(
      `/dashboard/inbox?search=${inputRef.current?.value.toLowerCase()}`
    );
  }

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 p-4 ">
      <form
        onSubmit={handleSearch}
        method="GET"
        action="/dashboard/inbox"
        className="relative"
      >
        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          ref={inputRef}
          className="w-full rounded-md bg-white px-8 py-2 text-sm focus:outline-none dark:bg-gray-800 dark:text-gray-50"
          placeholder="Search messages"
          type="search"
          name="search"
          onChange={handleSearch}
        />
      </form>
    </div>
  );
}
