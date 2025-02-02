export type UserRole = "admin" | "user" | "guest" | "guide" | "temple";

export const getUserRole = (): UserRole => {
    return localStorage.getItem("role") as UserRole || "guest";
};
