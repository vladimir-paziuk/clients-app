import { IsBoolean, IsEnum, IsJSON, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationsEnum } from 'src/constants/notifications.enum';

export class NotificationDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsEnum(NotificationsEnum)
  type: NotificationsEnum;

  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsBoolean()
  isRead: boolean;

  @ApiProperty()
  @IsJSON()
  payload: string;
}
