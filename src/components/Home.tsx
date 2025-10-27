import { ChevronDown, CircleArrowLeft, ClipboardCheckIcon, ClipboardClockIcon, LayoutListIcon, ListTodo, LoaderIcon, LogOut, Menu, PlusCircleIcon, User } from "lucide-react"
import { useEffect, useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { userStore } from "../store/user-store"
import { useAuthStore } from "../store/auth-store"
import { useTaskStore } from "../store/task-store"



const Home = () => {
  const [isOpen, setIsOpen ] = useState(true)
  const [isMobile, setIsMobile ] = useState(false)
  

  const user = userStore(state => state.user)
  const logout = useAuthStore(state => state.logout)
  const tasks = useTaskStore(state => state.tasks)
  

  useEffect(() => {
    function handleResize() {
      if(window.innerWidth >= 768) setIsMobile(false)
    }
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  })


  function toggleBar() {
    if(window.innerWidth >= 768) {
      setIsOpen(prev => !prev)
    } else {
      setIsMobile(prev => !prev)
    }
  }
  


 const count = tasks && tasks.reduce<Record<string, number>>((acc, task) => {
   acc[task.status] = (acc[task.status] || 0) + 1
   return acc
 },{})

 
  
  return (
    <main className="flex gap-4 py-2 h-screen oveverflow-hidden">
       <aside className={`
         bg-base-200 h-full md:ml-2 flex flex-col py-2 px-3 rounded-lg overflow-hidden fixed md:static top-0
         left-0 transition-all duration-300 z-50
         ${isOpen ? 'md:w-56':'md:w-18'}
         ${isMobile ? 'translate-x-0' : '-translate-x-full md:translate-0'}
        `}>
          <div>
            <div className="flex items-center gap-4">
              {isMobile && <div onClick={() => setIsMobile(false)} className="cursor-pointer"><CircleArrowLeft className="size-5"/></div>}
              {(isOpen || isMobile) && <h1 className={`text-center text-2xl ${isMobile && "text-lg"}`}>TASKFLOW.</h1>}
            </div>

            <NavLink to={"all-tickets"} 
               className={ ({isActive}) =>
                `flex gap-3 mt-4 hover:bg-base-300 cursor-pointer px-3 py-3 rounded-lg
                 ${isActive ? "bg-base-300 text-blue-600 font-medium" : "hover:bg-base-200"}
                `}>
              <LayoutListIcon className="size-6 text-gray-500"/>
              {(isOpen || isMobile) && 
              <p className="flex items-center w-full">
                <span>All Tickets</span>
                <span className="flex-grow border-b border-dotted border-gray-400 mx-2"></span>
                <span>{tasks && tasks.length || 0}</span>
              </p>}
            </NavLink>

            <NavLink to={""} end
              className={ ({isActive}) =>
                `flex gap-3 mt-4 hover:bg-base-300 cursor-pointer px-3 py-3 rounded-lg
                 ${isActive ? "bg-base-300 text-blue-600 font-medium" : "hover:bg-base-200"}
                `}>
              <ListTodo className="size-6 text-gray-500"/>
              {(isOpen || isMobile) && 
              <p className="flex items-center w-full">
                <span>New Tickets</span>
                <span className="flex-grow border-b border-dotted border-gray-400 mx-2"></span>
                <span>{ tasks && count["new"] || 0}</span>
              </p>}
            </NavLink>

            <NavLink to={"in-progress"}
              className={ ({isActive}) =>
                `flex gap-3 mt-4 hover:bg-base-300 cursor-pointer px-3 py-3 rounded-lg
                 ${isActive ? "bg-base-300 text-blue-600 font-medium" : "hover:bg-base-200"}
                `}>
              <LoaderIcon className="size-6 text-gray-500"/>
              {(isOpen || isMobile) && 
              <p className="flex items-center w-full">
                <span>In-Progress</span>
                <span className="flex-grow border-b border-dotted border-gray-400 mx-2"></span>
                <span>{tasks && count["in-progress"] || 0}</span>
              </p>}
            </NavLink>

            <NavLink to={"pending"} 
               className={ ({isActive}) =>
                `flex gap-3 mt-4 hover:bg-base-300 cursor-pointer px-3 py-3 rounded-lg
                 ${isActive ? "bg-base-300 text-blue-600 font-medium" : "hover:bg-base-200"}
                `}>
              <ClipboardClockIcon className="size-6 text-gray-500"/>
              {(isOpen || isMobile) && 
              <p className="flex items-center w-full">
                <span>Pending</span>
                <span className="flex-grow border-b border-dotted border-gray-400 mx-2 "></span>
                <span>{ tasks && count["pending"] || 0}</span>
              </p>}
            </NavLink>

            <NavLink to={"completed"} 
               className={ ({isActive}) =>
                `flex gap-3 mt-4 hover:bg-base-300 cursor-pointer px-3 py-3 rounded-lg
                 ${isActive ? "bg-base-300 text-blue-600 font-medium" : "hover:bg-base-200"}
                `}>
              <ClipboardCheckIcon className="size-6 text-gray-500"/>
              {(isOpen || isMobile) && 
              <p className="flex items-center w-full">
                <span>Completed</span>
                <span className="flex-grow border-b border-dotted border-gray-400 mx-2"></span>
                <span>{tasks && count["completed"] || 0}</span>
              </p>}
            </NavLink>

            <NavLink to={"add-task"}
               className={ ({isActive}) =>
                `flex gap-3 mt-4 hover:bg-base-300 cursor-pointer px-3 py-3 rounded-lg
                 ${isActive ? "bg-base-300 text-blue-600 font-medium" : "hover:bg-base-200"}
                `}>
              <PlusCircleIcon className="size-6 text-gray-500"/>
              {(isOpen || isMobile) && <span>Add Task</span>}
            </NavLink>

          </div>
          <div className="mt-auto">
            {(isOpen || isMobile) &&<p className="text-2xl font-semibold">Account</p>}
            <div className="flex gap-2 mt-4 hover:bg-base-300 cursor-pointer px-3 py-3 rounded-lg">
               <User className="size-6 text-gray-500"/>
              { (isOpen || isMobile) && <span>{user?.username}</span>}
             </div>
            <div onClick={logout} className="flex gap-2 mt-2 hover:bg-base-300 cursor-pointer px-3 py-3 rounded-lg">
               <LogOut className="size-6 text-red-500"/>
              { (isOpen || isMobile) && <span className="text-red-500">Logout</span>}
             </div>
          </div>
         
       </aside>
       <section className="h-full w-full md:mr-2 rounded-lg">
        <nav className="flex justify-between items-center px-4 py-2">
          <span onClick={toggleBar} className="btn btn-ghost">
             <Menu className="size-6"/>
          </span>
          <div className="relative">
             <ChevronDown className="size-4 absolute bottom-0"/>
             <span className="ml-5">{user?.email}</span>
          </div>
        </nav>
        <div className="mt-2 overflow-y-auto h-[90%]">
           <Outlet/>
        </div>
       </section>
    </main>
  )
}

export default Home