import { createContext, useState, useContext, useEffect } from "react";
import api from "@/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export type UserRole = "admin" | "user" | "guest" | "guide" | "temple";

const AuthContext = createContext(null);

export type User = {
    id: number,
    username: string,
    role: UserRole,
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    

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

    const login = (userData) => {
        toast.success("Login successful!");
        localStorage.setItem("token", userData.token);
        setUser(userData.user);
        navigate('/', { replace: true });
    };

    const logout = () => {
        setUser(null);
        toast.success("Logout successful!");
        localStorage.removeItem("token");
        navigate('/', { replace: true });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);