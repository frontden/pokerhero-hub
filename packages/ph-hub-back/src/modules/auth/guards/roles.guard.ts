import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredLevel = this.reflector.get<number>(
      'accessLevel',
      context.getHandler(),
    );

    if (requiredLevel === undefined) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.accessLevel < requiredLevel) {
      throw new ForbiddenException('Insufficient access level');
    }

    return true;
  }
}