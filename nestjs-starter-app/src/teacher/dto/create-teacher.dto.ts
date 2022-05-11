import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateTeacherDto {
  @MaxLength(150)
  @IsNotEmpty()
  firstName: string;

  @MaxLength(150)
  @IsNotEmpty()
  lastName: string;

  @MaxLength(500)
  @IsOptional()
  profileImage: string;
}
