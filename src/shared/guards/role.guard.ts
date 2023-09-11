import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get(Roles, context.getHandler());
    if (!role) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (role === user.role) {
      return true;
    }
    return false;
  }
}
