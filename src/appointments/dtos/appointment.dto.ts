import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class AppointmentDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  reason: string;

  @ApiProperty()
  @IsString()
  reservedAt: string;

  @ApiProperty()
  @IsString()
  specialization: string;
}
