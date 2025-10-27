import { create } from "zustand";

interface TaskType {
    id: string
    title: string
    content: string
    status: string
    createdAt: string
    updatedAt: string
    userId: string
}

interface InitialState {
    tasks: TaskType[] | []
    loading: boolean
    error: string | null
    getTasks: () => void
}

export const useTaskStore = create<InitialState>((set) => ({
    tasks: [],
    loading: false,
    error: null,
    getTasks: async() => {
        try {
            set({loading: true, error: null})

            const res = await fetch("http://127.0.0.1:8080/tasks",{
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":`Bearer ${localStorage.getItem('token')}`
              }
            })
      
            if(res.ok) {
              const data = await res.json()
              set({tasks: data})
            }
            
        } catch (error) {
            error instanceof Error ?
            set({error: error.message})
            :
            set({error:"Error fetching tasks"})
        } finally {
            set({ loading: false })
        }

    },
}))