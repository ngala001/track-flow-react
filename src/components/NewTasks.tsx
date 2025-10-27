import { useTaskStore } from "../store/task-store";
import TaskCard from "./TaskCard";

const NewTasks = () => {

  const tasks = useTaskStore(state => state.tasks)

  const newTasks = tasks && tasks.filter(task => task.status === "new")

  if(!newTasks || !newTasks.length) {
    return (
      <div className="flex justify-center items-center h-[50%]">
         <p className="text-2xl font-semibold text-gray-500">No ticket</p>
      </div>
    )
  }

  return (
    <div className="w-[90%] mx-auto mt-3 py-3 overflow-hidden">
        {
           tasks && newTasks.map(todo => (
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

export default NewTasks