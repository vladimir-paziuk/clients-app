import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { SwaggerApiErrorResponse } from '@vp-clients-app/common-pkg';

import { RolesGuard } from '@vp-clients-app/common-pkg';
import { ROLES_ENUM } from '@vp-clients-app/common-pkg';

import { AUTH_BEARER_DEFAULT } from '@vp-clients-app/common-pkg';
import { GetUser } from '@vp-clients-app/common-pkg';
import { JwtPayload } from '@vp-clients-app/common-pkg';

import { ResolutionEntity } from 'src/modules/resolutions/resolution.entity';
import { ResolutionsService } from 'src/modules/resolutions/resolutions.service';
import { ResolutionDto } from 'src/modules/resolutions/dtos/resolution.dto';

@ApiBearerAuth(AUTH_BEARER_DEFAULT)
@ApiTags('Resolutions')
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
  @RolesGuard(ROLES_ENUM.doctor)
  @Post()
  createResolution(
    @Body() body: ResolutionDto,
    @GetUser() user: JwtPayload,
  ): Promise<ResolutionEntity> {
    return this.resolutionService.createResolution(body, user);
  }
}
