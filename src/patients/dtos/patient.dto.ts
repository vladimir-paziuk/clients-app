import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { BLOOD_TYPE_ENUM } from 'common/constants/blood-type.enum';

export class PatientDto {
  @ApiProperty()
  @IsEnum(BLOOD_TYPE_ENUM)
  bloodType: BLOOD_TYPE_ENUM;
}

export class PatientCreateDto {
  @ApiProperty()
  @IsUUID()
  userId: string;
}