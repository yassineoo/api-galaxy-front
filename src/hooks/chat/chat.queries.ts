import {
  Chat,
  ChatMessage,
  ChatWithMessages,
} from "@/app/dashboard/inbox/chat.interface";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ApiUsersUrl } from "@/utils/constants";

function handleResponseError(error: unknown) {
  if (error instanceof Error) {
    throw error;
  }
  throw new Error("Internal Server Error");
}

export function useChatQuery(chatId: number) {
  return useQuery<ChatWithMessages>({
    queryKey: ["chats", `chat-${chatId}`],
    queryFn: async () => {
      try {
        const res = await axios.get(`${ApiUsersUrl}/chatrooms/${chatId}`);
        return res.data;
      } catch (error) {
        handleResponseError(error);
      }
    },
  });
}

export function useChatMessages(
  chatId: number,
  initialData: ChatMessage[] = []
) {
  return useQuery<ChatMessage[]>({
    queryKey: [`chat-${chatId}`, "messages"],
    initialData,
    // refetchOnWindowFocus: true,
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${ApiUsersUrl}/chatrooms/${chatId}/messages`
        );
        const data = res.data;
        console.log({ data });
        return data;
      } catch (error) {
        handleResponseError(error);
      }
    },
  });
}

export function useChatsQuery(userId: number = 1, search: string) {
  return useQuery<Chat[]>({
    queryKey: ["chats", `user-${userId}`, search],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${ApiUsersUrl}/chatrooms/users/${userId}?search=${search}`
        );

        if (!res?.ok) throw new Error(res.statusText);
        const data = await res.json();

        return data;
      } catch (error) {
        console.log({ error });
        handleResponseError(error);
      }
    },
  });
}
