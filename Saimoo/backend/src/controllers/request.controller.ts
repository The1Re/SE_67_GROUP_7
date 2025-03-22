import { Request, Response } from "express";
import { AuthRequest } from "../middlewares";
import logger from "../utils/logger";

import { RequestService, UserService } from "../services";

export const requestGuide = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { fullName, phone, guide_doc_path, id_card_path } = req.body;
        const userId = req.user?.id;

        if (!fullName || !phone || !guide_doc_path || !id_card_path) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        await UserService.updateUser(userId, { fullName, phone });

        await RequestService.createRequest({
            type: 'Become_Guide',
            fullName: fullName,
            phone: phone,
            status: 'Pending',
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
        return res.status(201).json({ message: "Success waiting for admin approved" });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error });
    }
}

export const requestTemple = async (req: Request, res: Response): Promise<any> => {
    try {
        const { fullName, email, templeName, temple_doc_path, id_card_path } = req.body;

        if (!fullName || !email || !templeName || !temple_doc_path || !id_card_path) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        await RequestService.createRequest({
            type: 'Register_as_Temple',
            fullName: fullName,
            email: email,
            templeName: templeName,
            status: 'Pending',
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
            }
        })
        return res.status(201).json({ message: "Success waiting for admin approved" });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error });
    }
}

export const getRequests = async (req: Request, res: Response): Promise<any> => {
    try {
        const requests = await RequestService.getRequests();
        return res.status(200).json({ requests });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error });
    }
}

export const approveRequestGuide = async (req: Request, res: Response): Promise<any> => {
    try {
        const { requestId } = req.body;

        if (!requestId) {
            return res.status(400).json({ message: "Please provide request id" });
        }

        const result = await RequestService.approveRequestGuide(Number(requestId));

        return res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error });
    }
}

export const approveRequestTemple = async (req: Request, res: Response): Promise<any> => {
    try {
        const { requestId } = req.body;

        if (!requestId) {
            return res.status(400).json({ message: "Please provide request id" });
        }
        
        const result = await RequestService.approveRequestTemple(Number(requestId));

        return res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error });
    }
}

export const rejectRequest = async (req: Request, res: Response): Promise<any> => {
    try {
        const { requestId } = req.body;

        if (!requestId) {
            return res.status(400).json({ message: "Please provide request id" });
        }

        await RequestService.rejectRequest(Number(requestId));
        
        return res.status(200).json({ message: "Request rejected" });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error });
    }
}