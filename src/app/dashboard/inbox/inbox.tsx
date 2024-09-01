import { ReactNode } from "react";
import { Chat } from "./chat.interface";
import { ChatListSearch, ChatsList } from "./chats_list";

export default function Inbox({
  children,
  chats,
  userId,
}: {
  children: ReactNode;
  chats: Chat[];
  userId: number;
}) {
  return (
    <div className="flex h-[calc(100vh-70px)] w-full">
      <div className="bg-gray-100 dark:bg-gray-900 w-56 min-w-56  md:w-72 md:min-w-72 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <ChatListSearch />
        <ChatsList userId={userId} chats={chats} />
      </div>
      {children}
    </div>
  );
}
