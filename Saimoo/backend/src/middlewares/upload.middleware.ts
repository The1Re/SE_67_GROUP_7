import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = "uploads/other";
        if (file.mimetype.startsWith("image/")) {
            folder = "uploads/image";
        } else if (file.mimetype === "application/pdf") {
            folder = "uploads/pdf";
        }

        fs.mkdirSync(folder, { recursive: true });
        cb(null, folder);
    },
    filename: function (_, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const uploads = multer({ storage: storage });