import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser } from "../helpers/apiCommunicator";

type User = {
    name: String,
    email: String,
}
type UserAuth = {
    isLogedIn: Boolean,
    user: User | null,
    login: (email: string, password: string) => Promise<void>,
    signup: (name: String, email: String, password: String) => Promise<void>,
    logout: () => Promise<void>
}
const AuthContext = createContext<UserAuth | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLogedIn, setIsLogedIn] = useState(false)

    useEffect(() => {
        //fetch if the user's cookies are valid then skip login
        async function checkstatus() {
            const data = await checkAuthStatus()
            if (data) {
                setUser({ email: data.email, name: data.name })
                setIsLogedIn(true)
            }
        }
        checkstatus()
    }, [])
    const login = async (email: string, password: string) => {
        const data = await loginUser(email, password)
        if (data) {
            setUser({ email: data.email, name: data.name })
            setIsLogedIn(true)
        }
    }
    const signup = async (name: string, email: string, password: string) => { }
    const logout = async () => { }

    const value = {
        user,
        isLogedIn,
        logout,
        login,
        signup
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)