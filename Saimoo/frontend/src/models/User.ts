export type User = {
    id: number,
    email: string,
    username: string,
    createdAt: string,
    updatedAt: string,
    role: "guide" | "temple" | "admin" | "user",
    fullName: string | null,
    phone: string | null
}