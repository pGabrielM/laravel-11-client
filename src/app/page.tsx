import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
export default function Home() {
  return (
    <main className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">My Tasks</h2>
        <Button>Create New Task</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Finish Quarterly Report</CardTitle>
            <CardDescription>Complete the Q2 financial report for the executive team.</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between items-center">
            <p className="text-gray-500">Due: June 30</p>
            <div className="flex gap-2">
              <Button variant="default">Edit</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Redesign Website</CardTitle>
            <CardDescription>Update the company website with the new branding guidelines.</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between items-center">
            <p className="text-gray-500">Due: July 15</p>
            <div className="flex gap-2">
              <Button variant="default">Edit</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Prepare for Client Meeting</CardTitle>
            <CardDescription>Gather materials and talking points for the client presentation.</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between items-center">
            <p className="text-gray-500">Due: June 20</p>
            <div className="flex gap-2">
              <Button variant="default">Edit</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Implement New CRM System</CardTitle>
            <CardDescription>Set up the new customer relationship management software.</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between items-center">
            <p className="text-gray-500">Due: August 1</p>
            <div className="flex gap-2">
              <Button variant="default">Edit</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
