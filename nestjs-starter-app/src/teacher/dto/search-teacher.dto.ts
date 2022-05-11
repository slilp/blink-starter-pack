import { IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class SearchTeacherDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsPositive()
  limit: number = 100;

  @IsOptional()
  @Min(0)
  offset: number = 0;
}
