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

import { useAuthSession } from "@/components/auth-provider";

export function useCreateMessageMutation(chatId: number) {
  const queryClient = useQueryClient();
  // const {data:session} = useSession()
  const { session } = useAuthSession();


  return useMutation({
    mutationKey: ["create-message", `chat-${chatId}`],

    mutationFn: async (input: { senderId: number; content: string }) => {
      const res = await axios.post(
        `http://localhost:7002/chatrooms/${chatId}/messages`,
        input,
        { headers: { "Authorization": `Bearer ${session?.token}` } }
      );

      const data = res.data;
      console.log({ data });

      return data as {
        id: number,
        chatroomId: number,
        userId: number,
        message: string,
        created_at: string,
      }
    },
    // onSuccess: async (data, variables, context) => {
    //   const queryFilters: QueryFilters = {
    //     queryKey: [`chat-${chatId}`, "messages"],
    //   };
    //   await queryClient.cancelQueries(queryFilters);

    //   queryClient.setQueriesData<ChatMessage[]>(queryFilters, (oldData) => {
    //     if (!oldData) return [data];
    //     return [...oldData, data];
    //   });

    //   await queryClient.invalidateQueries(queryFilters);
    // },
  });
}

