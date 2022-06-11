import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

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
  @IsUUID()
  doctorId: string;
}
