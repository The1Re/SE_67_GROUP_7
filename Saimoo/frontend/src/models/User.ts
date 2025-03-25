export type User = {
    id: 3,
    email: string,
    username: string,
    createdAt: string,
    updatedAt: string,
    role: "guide" | "temple" | "admin" | "user",
    fullName: string | null,
    phone: string | null
}