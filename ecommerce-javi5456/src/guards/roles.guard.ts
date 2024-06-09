import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/modules/auth/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('role', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () =>
      requiredRoles.some((role) => user?.role.includes(role));
    if (user && user.role && hasRole()) return true;
    else throw new HttpException("Don't have access", HttpStatus.FORBIDDEN);
  }
}
