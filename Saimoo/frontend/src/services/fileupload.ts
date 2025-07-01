import api from "@/api";
import { env } from "@/config";

export type FileResponse = {
    message: string,
    file: {
        fieldname: string,
        originalname: string,
        encoding: string,
        mimetype: string,
        destination: string,
        filename: string,
        path: string,
        size: number
    }
}

export const sendFile = async (file: File): Promise<FileResponse | null> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await api.post<FileResponse>("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getFile = (path: string) => {
    let formattedPath = path.replace(/\\/g, "/");
    formattedPath = formattedPath.split("/").map(encodeURIComponent).join("/");
    return env.API_URL + '/' + formattedPath;
}