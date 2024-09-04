"use client";
import Inbox from "./inbox";
import { Chat, ChatWithMessages } from "./chat.interface";
import { ApiUsersUrl } from "@/utils/constants";
import { useSession } from "next-auth/react";
import { RingLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useAuthSession } from "@/components/auth-provider";
import axios from "axios";
import { ChatsList } from "./chats_list";
import Chatroom from "./[chatId]/chatroom";

export async function getUserChatrooms(
  userId: number,
  search: string
): Promise<Chat[]> {
  console.log("getUserChatrooms", { userId, search });

  if (!userId) return [];
  try {
    const res = await axios.get(
      `${ApiUsersUrl}/chatrooms/users/${userId}?search=${search}`
    );
    console.log({ data: res.data });
    return res.data;
  } catch (error) {
    console.log({ error });
    return [];
  }
}

export default function InboxPage({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) {
  const { session } = useAuthSession();
  const [chatrooms, setChatrooms] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  console.log({ selectedChatId });
  function handleSelectChat(id: number) {
    setSelectedChatId(id);
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatrooms = async () => {
      // setLoading(true);
      const chatrooms = await getUserChatrooms(
        Number(session?.userId),
        search ?? ""
      );
      console.log({ chatrooms });
      setChatrooms(chatrooms);
      // setLoading(false);
    };

    if (session?.userId) {
      fetchChatrooms();
    }
  }, [session?.userId, search]);

  // if (loading) {
  // return (
  // <div className="w-full h-full flex justify-center items-center">
  {
    /* <RingLoader size="78" speedMultiplier={0.5} color="blue" /> */
  }
  {
    /* </div> */
  }
  // );
  // }

  useEffect(() => {
    setSelectedChatId(chatrooms[0]?.id);
  }, [chatrooms]);

  return (
    <div className="flex h-[calc(100vh-64px)] w-full">
      <div className="bg-gray-100 dark:bg-gray-900 w-56 min-w-56  md:w-72 md:min-w-72 border-r border-gray-200 dark:border-gray-800 flex flex-col ">
        <ChatsList
          selectedChatId={selectedChatId}
          userId={session?.userId as number}
          chats={chatrooms}
          onSelect={handleSelectChat}
        />
      </div>
      {selectedChatId ? (
        <Chatroom
          chat={
            chatrooms.find((r) => r.id === selectedChatId) as ChatWithMessages
          }
        />
      ) : (
        "No Chat Selected Yet"
      )}
    </div>
  );
}
