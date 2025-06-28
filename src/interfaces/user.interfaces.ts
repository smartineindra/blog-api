import {Types} from 'mongoose';

export interface IUser{
    _id: Types.ObjectId;
    name: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
