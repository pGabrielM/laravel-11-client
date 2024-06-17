'use client'

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex justify-between">
      <h1 className="text-2xl font-bold"><Link href={'/'}>Laravel 11 - Task Manager</Link></h1>
      <Button variant="secondary" onClick={() => signIn()}>Login</Button>
    </header>
  )
}
