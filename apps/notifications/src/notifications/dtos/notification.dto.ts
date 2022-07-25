import { IsEnum, IsJSON, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { NotificationsEnum } from '@vp-clients-app/common-pkg';

export class NotificationDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsEnum(NotificationsEnum)
  type: string;

  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsJSON()
  payload: string;
}
