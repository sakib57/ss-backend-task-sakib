import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';
import { User } from 'src/user/entities/user.entity';
import { LoginResponseType } from './types/login-response.type';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => LoginResponseType)
  login(@Args('authInput') authInput: AuthInput) {
    return this.authService.login(authInput);
  }
}
