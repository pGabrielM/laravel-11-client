'use client'

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
export default function Home() {
  const session = useSession()
  const userStatus = session.status

  return (
    <main className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Community Tasks</h2>
        {userStatus == 'authenticated' &&
          <Button>Create New Task</Button>
        }
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Finish Quarterly Report</CardTitle>
            <CardDescription>Complete the Q2 financial report for the executive team.</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between items-center">
            <p className="text-gray-500">Due: June 30</p>
            {userStatus == 'authenticated' &&
              <div className="flex gap-2">
                <Button variant="default">Edit</Button>
                <Button variant="destructive">Delete</Button>
              </div>
            }
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
