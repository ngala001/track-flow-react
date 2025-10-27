import { create } from "zustand";

type User = {
    username: string
    email: string
    role: string
}

interface InitialStateType {
    user: User | null
    getUser: (id: string) => void
    loading: boolean
    error: string | null
}



export const userStore = create<InitialStateType>((set) => ({
 user: null,
 loading: false,
 error: null,
 getUser: async(id: string) => {
    try {
        set({loading: true, error: null})
        const res = await fetch(`http://127.0.0.1:8080/users/user/${id}`,{
            headers: {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
        if(res.ok) {
          const data = await res.json()
          set({user: data })
        }
        
    } catch (error) {
       error instanceof Error ?
       set({error: error.message})
       :
       set({error:"Something went wrong"})
    } finally {
        set({loading: false})
    }
 },
}))