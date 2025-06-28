import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import userModel from "@models/user.model";
import {CreateUserDto} from "@/dtos/user.dto";
import {IUser} from "@interfaces/user.interfaces";
import {isEmpty} from "@services/utils/util";
import {HttpException} from "@services/exceptions/httpException";
import {DataStoredInToken, TokenData} from "@interfaces/auth.interface";
import {SECRET_KEY} from "@/config";
import {LoginDto} from "@/dtos/login.dto";

class AuthService {
    public users = userModel;

    public async signup(userData: CreateUserDto): Promise<IUser> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

        const findUser: IUser = await this.users.findOne({ username: userData.username });
        if (findUser) throw new HttpException(409, `Username ${userData.username} sudah ada`);

        const hashedPassword = await hash(userData.password, 10);
        const createUserData: IUser = await this.users.create({ ...userData, password: hashedPassword });

        return createUserData;
    }

    public async login(userData: LoginDto): Promise<{ cookie: string; findUser: IUser }> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

        const findUser: IUser = await this.users.findOne({ username: userData.username });
        if (!findUser) throw new HttpException(409, `Username ${userData.username} tidak ditemukan`);

        const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
        if (!isPasswordMatching) throw new HttpException(409, "Password tidak sama");

        const tokenData = this.createToken(findUser);
        const cookie = this.createCookie(tokenData);

        return { cookie, findUser };
    }

    public async logout(userData: IUser): Promise<IUser> {
        if (isEmpty(userData)) throw new HttpException(400, "Data Tidak Ada");

        const findUser: IUser = await this.users.findOne({ username: userData.username, password: userData.password });
        if (!findUser) throw new HttpException(409, `Username ${userData.username} tidak ditemukan`);

        return findUser;
    }

    public createToken(user: IUser): TokenData {
        const dataStoredInToken: DataStoredInToken = { _id: user._id.toString() };
        const secretKey: string = SECRET_KEY;
        const expiresIn: number = 60 * 60;

        return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
    }

    public createCookie(tokenData: TokenData): string {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}

export default new AuthService();