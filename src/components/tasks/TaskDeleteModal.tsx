import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

interface ITaskDeleteModal {
  task: Task
  getTasks: () => void
}

interface Task {
  id: number
  name: string
  description: string
  completed: boolean
}

export default function TaskDeleteModal({ task, getTasks }: ITaskDeleteModal) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const deleteTask = async () => {
    const res = await fetch(`/api/user/task/${task.id}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      return toast({
        title: `Failed to delete task`,
        description: `Error: ${res.statusText}`,
        variant: 'warning'
      })
    }

    setIsOpen(false)
    getTasks()

    toast({
      title: `Successfully deleted task`,
      description: "You have successfully deleted a task",
      variant: 'success'
    })
  }

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription>Are you sure to delete task.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={() => deleteTask()} variant="destructive">Delete Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}