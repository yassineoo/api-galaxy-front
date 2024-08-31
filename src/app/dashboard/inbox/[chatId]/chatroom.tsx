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

export default function Chatroom({ chat }: { chat: ChatWithMessages }) {
  const [io, setIo] = useState<Socket | null>(null);

  const params = useParams();
  const chatId = Number(params.chatId);

  const createMessageMutation = useCreateMessageMutation(chatId);

  const searchParams = useSearchParams();
  const userId = Number(searchParams.get("userId") ?? 1);
  const user = {
    id: userId,
    avatar: "/images/1.png",
    name: "Abd El Wadoud",
  } as Chat["users"][0];

  const chatBox = useRef<HTMLDivElement | null>(null);
  //   const { data: messages, status: messagesStatus } = useChatMessages(
  //     chatId,
  //     chat.messages
  //   );

  const [messages, setMessages] = useState<ChatMessage[]>(chat?.messages ?? []);

  const [message, setMessage] = useState<string>("");
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const otherMember = chat?.users.filter(
    (u) => u.id !== Number(user.id)
  )[0] as Chat["users"][0];

  useEffect(() => {
    const connection = client("http://localhost:7002");

    connection?.emit("connect_user", { userId: user.id });
    setIo(connection);

    return () => {
      connection.disconnect();
    };
  }, []);

  useEffect(() => {
    io?.on("receive_message", async (message: ChatMessage) => {
      console.log(`Received message, ${message}`);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      io?.off("receive_message");
    };
  });

  useEffect(() => {
    io?.on("user_is_writing", () => setIsTyping(true));
    io?.on("user_stopped_writing", () => setIsTyping(false));
    return () => {
      io?.off("user_is_writing");
      io?.off("user_stopped_writing");
    };
  }, []);

  async function handleSendMessage() {
    if (!!message.length) {
      setTyping(false);
      createMessageMutation.mutate(
        { content: message, senderId: user.id },
        {
          onSuccess: (data: ChatMessage) => {
            setMessages((prev) => [...prev, data]);
          },
        }
      );
      io?.emit("send_message", {
        senderId: user.id,
        receiverId: otherMember.id,
        content: message,
        chatroomId: chatId,
      });
      setMessage("");
    }
    return;
  }

  function handleTyping(e: ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
    if (!typing) {
      setTyping(true);

      io?.emit("user_is_typing", {
        userId: user.id,
        otherMemberId: otherMember.id,
      });
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 3 * 1000; //3s
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        io?.emit("user_is_not_typing", {
          userId: user.id,
          otherMemberId: otherMember.id,
        });
        setTyping(false);
      }
    }, timerLength);
  }

  return (
    <div className="flex-1 h-full max-h-full bg-gray-100 dark:bg-gray-900 flex flex-col">
      <>
        <div className="border-b max-h-fit h-fit border-gray-200 dark:border-gray-800 p-4 py-3.5 flex items-center">
          <UserProfilePicture user={otherMember} />
          <div className="ml-3">
            <div className="font-medium">{otherMember.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Online
            </div>
          </div>
        </div>
        <div className="flex-1 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
          <div className="p-4 space-y-4 h-full">
            {messages?.map((message) => {
              const messageSentByCurrentUser = message.userId === user.id;
              console.log({ message });
              return (
                <div
                  ref={chatBox}
                  key={message.id}
                  className={`flex items-start gap-3  ${
                    messageSentByCurrentUser ? "justify-end" : ""
                  }`}
                >
                  {!messageSentByCurrentUser && (
                    <UserProfilePicture user={otherMember} />
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-72 w-2/3 break-words  ${
                      messageSentByCurrentUser
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="font-medium line-clamp-1 flex-1 break-words">
                        {messageSentByCurrentUser ? "You" : otherMember.name}
                      </div>
                      <div
                        className={`w-fit text-xs mt-1 ${
                          messageSentByCurrentUser
                            ? "text-gray-200"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {format(new Date(message.createdAt ?? new Date()), "p")}
                      </div>
                    </div>
                    <div className="text-sm">{message.message}</div>
                  </div>
                  {messageSentByCurrentUser && (
                    <UserProfilePicture user={user} />
                  )}
                </div>
              );
            })}
            {isTyping && (
              <p className="text-black z-10 dark:text-gray-400 bg-gray-200 text-sm ml-4 p-2 w-fit rounded-full flex items-center">
                User is writing
                <BeatLoader size="4" speedMultiplier={0.5} color="black" />
              </p>
            )}
          </div>
        </div>
        <div className="relative border-t border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <Input
              className="flex-1 rounded-md bg-white px-4 py-2 text-sm focus:outline-none dark:bg-gray-800 dark:text-gray-50"
              placeholder="Type your message..."
              type="text"
              value={message}
              onChange={handleTyping}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      </>
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
      <AvatarImage alt="Avatar" src={user.avatar} />
      <AvatarFallback className="text-lg uppercase bg-white">
        {user.name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}
