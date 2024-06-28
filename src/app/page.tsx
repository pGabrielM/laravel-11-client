'use client'

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TasksResponse from "@/types/tasks";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import TasksCreationModal from "./components/tasks/task-creation-modal";


export default function Home() {
  const [tasks, setTasks] = useState<TasksResponse>()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const session = useSession()

  const getPublicTasks = async () => {
    const res = await fetch('/api/task')

    if (!res.ok) {
      return setError(res.statusText)
    }

    const data = await res.json()

    setTasks(data)
    setIsLoading(false)
  }

  const getPrivateTasks = async () => {
    const res = await fetch('/api/user/task')

    if (!res.ok) {
      return setError(res.statusText)
    }

    const data = await res.json()

    setTasks(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if (session.status == 'authenticated') {
      getPrivateTasks()
    } else {
      getPublicTasks()
    }
  }, [session])

  return (
    <main className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        {session.status == 'authenticated' ?
          <h2 className="text-xl font-bold">Your Tasks</h2>
          :
          <h2 className="text-xl font-bold">Community Tasks</h2>
        }
        <div>
          {session.status == 'authenticated' &&
            <TasksCreationModal />
          }
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {error &&
          <p className="text-gray-500">Failed to fetch tasks</p>
        }
        {isLoading &&
          <p className="text-gray-500">Loading</p>
        }
        {tasks?.data.data.map((task, id) => (
          <Card key={id}>
            <CardHeader>
              <CardTitle>{task.name}</CardTitle>
              <CardDescription>{task.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between items-center">
              <p className="text-gray-500">Due: {task.updated_at}</p>
              {session.status == 'authenticated' &&
                <div className="flex gap-2">
                  <Button variant="default">Edit</Button>
                  <Button variant="destructive">Delete</Button>
                </div>
              }
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
