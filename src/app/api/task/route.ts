import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const tasks = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
  })

  const data = await tasks.json()

  if (!tasks.ok) {
    return NextResponse.json({ data }, { status: tasks.status })
  }

  return NextResponse.json({ data }, { status: 200 })
}