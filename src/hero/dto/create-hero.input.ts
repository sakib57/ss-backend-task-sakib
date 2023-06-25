import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateHeroInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  age: number;

  @Field()
  address: string;
}
