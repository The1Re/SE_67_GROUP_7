import { Request, Response } from "express";
import { AuthRequest } from "../middlewares";
import generatePassword from "../utils/password";

import * as RequestService from "../services/request.service";
import * as UserService from "../services/user.service";

export const requestGuide = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { fullName, phone, guideDoc, idCard } = req.body;
        const userId = req.user?.id;

        if (!fullName || !phone || !guideDoc || !idCard) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        await RequestService.createRequest({
            type: 'Become_Guide',
            IdentityDocument: {
                createMany: {
                    data: [
                        {
                            type: "Guide_Certification",
                            filePath: guideDoc,
                        },
                        {
                            type: "Id_verification",
                            filePath: idCard,
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
        const { fullName, email, templeName, templeDoc, idCard } = req.body;

        if (!fullName || !email || !templeName || !templeDoc || !idCard) {
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
                            filePath: templeDoc,
                        },
                        {
                            type: "Id_verification",
                            filePath: idCard,
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
        return res.status(200).send("Hello");
    } catch (error) {
        return res.status(500).json({ error });
    }
}