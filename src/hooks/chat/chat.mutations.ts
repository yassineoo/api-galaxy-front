import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

import {
  ChatMessage,
  ChatWithMessages,
} from "@/app/dashboard/inbox/chat.interface";
import { ApiUsersUrl } from "@/utils/constants";

export function useCreateMessageMutation(chatId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-message", `chat-${chatId}`],
    mutationFn: async (input: { senderId: number; content: string }) => {
      const res = await axios.post(
        `${ApiUsersUrl}/chatrooms/${chatId}/messages`,
        input
      );

      const data = res.data;
      console.log({ data });

      return data;
    },
    onSuccess: async (data, variables, context) => {
      const queryFilters: QueryFilters = {
        queryKey: [`chat-${chatId}`, "messages"],
      };
      await queryClient.cancelQueries(queryFilters);

      queryClient.setQueriesData<ChatMessage[]>(queryFilters, (oldData) => {
        if (!oldData) return [data];
        return [...oldData, data];
      });

      await queryClient.invalidateQueries(queryFilters);
    },
  });
}

