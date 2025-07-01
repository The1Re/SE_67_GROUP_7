import { User } from "./User"

export type Request = {
    id: number,
    type: "Register_as_Temple" | "Become_Guide",
    status: "Pending" | "Approved" | "Rejected",
    createdDate: string,
    userId: string | null,
    fullName: string | null,
    email: string | null,
    phone: string | null,
    templeName: string | null,
    IdentityDocument: IdentityDocument[],
    User: User | null
}

export type IdentityDocument = {
    id: number,
    type: "Temple_Document" | "Id_verification" | "Guide_Document",
    filePath: string,
    uploadedDate: string
}

