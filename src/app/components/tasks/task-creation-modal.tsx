import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"

interface Task {
  name: string
  description: string
  completed: boolean
}

export default function TasksCreationModal() {
  const [error, setError] = useState<string | null>()
  const { register, handleSubmit, formState: { errors } } = useForm<Task>()

  const onSubmit: SubmitHandler<Task> = async (data) => {
    setError(null)

    console.log(data)

    const res = await fetch('/api/task', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!res?.ok) {
      return setError(res?.error)
    }

    toast({
      title: "Successfully created a task",
      description: "You have successfully created a task",
      variant: 'success'
    })
  }

  return (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button>Create Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>Fill out the form to create a new task.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name">Task Name</Label>
            <Input id="name" placeholder="Enter task name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter task description" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="completed" />
            <Label htmlFor="completed">Mark as completed</Label>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit">Save Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}