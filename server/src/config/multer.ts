import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads', 'profile'),
        filename: (request, file, callback) => {
            const hash = crypto.randomBytes(6).toString('hex');
            const fileName = `${hash}-${file.originalname}`;

            callback(null, fileName);
        },
    }),
    fileFilter: (request, file, callback) => {
        const allowedMimes = [
            'image/jpeg',
            'image/png'
        ]

        if(allowedMimes.includes(file.mimetype)) callback(null, true);
        else callback(new Error("Invalid file tipe."));
    },
};