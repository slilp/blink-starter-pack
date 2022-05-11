import { IsNotEmpty, MaxLength, IsInt, IsOptional } from 'class-validator';

export class CreateSubjectDto {
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsOptional()
  credit: number;
}
