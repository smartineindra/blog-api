import {NextFunction, Request, Response} from 'express';
import UserService from "@services/queries/user.service";
import {ListDto} from "@/dtos/list.dto";
import * as console from "node:console";
import {RequestWithUser} from "@interfaces/auth.interface";

class UserController {
    public findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const paginationData: ListDto = req.query;
            const result = await UserService.findAll(paginationData);
            res.status(200).json({message: 'Berhasil', ...result});
        } catch (err) {
            next(err);
        }
    }

    public findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await UserService.findById(req.params.id);
            if (!user) {
                res.status(404).json({message: 'Data tidak ditemukan'});
            }
            res.status(200).json({message: 'Berhasil', data: user});
        } catch (err) {
            next(err);
        }
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await UserService.create(req.body);
            res.status(200).json({message: 'Berhasil', data: user});
        } catch (err) {
            next(err);
        }
    }

    public update = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const existing = await UserService.findById(req.user._id.toString());

            if (!existing) {
                res.status(404).json({message: 'Data tidak ditemukan'});
            }
            const updated = await UserService.update(req.user._id.toString(), req.body);
            res.status(200).json({message: 'Berhasil', data: updated});
        } catch (err) {
            next(err);
        }
    }

    public delete = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const existing = await UserService.findById(req.user._id.toString());

            if (!existing) {
                res.status(404).json({message: 'Data tidak ditemukan'});
            }
            await UserService.delete(req.user._id.toString());
            res.status(200).json({message: 'Berhasil di hapus'});
        } catch (err) {
            next(err);
        }
    }
}

export default UserController;
