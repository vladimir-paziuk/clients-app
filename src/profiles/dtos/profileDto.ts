import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { GENDER_ENUM } from 'common/constants/gender.enum';

export class ProfileDto {
  @ApiProperty()
  @IsEnum(GENDER_ENUM)
  gender: GENDER_ENUM;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  firstName: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  image: string;
}

export class ProfileCreateDto {
  @ApiProperty()
  @IsUUID()
  userId: string;
}
