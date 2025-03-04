import { Response, NextFunction } from 'express';
import { AuthRequest } from './authenticateUser.middleware';

const authorizeRoles = (...allowedRoles: string[]) => {
    return async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
        const userRole = req.user?.role;

        if (!userRole || !allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        next();
    };
};

export default authorizeRoles;