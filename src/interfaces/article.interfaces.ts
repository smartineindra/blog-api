import {Types} from 'mongoose';

export interface IArticle{
    _id: Types.ObjectId;
    status: 'draft' | 'published';
    title: string;
    content: string;
    author: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
