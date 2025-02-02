import { createLogger, format, transports } from "winston";
import path from "path"

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.colorize(),
        format.label({ label: path.basename(process.mainModule?.filename || 'unknown') }),
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.printf(info => {
            return `${info.timestamp} [${info.level}] [${info.label}]:\n> ${info.message}`;
        })
    ),
    transports: [
        new transports.Console(), // แสดง log ใน console
        new transports.File({ filename: "logs/error.log", level: "error" }), // บันทึก error ลงไฟล์
    ],
});

export default logger;
