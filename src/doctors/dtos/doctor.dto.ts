import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class DoctorDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  desc: string;
}
