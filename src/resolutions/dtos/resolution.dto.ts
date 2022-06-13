import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class ResolutionDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(180)
  summary: string;

  @ApiProperty()
  @IsUUID()
  appointmentId: string;
}
