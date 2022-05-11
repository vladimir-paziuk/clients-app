import { applyDecorators } from '@nestjs/common';
import {
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export const swaggerApiErrorResponse = () => {
  return applyDecorators(
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
    }),
    ApiNotFoundResponse({
      description: 'Not found',
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal server error',
    }),
  );
};
