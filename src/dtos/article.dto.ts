import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateArticleDto {
    @IsString()
    @IsIn(['draft', 'published'])
    public status: string;

    @IsString()
    @IsNotEmpty()
    public title: string;

    @IsString()
    @IsNotEmpty()
    public content: string;
}

export class UpdateArticleDto {
    @IsString()
    @IsIn(['draft', 'published'])
    public status?: string;

    @IsString()
    public title?: string;

    @IsString()
    public content?: string;
}
