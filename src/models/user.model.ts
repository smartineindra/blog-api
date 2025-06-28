import { Schema, model } from 'mongoose';
import {IUser} from "@interfaces/user.interfaces";

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const UserModel = model<IUser>('User', userSchema);
export default UserModel;
