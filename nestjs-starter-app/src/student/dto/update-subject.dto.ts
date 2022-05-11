import { IsInt } from 'class-validator';

export class UpdateSubjectDto {
  @IsInt()
  subject: number;
}
