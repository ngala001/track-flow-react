import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/auth-store"

const ProtectedRoute = ({ children }:{children: React.ReactNode}) => {

    const token = useAuthStore(state => state.token)

   
    if(!token) {
      return <Navigate to={"/auth/login"} replace/>
    }

   return <>{children}</>

}

export default ProtectedRoute