import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req })

  const tasks = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token?.token}`
    },
  })

  const data = await tasks.json()

  if (!tasks.ok) {
    return NextResponse.json({ data }, { status: tasks.status })
  }

  return NextResponse.json({ data }, { status: 200 })
}

export async function POST(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req })

  const tasks = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token?.token}`
    },
  })

  const data = await tasks.json()

  if (!tasks.ok) {
    return NextResponse.json({ data }, { status: tasks.status })
  }

  return NextResponse.json({ data }, { status: 200 })
}