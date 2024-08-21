export type ChatWithMessages = Chat & {
    messages: ChatMessage[]
}

export interface ChatMessage {
    id: number;
    message: string;
    createdAt: string;
    userId: number,
    chatroomId: number
}

export interface Chat {
    id: number;
    users: User[],
    lastMessage?: Omit<ChatMessage, "id">
}

interface User {
    id: number,
    name: string,
    avatar: string
}