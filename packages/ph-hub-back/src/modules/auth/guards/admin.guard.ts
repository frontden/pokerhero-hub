import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AccessLevel } from '../../../shared/constants';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.accessLevel !== AccessLevel.Admin) {
      throw new ForbiddenException('Admin access required');
    }

    return true;
  }
}