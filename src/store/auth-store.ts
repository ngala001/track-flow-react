import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

interface JwtTokenType {
    exp: string
    userId: string
    role: string
}

interface AuthType {
    token: string | null
    decoded: JwtTokenType | null
    setToken: (t: string) => void
    logout: () => void
}

export const useAuthStore = create<AuthType>((set) => ({
    token: localStorage.getItem("token"),

    decoded: localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem('token')!)
    : null,

    setToken: (token: string) => {
        if(token) {
            localStorage.setItem("token", token)
            set({token, decoded: jwtDecode(token)})
        } else {
            localStorage.removeItem("token")
            set({token:null, decoded: null})
        }
    },
    logout: () => {
        localStorage.removeItem("token")
        set({token:null, decoded:null})
        window.location.href = "/auth/login"
    }
}))