import {IRoutes} from "@interfaces/route.interfaces";
import {Router} from "express";
import ArticleController from "@controllers/article.controller";
import validationMiddleware from "@middlewares/validation.middleware";
import {ListDto} from "@/dtos/list.dto";
import authMiddleware from "@middlewares/auth.middleware";
import {CreateArticleDto, UpdateArticleDto} from "@/dtos/article.dto";
import optionalAuthMiddleware from "@middlewares/optionalAuth.middleware";

class ArticleRoute implements IRoutes {
    public path = '/article';
    public router = Router();
    public articleController = new ArticleController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, [optionalAuthMiddleware,validationMiddleware(ListDto, 'params')], this.articleController.findAll);
        this.router.get(`${this.path}/:id`, this.articleController.findById);
        this.router.post(`${this.path}`, [authMiddleware,validationMiddleware(CreateArticleDto, 'body')], this.articleController.create);
        this.router.put(`${this.path}/:id`, [authMiddleware,validationMiddleware(UpdateArticleDto, 'body', true)], this.articleController.update);
        this.router.delete(`${this.path}/:id`, authMiddleware,this.articleController.delete);
    }
}

export default ArticleRoute;