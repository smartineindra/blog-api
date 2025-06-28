import UserModel from '@/models/user.model';
import {IUser} from "@interfaces/user.interfaces";
import {ListDto} from "@/dtos/list.dto";
import {HttpException} from "@services/exceptions/httpException";

class UserService {
    async findAll(listDto: ListDto) {
        const {page = 1, limit = 10} = listDto;
        const skip = (listDto.page - 1) * listDto.limit;
        const [data, total] = await Promise.all([
            UserModel.find()
                .sort({createdAt: -1})
                .skip(skip)
                .limit(listDto.limit)
                .lean(),
            UserModel.countDocuments(),
        ]);
        return {
            data,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findById(id: string): Promise<IUser | null> {
        return UserModel.findById(id).lean();
    }

    async create(data: Partial<IUser>): Promise<IUser> {
        const findUser = await UserModel.findOne({ username: data.username });

        if (findUser) {
            throw new HttpException(409, `Username ${data.username} sudah ada`);
        }

        const user = new UserModel(data);
        return user.save();
    }

    async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
        return UserModel.findByIdAndUpdate(id, data, {new: true}).lean();
    }

    async delete(id: string): Promise<IUser | null> {
        return UserModel.findByIdAndDelete(id).lean();
    }
}

export default new UserService();
