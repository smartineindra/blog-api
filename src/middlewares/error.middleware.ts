import { NextFunction, Request, Response } from 'express';
import {logger} from "@services/utils/logger";

const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    try {
        const errorName = error?.constructor?.name || 'UnknownError';
        const status: number = error?.status || 500;
        const message: string = error?.message || 'Something went wrong';

        logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${errorName}`);
        res.status(status).json({ message });
    } catch (internalError) {
        // Fallback kalau error handler-nya sendiri error
        logger.error(`Error in errorMiddleware: ${JSON.stringify(internalError)}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export default errorMiddleware;