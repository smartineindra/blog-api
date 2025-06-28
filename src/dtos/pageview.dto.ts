import { IsMongoId, IsOptional, IsISO8601, IsIn } from 'class-validator';

export class CreatePageViewDto {
    @IsMongoId()
    public articleId: string;
}

export class GetPageViewCountDto {
    @IsOptional()
    @IsMongoId()
    public article?: string;

    @IsOptional()
    @IsISO8601()
    public startAt?: string;

    @IsOptional()
    @IsISO8601()
    public endAt?: string;
}

export class GetPageViewAggregateDto extends GetPageViewCountDto {
    @IsOptional()
    @IsIn(['hourly', 'daily', 'monthly'])
    public interval?: string;
}
