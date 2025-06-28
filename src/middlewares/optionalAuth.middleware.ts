import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@/config';
import { DataStoredInToken, RequestWithUser } from '@/interfaces/auth.interface';
import userModel from '@/models/user.model';

const optionalAuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const token =
            req.cookies['Authorization'] ||
            (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

        if (token) {
            const decoded = verify(token, SECRET_KEY) as DataStoredInToken;
            const user = await userModel.findById(decoded._id).lean();

            if (user) {
                req.user = user;
            }
        }
    } catch (err) {
        // Jangan kirim error — kita anggap tidak login saja
    }

    next();
};

export default optionalAuthMiddleware;
