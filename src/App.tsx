import { Routes, Route } from "react-router-dom"
import Login from "./components/auth/Login"
import { Toaster } from "react-hot-toast"
import Home from "./components/Home"
import Register from "./components/auth/Register"
import { userStore } from "./store/user-store"
import { useEffect } from "react"
import ProtectedRoute from "./components/ProtectedRoutes"
import { useAuthStore } from "./store/auth-store"
import Tasks from "./components/Tasks"
import { useTaskStore } from "./store/task-store"
import NewTasks from "./components/NewTasks"
import InProgress from "./components/InProgress"
import PendingTickets from "./components/PendingTickets"
import CompletedTickets from "./components/CompletedTickets"
import AddTask from "./components/AddTask"


function App() {
 
  const getUser = userStore((state) => state.getUser)
 const decoded = useAuthStore(state => state.decoded)
 const getTasks = useTaskStore(state => state.getTasks)

  useEffect(() => {
    if(decoded?.userId) {
      getUser(decoded?.userId!)
    }
  },[decoded])

  useEffect(() => {
    getTasks()
  },[decoded])

  return (
    <>
      <Toaster position="top-right" />
     <Routes>
       <Route path="auth/login" element={<Login/>} />
       <Route path="auth/register" element={<Register/>} />
      <Route path="/" element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
        }>
          <Route path="all-tickets" element={<Tasks/>}/>
          <Route path="" element={<NewTasks/>}/>
          <Route path="in-progress" element={<InProgress/>}/>
          <Route path="pending" element={<PendingTickets/>}/>
          <Route path="completed" element={<CompletedTickets/>}/>
          <Route path="add-task" element={<AddTask/>}/>
        </Route>
     </Routes>
    </>
  )
}

export default App
