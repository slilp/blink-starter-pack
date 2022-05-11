import { IsOptional, IsPositive, IsString } from 'class-validator';

export class SearchSubjectDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsPositive()
  limit: number = 100;

  @IsOptional()
  @IsPositive()
  offset: number = 0;
}
