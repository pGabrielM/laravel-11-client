import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req })

  console.log(token)

  const tasks = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task`, {
    headers: { "Content-Type": "application/json" },
    method: 'GET',
  })

  const data = await tasks.json()
  console.log(data)

  if (!tasks.ok) {
    throw new Error(data)
  }


  return new NextResponse(data, { status: 200 })
}