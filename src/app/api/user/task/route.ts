import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req })

  const tasks = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/task`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token?.token}`
    },
    cache: 'no-store',
  })

  const data = await tasks.json()

  if (!tasks.ok) {
    return NextResponse.json({ data }, { status: tasks.status })
  }

  return NextResponse.json({ data }, { status: 200 })
}

export async function POST(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req })

  const { name, description, completed } = await req.json();

  const tasks = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/task`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token?.token}`
    },
    body: JSON.stringify({
      name,
      description,
      completed,
    }),
  })

  const data = await tasks.json()

  if (!tasks.ok) {
    return NextResponse.json({ data }, { status: tasks.status })
  }

  return NextResponse.json({ data }, { status: 200 })
}