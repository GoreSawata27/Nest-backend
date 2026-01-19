import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const allowedRoles = ['admin'];
    if (!allowedRoles.includes(user.role)) {
      throw new UnauthorizedException(
        'You do not have permission to access project settings',
      );
    }

    return true;
  }
}
