import { Request, Response } from "express";
import { AuthRequest } from "../middlewares";
import generatePassword from "../utils/password";

import * as RequestService from "../services/request.service";
import * as UserService from "../services/user.service";

export const requestGuide = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { fullName, phone, guide_doc_path, id_card_path } = req.body;
        const userId = req.user?.id;

        if (!fullName || !phone || !guide_doc_path || !id_card_path) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        await RequestService.createRequest({
            type: 'Become_Guide',
            IdentityDocument: {
                createMany: {
                    data: [
                        {
                            type: "Guide_Certification",
                            filePath: guide_doc_path,
                        },
                        {
                            type: "Id_verification",
                            filePath: id_card_path,
                        }
                    ]
                }
            },
            User: {
                connect: { id: userId }
            }
        })
        return res.status(201).json({ message: "Success waiting for admin appoved" });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const requestTemple = async (req: Request, res: Response): Promise<any> => {
    try {
        const { fullName, email, templeName, temple_doc_path, id_card_path } = req.body;

        if (!fullName || !email || !templeName || !temple_doc_path || !id_card_path) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const userValidationResult = await UserService.checkIfUserExists({ username: templeName });
        if (userValidationResult) {
            return res.status(400).json(userValidationResult);
        } 

        await RequestService.createRequest({
            type: 'Register_as_Temple',
            IdentityDocument: {
                createMany: {
                    data: [
                        {
                            type: "Temple_Document",
                            filePath: temple_doc_path,
                        },
                        {
                            type: "Id_verification",
                            filePath: id_card_path,
                        }
                    ]
                }
            },
            User: {
                create: {
                    username: `${templeName}`,
                    password: generatePassword(6),
                    email: email,
                    role: "temple"
                }
            }
        })
        return res.status(200).json({ message: "Request for temple successful" });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const getRequests = async (req: Request, res: Response): Promise<any> => {
    try {
        const requests = await RequestService.getRequests();
        return res.status(200).json({ requests });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const approveRequest = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Please provide request id" });
        }

        await RequestService.approveRequest(Number(id));
        return res.status(200).json({ message: "Request approved" });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const rejectRequest = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Please provide request id" });
        }

        await RequestService.rejectRequest(Number(id));
        return res.status(200).json({ message: "Request rejected" });
    } catch (error) {
        return res.status(500).json({ error });
    }
}