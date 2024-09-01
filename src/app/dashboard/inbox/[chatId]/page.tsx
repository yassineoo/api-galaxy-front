"use client";

import Inbox from "../inbox";
import { getUserChatrooms } from "../page";
import { notFound } from "next/navigation";
import { Chat, ChatWithMessages } from "../chat.interface";
import Chatroom from "./chatroom";

import { ApiUsersUrl } from "@/utils/constants";
import { useSession } from "next-auth/react";
import { useAuthSession } from "@/components/auth-provider";


const user = { id: 1 };

async function getChatWithMessages(chatId: string): Promise<ChatWithMessages> {

  const res = await fetch(`${ApiUsersUrl}/chatrooms/${chatId}`, {

    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },

    // cache: "no-cache",
  });
  console.log({ res });


  if (!res.ok) return notFound();
  return await res.json();
}

export default async function page({
  params: { chatId },

  searchParams: { search },
}: {
  params: { chatId: string };
  searchParams: { search: string };
}) {
  // const { data: session } = useSession();
  const {session} = useAuthSession()
  console.log("session", session?.userId);

  const chatrooms = await getUserChatrooms(
    Number(session?.userId),
    search ?? ""
  ); //user.id
  const chatWithMessages = await getChatWithMessages(chatId);
  console.log({ chatWithMessages });
  return (
    <Inbox userId={Number(session?.userId)} chats={chatrooms}>

      <Chatroom chat={chatWithMessages} />
    </Inbox>
  );
  // const chatrooms = await getUserChatrooms(user.id, search);
}

