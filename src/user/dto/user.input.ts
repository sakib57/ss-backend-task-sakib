import { InputType, Field, ID } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import Permission from 'src/auth/permissions/permission.type';

@InputType()
export class UserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  password: string;

  @Field()
  permissions: string;
}
