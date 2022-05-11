import { PartialType, OmitType } from '@nestjs/swagger';
import { IsOptional, IsInt } from 'class-validator';
import { RegisterStudentDto } from './register-student.dto';

export class UpdateStudentDto extends PartialType(
  OmitType(RegisterStudentDto, ['username', 'password']),
) {
  @IsInt({ each: true })
  @IsOptional()
  subjects: number[];
}
