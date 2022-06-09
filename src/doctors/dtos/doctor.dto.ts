import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class DoctorDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  specialization: string;
}
