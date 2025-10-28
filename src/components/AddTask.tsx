import { PlusCircle } from "lucide-react"
import { useState, type FormEvent } from "react"
import toast from "react-hot-toast"
import { useAuthStore } from "../store/auth-store"
import { useTaskStore } from "../store/task-store"

const AddTask = () => {
    const [title, setTitle ] = useState("")
    const [content, setContent ] = useState("")
    const [loading, setLoading ] = useState(false)

    const decoded = useAuthStore(state => state.decoded)
    const getTasks = useTaskStore(state => state.getTasks)


    const createTask = async(e:FormEvent) => {
        e.preventDefault()

        if(!title || !content) {
            toast.error("Please fill all the fields")
            return
        }

        try {
            setLoading(true)

            const res = await fetch("https://track-flow-1.onrender.com/tasks",{
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({title, content, userId: decoded?.userId})
            })


            const data = await res.json()

            toast.success(data.message)
            setTitle("")
            setContent("")
            getTasks()

        } catch (error) {
           error instanceof Error ?
           toast.error(error.message)
           :
           toast.error("Something went wrong") 
        } finally {
            setLoading(false)
        }
    }
  return (
    <div className="flex flex-col justify-center items-center mt-6">
        <div>
            <h1 className="text-lg font-semibold mb-6">Create new task by filling details below;</h1>
        </div>
        <form onSubmit={createTask} className="min-w-lg mx-auto grid gap-4 shadow-sm p-6">
            <div className="grid gap-3">
                <label htmlFor="title" className="label">Title:</label>
                <input 
                    type="text"
                    id="title"
                    className="input"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="grid gap-3">
                <label htmlFor="content" className="label">Content:</label>
                <textarea  
                   className="textarea"
                   id="content"
                   placeholder="type content here ..."
                   value={content}
                   onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div className="mt-6 text-center">
                <button disabled={loading} className="btn btn-accent">
                    {
                        !loading ? (
                            <>
                                <PlusCircle/>
                                <span>Add Task</span>
                            </>
                        ): (
                            <>
                            <span className="loading loading-spinner loading-sm"></span>
                            <span>Adding</span>
                            </>
                        )
                    }
                </button>
            </div>
 
        </form>
    </div>
  )
}

export default AddTask