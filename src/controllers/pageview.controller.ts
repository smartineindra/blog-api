import {Request, Response, NextFunction} from 'express';
import PageViewModel from '@/models/pageview.model';
import mongoose from 'mongoose';
import PageviewService from "@services/queries/pageview.service";
import {RequestWithUser} from "@interfaces/auth.interface";

class PageViewController {
    // POST /page-view
    async track(req: Request, res: Response, next: NextFunction) {
        try {
            const {articleId} = req.body;
            const view = await PageviewService.create({article: articleId});
            res.status(200).json({message: 'Berhasil', data: view});
        } catch (err) {
            next(err);
        }
    }

    // GET /page-view/count
    async count(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const {article, startAt, endAt} = req.query;
            const filter: any = {};

            if (article) filter.article = article;
            if (startAt || endAt) {
                filter.createdAt = {};
                if (startAt) filter.createdAt.$gte = new Date(startAt as string);
                if (endAt) filter.createdAt.$lte = new Date(endAt as string);
            }

            const count = await PageviewService.countPageView(filter);
            res.status(200).json({message: 'Berhasil', data: {"views": count}});
        } catch (err) {
            next(err);
        }
    }

    // GET /page-view/aggregate-date?interval=daily|monthly|hourly
    async aggregate(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const {article, startAt, endAt, interval = 'daily'} = req.query;
            const filter: any = {};

            if (article) filter.article = new mongoose.Types.ObjectId(article.toString());
            if (startAt || endAt) {
                filter.createdAt = {};
                if (startAt) filter.createdAt.$gte = new Date(startAt as string);
                if (endAt) filter.createdAt.$lte = new Date(endAt as string);
            }
console.log(filter)
            const dateFormat =
                interval === 'monthly'
                    ? '%Y-%m'
                    : interval === 'hourly'
                        ? '%Y-%m-%d %H'
                        : '%Y-%m-%d';

            const result = await PageViewModel.aggregate([
                {$match: filter},
                {
                    $group: {
                        _id: {
                            $dateToString: {format: dateFormat, date: '$createdAt'},
                        },
                        count: {$sum: 1},
                    },
                },
                {$sort: {_id: 1}},
            ]);

            res.status(200).json({message: 'Berhasil', data: {"views": result}});
        } catch (err) {
            next(err);
        }
    }
}

export default PageViewController;
