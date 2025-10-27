import { useTaskStore } from "../store/task-store";
import TaskCard from "./TaskCard";

const InProgress = () => {

  const tasks = useTaskStore(state => state.tasks)

  const openTickets = tasks && tasks.filter(task => task.status === "in-progress")

  if(!openTickets || !openTickets.length) {
    return (
      <div className="flex justify-center items-center h-[50%]">
         <p className="text-2xl font-semibold text-gray-500">No ticket</p>
      </div>
    )
  }

  return (
    <div className="w-[90%] mx-auto mt-3 py-3 overflow-hidden">
        {
           tasks && openTickets.map(todo => (
                <TaskCard
                  key={todo.id}
                  title={todo.title}
                  content={todo.content}
                  status={todo.status}
                  createdAt={todo.createdAt}
                  id={todo.id}
                />
            ))
        }
    </div>
  )
}

export default InProgress