import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Inbox() {
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "John Doe",
      avatar: "/images/1.png",
      messages: [
        {
          id: 1,
          content: "Hey, how's it going?",
          timestamp: "2:30 PM",
          sentByCurrentUser: false,
        },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "/images/36.png",
      messages: [
        {
          id: 1,
          content: "Did you see the new design?",
          timestamp: "1:45 PM",
          sentByCurrentUser: false,
        },
      ],
    },
    {
      id: 3,
      name: "Sarah Johnson",
      avatar: "/images/boy.png",
      messages: [
        {
          id: 1,
          content: "Let's discuss the project",
          timestamp: "12:30 PM",
          sentByCurrentUser: false,
        },
      ],
    },
  ]);

  const [selectedChatId, setSelectedChatId] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const updatedChats = chats.map((chat) => {
      if (chat.id === selectedChatId) {
        const newMessageObject = {
          id: chat.messages.length + 1,
          content: newMessage,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          sentByCurrentUser: true,
        };
        return { ...chat, messages: [...chat.messages, newMessageObject] };
      }
      return chat;
    });

    setChats(updatedChats);
    setNewMessage("");
  };

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  return (
    <div className="flex h-[calc(100vh-70px)] w-full">
      <div className="bg-gray-100 dark:bg-gray-900 w-72 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="border-b border-gray-200 dark:border-gray-800 p-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full rounded-md bg-white px-8 py-2 text-sm focus:outline-none dark:bg-gray-800 dark:text-gray-50"
              placeholder="Search messages"
              type="search"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-2 p-4">
            {chats.map((chat) => (
              <Link
                key={chat.id}
                className={`flex items-center gap-3 rounded-md p-3 ${
                  selectedChatId === chat.id
                    ? "bg-gray-300 dark:bg-gray-700"
                    : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                }`}
                href="#"
                onClick={() => setSelectedChatId(chat.id)}
              >
                <Avatar>
                  <AvatarImage alt="Avatar" src={chat.avatar} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">{chat.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {chat.messages[chat.messages.length - 1]?.content}
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {chat.messages[chat.messages.length - 1]?.timestamp}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 bg-gray-100 dark:bg-gray-900 flex flex-col">
        <div className="border-b border-gray-200 dark:border-gray-800 p-4 flex items-center">
          <Avatar>
            <AvatarImage alt="Avatar" src={selectedChat?.avatar} />
            <AvatarFallback>{selectedChat?.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <div className="font-medium">{selectedChat?.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Online
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedChat?.messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-3 ${
                message.sentByCurrentUser ? "justify-end" : ""
              }`}
            >
              {!message.sentByCurrentUser && (
                <Avatar>
                  <AvatarImage alt="Avatar" src={selectedChat?.avatar} />
                  <AvatarFallback>{selectedChat?.name[0]}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-3 max-w-[90%] ${
                  message.sentByCurrentUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-800"
                }`}
              >
                <div className="font-medium">
                  {message.sentByCurrentUser ? "You" : selectedChat?.name}
                </div>
                <div className="text-sm">{message.content}</div>
                <div
                  className={`text-xs mt-1 ${
                    message.sentByCurrentUser
                      ? "text-gray-200"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>
              {message.sentByCurrentUser && (
                <Avatar>
                  <AvatarImage alt="Avatar" src={selectedChat?.avatar} />
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <Input
              className="flex-1 rounded-md bg-white px-4 py-2 text-sm focus:outline-none dark:bg-gray-800 dark:text-gray-50"
              placeholder="Type your message..."
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
