import {Router} from 'express';
import validationMiddleware from '@middlewares/validation.middleware';
import {CreateUserDto, UpdateUserDto} from "@/dtos/user.dto";
import {IRoutes} from "@interfaces/route.interfaces";
import authMiddleware from "@middlewares/auth.middleware";
import {ListDto} from "@/dtos/list.dto";
import PageviewController from "@controllers/pageview.controller";
import {CreatePageViewDto, GetPageViewAggregateDto, GetPageViewCountDto} from "@/dtos/pageview.dto";

class PageViewRoute implements IRoutes {
    public path = '/page-view';
    public router = Router();
    public pageviewController = new PageviewController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, validationMiddleware(CreatePageViewDto, 'body'), this.pageviewController.track);
        this.router.get(`${this.path}/count`, validationMiddleware(GetPageViewCountDto, 'params'), this.pageviewController.count);
        this.router.get(`${this.path}/aggregate-date`, validationMiddleware(GetPageViewAggregateDto, 'params'), this.pageviewController.aggregate);
    }
}

export default PageViewRoute;