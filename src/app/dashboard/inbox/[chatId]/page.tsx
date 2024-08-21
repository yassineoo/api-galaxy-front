import { chatroomsServiceUrl } from "@/hooks/chat/chat.queries";
import Inbox from "../inbox";
import { getUserChatrooms } from "../page";
import { notFound } from "next/navigation";
import { Chat, ChatWithMessages } from "../chat.interface";
import Chatroom from "./chatroom";

const user = { id: 1 };

async function getChatWithMessages(chatId: string): Promise<ChatWithMessages> {
  const res = await fetch(`${chatroomsServiceUrl}/${chatId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  if (!res.ok) return notFound();
  return await res.json();
}

export default async function page({
  params: { chatId },
  searchParams: { search, userId },
}: {
  params: { chatId: string };
  searchParams: { search: string; userId: string };
}) {
  const chatrooms = await getUserChatrooms(Number(userId), search ?? ""); //user.id
  const chatWithMessages = await getChatWithMessages(chatId);
  console.log({ chatWithMessages });
  return (
    <Inbox userId={Number(userId)} chats={chatrooms}>
      <Chatroom chat={chatWithMessages} />
    </Inbox>
  );
  // const chatrooms = await getUserChatrooms(user.id, search);
}

// export function ChatPage() {
//   const [io, setIo] = useState<Socket | null>(null);
//   const params = useParams();
//   const chatId = Number(params.chatId);

//   const createMessageMutation = useCreateMessageMutation(chatId);

//   const user = {
//     id: 1,
//     avatar: "/images/1.png",
//     name: "Abd El Wadoud",
//   } as Chat["users"][0];

//   const chatBox = useRef<HTMLDivElement | null>(null);

//   const { data: chat, status } = useChatQuery(chatId);

//   const { data: chatMessages, status: messagesStatus } =
//     useChatMessages(chatId);

//   useEffect(() => {
//     chatBox?.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   const otherMember = chat?.users.filter(
//     (u) => u.id !== Number(user.id)
//   )[0] as Chat["users"][0];

//   const [message, setMessage] = useState<string>("");

//   useEffect(() => {
//     const connection = client("http://localhost:7010");

//     connection?.emit("connect_user", { userId: user.id });
//     // connection?.on("connected_users", (connected_users: any) => {
//     // console.log("Connected users", connected_users);
//     // });

//     setIo(connection);
//     return () => {
//       connection.disconnect();
//     };
//   }, []);

//   async function handleSendMessage() {
//     if (!!message.length) {
//       createMessageMutation.mutate({ content: message, senderId: user.id });
//       io?.emit("send_message", {
//         senderId: user.id,
//         receiverId: otherMember.id,
//         content: message,
//         chatroomId: chatId,
//       });

//       // setMessages((prev) => [
//       // ...prev,
//       // {
//       // userId: user.id,
//       // message,
//       // chatroomId: chatId,
//       // createdAt: new Date().toISOString(),
//       // id: Math.random(),
//       // },
//       // ]);
//       setMessage("");
//     }
//     return;
//   }
//   const queryClient = useQueryClient();

//   useEffect(() => {
//     console.log("RECEIVE_MESSAGE");
//     io?.on("receive_message", async (message: ChatMessage) => {
//       console.log(`Received message, ${message}`);
//       // const queryFilters: QueryFilters = {
//       // queryKey: [`chat-${chatId}`, "messages"],
//       // };
//       // await queryClient.refetchQueries(queryFilters);
//       // await queryClient.cancelQueries(queryFilters);

//       // queryClient.setQueriesData<ChatMessage[]>(queryFilters, (data) => {
//       // if (data) {
//       // return [...data, message];
//       // }
//       // return [message];
//       // });
//       // await queryClient.invalidateQueries(queryFilters);

//       return () => {
//         io?.off("receive_message");
//       };
//     });
//   });

//   useEffect(() => {
//     chatBox?.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chatMessages]);

//   return (
//     <div className="flex-1 h-full max-h-full bg-gray-100 dark:bg-gray-900 flex flex-col">
//       {status === "pending" && <LoadingSpinner />}
//       {status === "error" && (
//         <div className="flex-1 bg-gray-100 dark:bg-gray-900 flex flex-col">
//           <p className="grid w-full h-full place-content-center">
//             No chat was found
//           </p>
//         </div>
//       )}
//       {status === "success" && (
//         <>
//           <div className="border-b max-h-fit h-fit border-gray-200 dark:border-gray-800 p-4 py-3.5 flex items-center">
//             <UserProfilePicture user={otherMember} />
//             <div className="ml-3">
//               <div className="font-medium">{otherMember.name}</div>
//               <div className="text-sm text-gray-500 dark:text-gray-400">
//                 Online
//               </div>
//             </div>
//           </div>
//           <div className="flex-1 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
//             <div className="p-4 space-y-4  h-full">
//               {messagesStatus === "success" ? (
//                 chatMessages.map((message) => {
//                   const messageSentByCurrentUser = message.userId === user.id;
//                   return (
//                     <div
//                       ref={chatBox}
//                       key={message.id}
//                       className={`flex items-end gap-3 ${
//                         messageSentByCurrentUser ? "justify-end" : ""
//                       }`}
//                     >
//                       {!messageSentByCurrentUser && (
//                         <UserProfilePicture user={otherMember} />
//                       )}
//                       <div
//                         className={`rounded-lg p-3 max-w-[90%] ${
//                           messageSentByCurrentUser
//                             ? "bg-blue-500 text-white"
//                             : "bg-gray-200 dark:bg-gray-800"
//                         }`}
//                       >
//                         <div className="font-medium">
//                           {messageSentByCurrentUser ? "You" : otherMember.name}
//                         </div>
//                         <div className="text-sm">{message.message}</div>
//                         <div
//                           className={`text-xs mt-1 ${
//                             messageSentByCurrentUser
//                               ? "text-gray-200"
//                               : "text-gray-500 dark:text-gray-400"
//                           }`}
//                         >
//                           {message.createdAt}
//                         </div>
//                       </div>
//                       {messageSentByCurrentUser && (
//                         <UserProfilePicture user={user} />
//                       )}
//                     </div>
//                   );
//                 })
//               ) : (
//                 <LoadingSpinner />
//               )}
//             </div>
//           </div>
//           <div className="border-t border-gray-200 dark:border-gray-800 p-4">
//             <div className="flex items-center gap-3">
//               <Input
//                 className="flex-1 rounded-md bg-white px-4 py-2 text-sm focus:outline-none dark:bg-gray-800 dark:text-gray-50"
//                 placeholder="Type your message..."
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//               />
//               <Button onClick={handleSendMessage}>Send</Button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
