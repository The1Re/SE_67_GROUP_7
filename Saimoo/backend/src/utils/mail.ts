import nodemailer from "nodemailer";
import { env } from "../config";
import logger from "./logger";

export const sendMail = async (to: string, subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
        service: env.mail_host,
        auth: {
            user: env.mail_user,
            pass: env.mail_pass
        }
    });

    try {
        const info = await transporter.sendMail({
            from: env.mail_user,
            to,
            subject,
            html,
        });

        logger.info(`Email sent: ${info.response}`);
    } catch (error) {
        logger.error(error);
    }
};