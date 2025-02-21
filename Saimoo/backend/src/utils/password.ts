import * as crypto from 'crypto';

const generatePassword = (length: number = 12): string => {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
}

export default generatePassword;
