import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from '../enums'
import { ROLES_KEY } from '../decorators/roles.decorator'
import { IRequestWithUser } from '../interfaces'
import { CustomForbiddenException } from '../exeptions/custom-forbidden.exception'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRoles) {
      return true
    }
    const { user } = context.switchToHttp().getRequest<IRequestWithUser>()

    if (!user) {
      throw new CustomForbiddenException()
    }

    const hasRole = requiredRoles.some(role => user.role?.includes(role))

    if (!hasRole) {
      throw new CustomForbiddenException()
    }

    return true
  }
}
