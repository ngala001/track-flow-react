import { useState, type FormEvent } from "react"
import toast, {Toaster} from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import AuthNav from "./AuthNav"
import { useAuthStore } from "../../store/auth-store"

const Login = () => {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ loading, setLoding ] = useState(false)

    const navigate = useNavigate()
    const setToken = useAuthStore(state => state.setToken)

    const SignIn = async(e: FormEvent) => {
        e.preventDefault()

        if(!email || !password) {
          toast.error("All fields are required")
          return
        }

        try {
            setLoding(true)
            const res = await fetch("https://track-flow-1.onrender.com/auth/login", {
                method: "POST",
                headers: { "Content-Type":"application/json"},
                body: JSON.stringify({email, password})
            })
            //set token to localhost

            
            const data = await res.json()
            if(res.ok) {
               setToken(data.token)
            }
            
            setEmail("")
            setPassword("")
            toast.success(data.success,{duration: 950})
            
            setTimeout(() => {
                navigate("/")
            },1000)
            
        } catch (error) {
           if(error instanceof Error) {
             toast.error(error.message)
           } else {
             toast.error("Something went wrong")
           }
           
        } finally {
            setLoding(false)
        }

        
    }

  return (
    <div 
       className="h-screen back-image"
    >
        <Toaster position="top-right" reverseOrder={false} />
        <AuthNav href="register" title="Create Account"/>
        
        <form onSubmit={SignIn} className="max-w-md h-[70%] mx-auto flex justify-center items-center">
            <div className="w-[90%] mx-auto">
                  <p className="text-2xl font-bold text-white">Login</p>
                <div className="grid gap-4 mt-4 px-6 py-4 bg-white shadow-sm rounded ">
                    <div className="grid gap-3">
                        <label htmlFor="email" className="label">Email: </label>
                        <input 
                        type="email"
                        className="input"
                        value={email}
                        placeholder="example@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-3">
                        <label htmlFor="password" className="label">Password: </label>
                        <input 
                        type="password"
                        className="input"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="text-center">
                        {
                            !loading ? (
                                <button className="btn btn-accent px-12">Sign In</button>
                            ) : (
                                <button className="btn px-12">
                                    <span className="loading loading-dots"></span>
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Login