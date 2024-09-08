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

  return (
    <div className="w-56 min-w-56 md:w-72 md:min-w-72 overflow-y-auto overflow-x-hidden h-full border bg-white dark:bg-gray-900 shadow-lg rounded-md">
      <div className="space-y-3 p-4 w-full">
        {chats?.map((chat) => {
          const otherMember: Chat["users"][0] = chat.users.filter(
            (u) => u.id !== userId
          )[0];
          return (
            <div
              key={chat.id}
              className={`flex items-center gap-4 rounded-lg p-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all cursor-pointer ${
                selectedChatId === chat.id
                  ? "bg-blue-100 dark:bg-gray-700 border-2 border-blue-500"
                  : ""
              }`}
              onClick={() => onSelect(chat.id)}
            >
              {loading && selectedChatId === chat.id ? (
                <div className="flex justify-center items-center w-full h-full">
                  <RingLoader size="36" speedMultiplier={0.75} color="blue" />
                </div>
              ) : (
                <>
                  <Avatar className="w-10 h-10">
                    <AvatarImage alt="Avatar" src={otherMember?.avatar} />
                    <AvatarFallback
                      className={`text-lg uppercase text-white ${getColorByLetter(
                        otherMember.name.charAt(0)
                      )}`}
                    >
                      {otherMember.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 dark:text-white truncate">
                      {otherMember.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {chat?.lastMessage?.message || "No message yet"}
                    </div>
                  </div>
                  {chat?.lastMessage?.createdAt && (
                    <div className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
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
    <div className="border-b border-gray-300 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-900 shadow-md rounded-t-md">
      <form
        onSubmit={handleSearch}
        method="GET"
        action="/dashboard/inbox"
        className="relative"
      >
        <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-600 dark:text-gray-400" />
        <Input
          ref={inputRef}
          className="w-full rounded-full bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-50 pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          placeholder="Search messages"
          type="search"
          name="search"
          onChange={handleSearch}
        />
      </form>
    </div>
  );
}

export function getColorByLetter(letter: string) {
  const colors: { [key: string]: string } = {
    A: "bg-red-500",
    B: "bg-green-500",
    C: "bg-blue-500",
    D: "bg-yellow-500",
    E: "bg-purple-500",
    F: "bg-pink-500",
    G: "bg-indigo-500",
    H: "bg-teal-500",
    I: "bg-orange-500",
    J: "bg-lime-500",
    K: "bg-cyan-500",
    L: "bg-fuchsia-500",
    M: "bg-rose-500",
    N: "bg-emerald-500",
    O: "bg-amber-500",
    P: "bg-violet-500",
    Q: "bg-blue-600",
    R: "bg-red-600",
    S: "bg-green-600",
    T: "bg-yellow-600",
    U: "bg-purple-600",
    V: "bg-pink-600",
    W: "bg-indigo-600",
    X: "bg-teal-600",
    Y: "bg-orange-600",
    Z: "bg-lime-600",
  };

  // Convert the letter to uppercase to ensure consistency
  const upperLetter = letter.toUpperCase();

  // Return the color based on the letter, or a default color if the letter is not mapped
  return colors[upperLetter] || "bg-gray-500"; // Default color if letter not found
}
