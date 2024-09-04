"use client";
import { ReactNode } from "react";
import { Chat } from "./chat.interface";
import { ChatListSearch, ChatsList } from "./chats_list";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { notFound } from "next/navigation";

function useChatWithMessagesQuery(chatId: string) {
  return useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `http://localhost:7002/chatrooms/${chatId}`
        );
        console.log({ res });
      } catch (error) {
        console.log({ error });
        return notFound();
      }
    },
  });
}

export default function Inbox({
  chats,
  userId,
}: {
  chats: Chat[];
  userId: number;
}) {
  return (
    <div className="flex h-[calc(100vh-70px)] w-full ">
      <div className="bg-gray-100 dark:bg-gray-900 w-56 min-w-56  md:w-72 md:min-w-72 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <ChatsList userId={userId} chats={chats} />
      </div>
      
    </div>
  );
}
