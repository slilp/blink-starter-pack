import { IsOptional, IsInt } from 'class-validator';

export class UpdateTeacherSubjectDto {
  @IsInt()
  @IsOptional()
  subject: number;
}
