import {NextFunction, Request, Response} from 'express';
import {CreateUserDto} from "@/dtos/user.dto";
import {IUser} from "@interfaces/user.interfaces";
import AuthService from "@services/queries/auth.service";
import * as console from "node:console";
import {LoginDto} from "@/dtos/login.dto";
import {RequestWithUser} from "@interfaces/auth.interface";


class AuthController {

    public signUp = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const userData: CreateUserDto = req.body;
            const signUpUserData: IUser = await AuthService.signup(userData);

            res.status(201).json({data: signUpUserData, message: 'Berhasil signup'});
        } catch (error) {
            next(error);
        }
    };

    public logIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: LoginDto = req.body;
            const {cookie, findUser} = await AuthService.login(userData);

            res.setHeader('Set-Cookie', [cookie]);
            res.status(200).json({data: findUser, message: 'Berhasil login'});
        } catch (error) {
            next(error);
        }
    };

    public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userData: IUser = req.user;
            const logOutUserData: IUser = await AuthService.logout(userData);

            res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
            res.status(200).json({ data: logOutUserData, message: 'Berhasil logout' });
        } catch (error) {
            next(error);
        }
    };

}

export default AuthController;