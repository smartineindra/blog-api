import { Types } from 'mongoose';

export interface IPageView{
    _id: Types.ObjectId;
    article: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}