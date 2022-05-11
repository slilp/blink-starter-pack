import { IsNotEmpty, MaxLength } from 'class-validator';

export class RegisterStudentDto {
  @MaxLength(150)
  @IsNotEmpty()
  username: string;

  @MaxLength(150)
  @IsNotEmpty()
  password: string;

  @MaxLength(150)
  @IsNotEmpty()
  firstName: string;

  @MaxLength(150)
  @IsNotEmpty()
  lastName: string;
}
