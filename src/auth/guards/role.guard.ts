import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PermissionGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (!requiredPermissions) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const userContext: any = ctx.getContext().req;

    const user = userContext.user;
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const userDetails: any = await this.userService.findOne(user._id);

    if (!userDetails) {
      throw new UnauthorizedException('Invalid user');
    }

    if (userDetails?.permissions != null) {
      const permissions = JSON.parse(userDetails?.permissions);
      return permissions.some((v) => requiredPermissions.indexOf(v) >= 0);
    }
    return false;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
