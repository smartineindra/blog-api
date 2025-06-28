import {NextFunction, Request, Response} from 'express';
import ArticleService from "@services/queries/article.service";
import {RequestWithUser} from "@interfaces/auth.interface";
import {ListDto} from "@/dtos/list.dto";
import * as console from "node:console";

class ArticleController {
    public findAll = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const paginationData: ListDto = req.query;
            console.log(req.user);
            const currentUserId = req.user?._id;
            const filter: any = currentUserId
                ? {
                    $or: [
                        {status: 'published'},
                        {status: 'draft', author: currentUserId},
                    ],
                }
                : {status: 'published'};

            console.log(filter);

            const result = await ArticleService.findAll(paginationData, filter);
            res.status(200).json({message: 'Berhasil', data: result});
        } catch (err) {
            next(err);
        }
    }

    public findById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const currentUserId = req.user?._id.toString();
            const article = await ArticleService.findById(req.params.id, currentUserId);
            if (!article) {
                res.status(403).json({message: 'Anda tidak ada akses untuk data ini'});
            }
            res.status(200).json({data: article, message: 'Berhasil'});
        } catch (err) {
            next(err);
        }
    }

    public create = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const article = await ArticleService.create({...req.body, author: req.user._id});
            res.status(200).json({data: article, message: 'Berhasil'});
        } catch (err) {
            next(err);
        }
    }

    public update = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const updated = await ArticleService.updateWithOwnershipCheck(req.params.id, req.user._id.toString(), req.body);
            res.status(200).json({data: updated, message: 'Berhasil'});
        } catch (err) {
            next(err);
        }
    }

    public delete = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            await ArticleService.deleteWithOwnershipCheck(req.params.id, req.user._id.toString());
            res.status(200).json({message: 'Berhasil di hapus'});
        } catch (err) {
            next(err);
        }
    }
}

export default ArticleController;
