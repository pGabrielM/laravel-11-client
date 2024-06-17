'use client'

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const session = useSession()
  const userStatus = session.status

  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex justify-between">
      <h1 className="text-2xl font-bold"><Link href={'/'}>Laravel 11 - Task Manager</Link></h1>
      {userStatus == 'authenticated' ?
        <Button variant="secondary" onClick={() => signOut({ callbackUrl: '/' })}>Leave</Button>
        :
        <Button variant="secondary" onClick={() => signIn()}>Login</Button>
      }
    </header>
  )
}
