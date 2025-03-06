import { createContext, useState, useContext, useEffect } from "react";
import api from "@/api";
import toast from "react-hot-toast";
import { UNSAFE_createBrowserHistory } from "react-router-dom";

export type UserRole = "admin" | "user" | "guest" | "guide" | "temple";

const AuthContext = createContext(null);

export type User = {
    id: number,
    username: string,
    role: UserRole,
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const history = UNSAFE_createBrowserHistory();
    

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");

            if (token) {
                await api.get("/auth/current-user", { headers: { Authorization: `Bearer ${token}` } })
                    .then((res) => {
                        if (res.status === 200) {
                            const data = res.data.message;
                            setUser({ id: data.id, username: data.username, role: data.role });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }

        fetchUser();
    }, []);

    const login = (userData) => setUser(userData);
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        toast.success("Logout successful!");
        // location.href = "/";
        history.push('/')
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);