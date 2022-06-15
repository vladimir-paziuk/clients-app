import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_ENUM } from 'src/auth/enums/roles.enum';

export const ROLES_KEY = 'roles';

const Roles = (...args: ROLES_ENUM[]) => SetMetadata(ROLES_KEY, args);

@Injectable()
class RolesGuardCheck implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<ROLES_ENUM[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const { user } = context.switchToHttp().getRequest();

    return requireRoles.some((role) => user.roles.includes(role));
  }
}

export const RolesGuard = (...args: ROLES_ENUM[]) => {
  return applyDecorators(UseGuards(RolesGuardCheck), Roles(...args));
};
