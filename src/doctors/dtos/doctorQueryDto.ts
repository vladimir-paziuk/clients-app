import { ApiProperty } from '@nestjs/swagger';

export class DoctorQueryDto {
  @ApiProperty({ required: false })
  search: string;
}
