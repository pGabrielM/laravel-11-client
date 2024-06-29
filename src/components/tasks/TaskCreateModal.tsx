import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"

interface ITaskCreateModal {
  getTasks: () => void
}

interface Task {
  name: string
  description: string
  completed: boolean
}

export default function TaskCreateModal({ getTasks }: ITaskCreateModal) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors } } = useForm<Task>()

  const onSubmit: SubmitHandler<Task> = async (data) => {
    const res = await fetch('/api/user/task', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      return toast({
        title: `Failed to create ${data.name}`,
        description: `Error: ${res.statusText}`,
        variant: 'warning'
      })
    }

    setIsOpen(false)
    getTasks()

    toast({
      title: `Successfully created ${data.name}`,
      description: "You have successfully created a task",
      variant: 'success'
    })
  }

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Create Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>Fill out the form to create a new task.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name">Task Name</Label>
            <Input id="name" placeholder="Enter task name" {...register('name')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter task description" {...register('description')} />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="completed"
              {...register('completed')}
            />
            <Label htmlFor="completed">Mark as completed</Label>
          </div>
          <DialogFooter>
            <Button type="submit">Save Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  )
}