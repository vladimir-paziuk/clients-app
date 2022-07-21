import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class DoctorDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  specialization: string;
  @ApiProperty()
  @IsUUID()
  userId: string;
}
