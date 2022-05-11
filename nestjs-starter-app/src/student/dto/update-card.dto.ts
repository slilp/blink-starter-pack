import { IsOptional, MaxLength, IsInt } from 'class-validator';
import { Gender } from 'src/models/card.entity';

export class UpdateCardDto {
  @MaxLength(150)
  @IsOptional()
  firstName: string;

  @MaxLength(150)
  @IsOptional()
  lastName: string;

  @IsOptional()
  gender: Gender;

  @MaxLength(500)
  @IsOptional()
  profileImage: string;

  @IsInt()
  @IsOptional()
  level: number;
}
