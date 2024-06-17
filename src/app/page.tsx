import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

export default function Home() {
  return (
    <main>
      <div className="text-center">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Hello From Laravel 11 - Client
        </h2>
        <h1>See your tasks bellow</h1>
      </div>
      <div className="flex justify-center">
        <Button className="flex gap-1">
          Task
          <CirclePlus size={15} />
        </Button>
      </div>

    </main>
  );
}
