import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import {CreateUserDto} from "@/dtos/user.dto";
import {IRoutes} from "@interfaces/route.interfaces";
import {LoginDto} from "@/dtos/login.dto";

class AuthRoute implements IRoutes {
    public path = '/';
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // @ts-ignore
        this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
        this.router.post(`${this.path}login`, validationMiddleware(LoginDto, 'body'), this.authController.logIn);
        this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
    }
}

export default AuthRoute;