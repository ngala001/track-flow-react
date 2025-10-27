import { useState, type FormEvent } from "react"
import toast, {Toaster} from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import AuthNav from "./AuthNav"

const Register = () => {
    const [ email, setEmail ] = useState("")
    const [username, SetUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ loading, setLoding ] = useState(false)

    const navigate = useNavigate()

    const SignUp = async(e: FormEvent) => {
        e.preventDefault()

        if(!email || !password || !confirmPassword || !username) {
          toast.error("All fields are required")
          return
        }

        if(password !== confirmPassword) {
            toast.error("Password do not match")
            return
        }

        try {
            setLoding(true)
            const res = await fetch("https://track-flow-1.onrender.com/auth/register", {
                method: "POST",
                headers: { "Content-Type":"application/json"},
                body: JSON.stringify({email, password, username})
            })
           
            const data = await res.json()
            if(!res.ok) {
               toast.success(data.success)
            }

         setEmail("")
         setPassword("")
         setConfirmPassword("")
         SetUsername("")
         navigate("/auth/login")
            
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
        <Toaster position="top-right" />
        <AuthNav href="login" title="Login"/>
        
        <form onSubmit={SignUp} className="max-w-md h-[70%] mx-auto flex justify-center items-center">
            <div className="w-[90%] mx-auto">
                <p className="text-2xl font-bold text-white">Sign Up</p>
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
                    <label htmlFor="username" className="label">Username: </label>
                    <input 
                    type="text"
                    className="input"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => SetUsername(e.target.value)}
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
                <div className="grid gap-3">
                    <label htmlFor="confirmpassword" className="label">Confirm Password: </label>
                    <input 
                        type="password"
                        className="input"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="text-center">
                    {
                        !loading ? (
                            <button className="btn btn-accent px-12">Sign Up</button>
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

export default Register