import { chatroomsServiceUrl } from "@/hooks/chat/chat.queries";
import Inbox from "./inbox";
import { Chat } from "./chat.interface";

export async function getUserChatrooms(
  userId: number,
  search: string
): Promise<Chat[]> {
  const res = await fetch(
    `${chatroomsServiceUrl}/users/${userId}?search=${search}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );
  if (!res?.ok) return [];
  return await res.json();
}

const user = { id: 1 };

export default async function InboxPage({
  searchParams: { search, userId },
}: {
  searchParams: { search: string; userId: string };
}) {
  const chatrooms = await getUserChatrooms(Number(userId), search ?? "");
  console.log({ userId });
  console.log({ chatrooms });

  return (
    <Inbox chats={chatrooms} userId={Number(userId)}>
      <div className="w-full grid place-content-center">
        No chat selected yet
      </div>
    </Inbox>
  );
}
