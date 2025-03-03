import api from "@/api";

export type UserRole = "admin" | "user" | "guest" | "guide" | "temple";

export const getUserRole = async (): Promise<UserRole> => {
    const token = localStorage.getItem("token");
    if (!token) return "guest";

    try {
        const res = await api.get("/auth/current-user", { 
            headers: {Authorization: `Bearer ${token}` }
        });

        if (res.status === 200) {
            return res.data.message.role;
        } else {
            return "guest";
        }
    } catch (err) {
        console.log(err);
        return "guest";
    }
};
