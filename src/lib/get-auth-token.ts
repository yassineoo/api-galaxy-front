"use server"
import { cookies } from "next/headers"

export default async function getAuthToken() {
    return cookies().get("auth_token")?.value as string
}

export async function setAuthToken(token: string) {
    const cookieStore = cookies()
    cookieStore.set("auth_token", token, {
        maxAge: 60 * 60 * 24 * 30,
    })
}

export async function clearAuthToken() {
    const cookieStore = cookies()
    cookieStore.delete("auth_token")
}