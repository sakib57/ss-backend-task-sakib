import { HttpStatus } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class LoginResponseType {
  @Field()
  readonly expiresIn: number;
  @Field()
  readonly token: string;
  @Field()
  readonly user: User;
  @Field()
  readonly status: HttpStatus;
}
