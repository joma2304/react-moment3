import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import {User, LoginCredentials, AuthResponse, AuthContextType} from "../types/auth.types";

//Skapa context
const AuthContext = createContext <AuthContextType | null > (null);

export interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ( {children} ) => {

    const [user, setUser] = useState<User | null>(null);

    //Logga in användare
    const login = async (credentials: LoginCredentials) => {

        try {
            const res = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })

            if(!res.ok) throw new Error("Inlogg misslyckades");

            const data = await res.json() as AuthResponse;

            localStorage.setItem("jwtToken", data.jwtToken);
            setUser(data.user);

        } catch (error) {
            throw error;
        }
    }

    //Logga ut användare
    const logout = () => {
        localStorage.removeItem("jwtToken");

        setUser(null);
    }

    //Validera token
    const checkToken = async () => {
        const token = localStorage.getItem("jwtToken");

        if(!token) {
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/users/validate", {  
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if(res.ok) {
                const data = await res.json();
                setUser(data.user);
            }
    

        } catch (error) {
            localStorage.removeItem("jwtToken")
            setUser(null);
        }
    }

    useEffect(()=> {
        checkToken();
    }, [])

    return(
        <AuthContext.Provider value= {{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () : AuthContextType => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }

    return context;
}