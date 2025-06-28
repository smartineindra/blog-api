import {Router} from 'express';
import validationMiddleware from '@middlewares/validation.middleware';
import {CreateUserDto, UpdateUserDto} from "@/dtos/user.dto";
import UserController from "@controllers/user.controller";
import {IRoutes} from "@interfaces/route.interfaces";
import authMiddleware from "@middlewares/auth.middleware";
import {ListDto} from "@/dtos/list.dto";

class UserRoute implements IRoutes {
    public path = '/user';
    public router = Router();
    public userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, validationMiddleware(ListDto, 'params'), this.userController.findAll);
        this.router.get(`${this.path}/:id`, this.userController.findById);
        this.router.post(`${this.path}`, [authMiddleware,validationMiddleware(CreateUserDto, 'body')], this.userController.create);
        this.router.put(`${this.path}/me/update`, [authMiddleware,validationMiddleware(UpdateUserDto, 'body', true)], this.userController.update);
        this.router.delete(`${this.path}/me/delete`, authMiddleware,this.userController.delete);
    }
}

export default UserRoute;