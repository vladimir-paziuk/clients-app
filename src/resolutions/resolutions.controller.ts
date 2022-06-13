import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { SwaggerApiErrorResponse } from 'src/common/swagger/swagger-api-error-response';

import { AUTH_BEARER_DEFAULT } from 'src/common/swagger/swagger.config';
import { GetUser } from 'src/common/jwt/get-user.guard';
import { JwtPayload } from 'src/common/jwt/jwt.strategy';

import { ResolutionEntity } from 'src/resolutions/resolution.entity';
import { ResolutionsService } from 'src/resolutions/resolutions.service';
import { ResolutionDto } from 'src/resolutions/dtos/resolution.dto';

@ApiBearerAuth(AUTH_BEARER_DEFAULT)
@ApiTags('Resolutions')
@Controller('resolutions')
@UseGuards(AuthGuard())
@Controller('resolutions')
export class ResolutionsController {
  constructor(private resolutionService: ResolutionsService) {}

  @ApiOperation({
    summary: 'Create new resolution instance. Available only for doctors.',
    description: 'Returns and create resolution data based on ResolutionDto.',
  })
  @ApiOkResponse({
    type: ResolutionEntity,
    description: 'Create resolution',
  })
  @SwaggerApiErrorResponse()
  @Post()
  createResolution(
    @Body() body: ResolutionDto,
    @GetUser() user: JwtPayload,
  ): Promise<ResolutionEntity> {
    return this.resolutionService.createResolution(body, user);
  }
}
