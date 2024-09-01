import { cookies } from "next/headers"
import { NextResponse } from "next/server"
export async function GET(request: Request) {
    const cookieStore = cookies()
    const token = cookieStore.get("auth_token")
    return NextResponse.json({ token }, { status: 200 })
}
export async function POST(request: Request) {
    const body = (await request.json()) as { token: string }
    const token = body.token as string
    const cookieStore = cookies()
    cookieStore.set("auth_token", token, {
        maxAge: 60 * 60 * 24 * 30,
    })
    return NextResponse.json({ token }, { status: 200 })
}

export async function DELETE(request: Request) {
    const cookieStore = cookies()
    cookieStore.delete("auth_token")
    return NextResponse.json({}, { status: 200 })
}