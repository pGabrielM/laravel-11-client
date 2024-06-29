import { getToken } from "next-auth/jwt";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: Params) {
  const token = await getToken({ req })

  const tasks = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/task/${params.id}`, {
    method: 'DELETE',
    headers: {
      "Accept": "application/json",
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