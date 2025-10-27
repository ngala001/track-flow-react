import { format } from "date-fns";
import { useTaskStore } from "../store/task-store";
import toast from "react-hot-toast";
 

interface TaskProps {
    title: string
    content: string
    status: string
    createdAt: string
    id: string
}

const TaskCard = ({title, content, status, createdAt, id }: TaskProps) => {
  const getTasks = useTaskStore(state => state.getTasks)

  const updateStatus = async(status: string) => {
      try {
        const res = await fetch(`https://track-flow-1.onrender.com/tasks/${id}`,{
          method: "PATCH",
           headers: { 
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          },
           body: JSON.stringify({status})
        });
    
        const data = await res.json()
    
        if(res.ok){
          toast.success(data.message)
        }
  
       getTasks()
        
      } catch (error) {
        error instanceof Error ?
        toast.error(error.message)
        :
        toast.error("Error updating the task")
      }
    }

     const removeTask = async() => {
      if(!id) return
        try {
            const res = await fetch(`https://track-flow-1.onrender.com/tasks/${id}`,{
                method:"DELETE",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
            })

            if(res.ok) {
               const data = await res.json() 
               toast.success(data.message)
            }
            getTasks()

        } catch (error) {
            error instanceof Error ?
            toast.error(error.message)
            :
           toast.error("Error deleting the task")
        }
    }
 
  return (
    <div  className="shadow mb-5 py-3 px-4 border border-gray-300 rounded-lg">
       <p className="text-xl m-0 p-0 font-semibold">{title}</p>
        <p className="font-semibold mt-2">{content}</p>
        <p className="mt-2 flex gap-4 items-center
        ">
            <span className={`py-1 px-3 rounded text-white
              ${status === 'completed'? 'bg-gray-500 ':
              status =='pending' ? 'bg-sky-300':
              status =='in-progress'? 'bg-red-300':'bg-amber-200'
              }
                `}>{status}</span>
            <span className="text-sm italic">{format(createdAt, "do MMM yyyy hh:mm a")}</span>
        </p>
          <div className="flex gap-2 items-center justify-end">
            <div className="dropdown dropdown-left dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">solve as ⬆️</div>
            <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-36 p-2 shadow-sm">
            <li onClick={() => updateStatus("new")}><a>new</a></li>
            <li onClick={() => updateStatus("pending")}><a>pending</a></li>
            <li onClick={() => updateStatus("completed")}><a>completed</a></li>
            <li onClick={() => updateStatus("in-progress")}><a>in-progress</a></li>
            </ul>
            </div>
            <button onClick={removeTask} className="btn btn-sm btn-error">Discard</button>
         </div>
    </div>
  )
}

export default TaskCard