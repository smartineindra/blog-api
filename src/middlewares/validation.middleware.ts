import {plainToClass, plainToInstance} from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import {HttpException} from "@services/exceptions/httpException";
import * as console from "node:console";

const validationMiddleware = (
    type: any,
    value: 'body' | 'query' | 'params' = 'body',
    skipMissingProperties = false,
    whitelist = true,
    forbidNonWhitelisted = true,
): RequestHandler => {
    return (req, res, next) => {
        const transformed = plainToClass(type, req[value]);
        validate(transformed, { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const message = errors
                    .map((error: ValidationError) => Object.values(error.constraints || {}))
                    .join(', ');
                next(new HttpException(400, message));
            } else {
                console.log(req[value]);
                req[value] = transformed;
                next();
            }
        });
    };
};

export default validationMiddleware;