import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import {IRoutes} from "@interfaces/route.interfaces";

class IndexRoute implements IRoutes {
    public path = '/';
    public router = Router();
    public indexController = new IndexController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.indexController.index);
    }
}

export default IndexRoute;