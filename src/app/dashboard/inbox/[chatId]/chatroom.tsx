"use client";
import client, { Socket } from "socket.io-client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Chat, ChatMessage, ChatWithMessages } from "../chat.interface";
import { useParams, useSearchParams } from "next/navigation";
import { useChatMessages } from "@/hooks/chat/chat.queries";
import { useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "@/components/loading-spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCreateMessageMutation } from "@/hooks/chat/chat.mutations";
import { format } from "date-fns";
import { BeatLoader } from "react-spinners";
import { useAuthSession } from "@/components/auth-provider";
import { getColorByLetter } from "../chats_list";

export default function Chatroom({ chat }: { chat: ChatWithMessages }) {
  const [io, setIo] = useState<Socket | null>(null);

  console.log({ chat });

  const { mutate, isPending } = useCreateMessageMutation(chat.id);
  const { session } = useAuthSession();
  const user = session?.user as Chat["users"][0];
  user.id = session?.userId as number;

  const chatBox = useRef<HTMLDivElement | null>(null);
  //   const { data: messages, status: messagesStatus } = useChatMessages(
  //     chatId,
  //     chat.messages
  //   );
  useEffect(() => {
    chatBox.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const [messages, setMessages] = useState<ChatMessage[]>(chat?.messages ?? []);

  const [message, setMessage] = useState<string>("");
  console.log({ message });
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const otherMember = chat?.users.filter(
    (u) => u.id !== Number(user.id)
  )[0] as Chat["users"][0];
  console.log({ otherMember: chat.users, user: user.id });
  useEffect(() => {
    const connection = client("http://localhost:7002");

    setIo(connection);

    // connection?.on("user_is_writing", () => setIsTyping(true));
    // connection?.on("user_stopped_writing", () => setIsTyping(false));

    return () => {
      connection.disconnect();
    };
  }, []);

  useEffect(() => {
    io?.emit("connect_user", { userId: user.id, chatroomId: chat.id });
    io?.on("connected_users", (r) => console.log(r));
  }, [io]);

  useEffect(() => {
    io?.on("receive_message", async (message: ChatMessage) => {
      console.log(`Received message, ${message}`);
      setMessages((prev) => [...prev, message]);
    });
  });
  // useEffect(() => {
  // return () => {
  // io?.off("receive_message");
  // };
  // }, [io]);

  // useEffect(() => {
  // io?.off("user_is_writing");
  // io?.off("user_stopped_writing");
  // };
  // }, []);

  async function handleSendMessage() {
    console.log({ message });
    if (message.length > 0) {
      console.log("SEND_MESSAGE");
      setTyping(false);
      mutate(
        { content: message, senderId: user.id },
        {
          onSuccess: (data) => {
            console.log({ data });
            const message = {
              content: data.message,
              senderId: user.id,
              chatroomId: chat.id,
              receiverId: otherMember.id,
              createdAt: data.created_at,
              id: data.id,
            };

            io?.emit("send_message", {
              senderId: user.id,
              receiverId: otherMember.id,
              content: message,
              chatroomId: chat.id,
            });
            setMessages((prev) => [
              ...prev,
              {
                id: data.id,
                createdAt: data.created_at,
                message: data.message,
                userId: user.id,
                chatroomId: chat.id,
              },
            ]);
            setMessage("");
          },
        }
      );
    }
    return;
  }
  useEffect(() => {
    chatBox.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // function handleTyping(e: ChangeEvent<HTMLInputElement>) {
  //   setMessage(e.target.value);
  //   if (!typing) {
  //     setTyping(true);

  //     io?.emit("user_is_typing", {
  //       userId: user.id,
  //       otherMemberId: otherMember.id,
  //     });
  //   }

  //   let lastTypingTime = new Date().getTime();
  //   let timerLength = 3 * 1000; //3s
  //   setTimeout(() => {
  //     const timeNow = new Date().getTime();
  //     const timeDiff = timeNow - lastTypingTime;
  //     if (timeDiff >= timerLength && typing) {
  //       io?.emit("user_is_not_typing", {
  //         userId: user.id,
  //         otherMemberId: otherMember.id,
  //       });
  //       setTyping(false);
  //     }
  //   }, timerLength);
  // }

  return (
    <div className="flex-1 h-full max-h-full bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 p-4 py-3.5 flex items-center">
        <UserProfilePicture user={otherMember} />
        <div className="ml-3">
          <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            {otherMember.name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Online</div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message) => {
          const messageSentByCurrentUser = message.userId === user.id;
          return (
            <div
              ref={chatBox}
              key={message.id}
              className={`flex items-start gap-3 ${
                messageSentByCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              {/* Other User's Avatar */}
              {!messageSentByCurrentUser && (
                <UserProfilePicture user={otherMember} />
              )}

              {/* Message Bubble */}
              <div
                className={`rounded-xl p-3 max-w-[80%] sm:max-w-[60%] break-words shadow-md ${
                  messageSentByCurrentUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  {/* Sender's Name or "You" */}
                  <div className="font-semibold flex-1">
                    {messageSentByCurrentUser ? "You" : otherMember.name}
                  </div>
                  {/* Timestamp */}
                  <div
                    className={`text-xs ml-2 ${
                      messageSentByCurrentUser
                        ? "text-gray-200"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {format(new Date(message.createdAt ?? new Date()), "p")}
                  </div>
                </div>

                {/* Message Content */}
                <div className="text-sm mt-1">{message.message}</div>
              </div>

              {/* Current User's Avatar */}
              {messageSentByCurrentUser && <UserProfilePicture user={user} />}
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 p-2 w-fit rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            <span>User is writing...</span>
            <BeatLoader size="6" speedMultiplier={0.6} color="gray" />
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="relative border-t border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-3">
          {/* Input Field */}
          <Input
            className="flex-1 rounded-md bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm focus:outline-none dark:text-gray-50"
            placeholder="Type your message..."
            type="text"
            value={message}
            onChange={(e) => setMessage((e.target as HTMLInputElement).value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          {/* Send Button */}
          <Button
            disabled={isPending}
            onClick={handleSendMessage}
            className="flex items-center justify-center bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors disabled:bg-blue-400"
          >
            Send
            {isPending && (
              <BeatLoader
                size="6"
                speedMultiplier={0.5}
                color="white"
                className="ml-2"
              />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function UserProfilePicture({
  user,
}: {
  user: { avatar: string; name: string };
}) {
  return (
    <Avatar>
      <AvatarImage alt="Avatar" src={user?.avatar} />
      <AvatarFallback
        className={`text-lg uppercase text-white ${getColorByLetter(
          user.name.charAt(0)
        )}`}
      >
        {user.name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}
