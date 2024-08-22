"use client";
import Inbox from "./inbox";
import { Chat } from "./chat.interface";
import { ApiUsersUrl } from "@/utils/constants";
import { useSession } from "next-auth/react";
import { RingLoader } from "react-spinners";
import { useEffect, useState } from "react";

export async function getUserChatrooms(
  userId: number,
  search: string
): Promise<Chat[]> {
  console.log("getUserChatrooms", { userId, search });

  if (!userId) return [];
  const res = await fetch(
    `${ApiUsersUrl}/chatrooms/users/${userId}?search=${search}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      //     cache: "no-cache",
    }
  );
  if (!res?.ok) return [];
  return await res.json();
}

export default function InboxPage({
  searchParams: { search, userId },
}: {
  searchParams: { search: string; userId: string };
}) {
  const { data: session } = useSession();
  const [chatrooms, setChatrooms] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatrooms = async () => {
      setLoading(true);
      const chatrooms = await getUserChatrooms(
        Number(session?.userId),
        search ?? ""
      );
      setChatrooms(chatrooms);
      setLoading(false);
    };

    if (session?.userId) {
      fetchChatrooms();
    }
  }, [session?.userId, search]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <RingLoader size="78" speedMultiplier={0.5} color="blue" />
      </div>
    );
  }

  return (
    <Inbox chats={chatrooms} userId={Number(session?.userId)}>
      <div className="w-full grid place-content-center">
        No chat selected yet
      </div>
    </Inbox>
  );
}
