import {IsString, IsNotEmpty, MinLength, IsOptional} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsString()
    @IsNotEmpty()
    public username: string;

    @IsString()
    @MinLength(6)
    public password: string;
}

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    public name?: string;

    @IsString()
    @IsOptional()
    public password?: string;
}
