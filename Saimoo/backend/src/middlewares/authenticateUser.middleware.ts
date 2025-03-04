import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/user.service';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: JwtPayload
}

const authenticateUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'No token, Authorization' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token) as JwtPayload;
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default authenticateUser;