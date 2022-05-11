import { IsNotEmpty, IsEmail } from 'class-validator';
import { Student } from '../../models/student.entity';

export class LoginStudentDto {
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  password: string;
}

export interface LoginStudentResponseDto {
  student: Student;
  accessToken: string;
}
