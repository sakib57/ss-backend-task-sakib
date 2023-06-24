import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateHeroineInput {
  @Field()
  name: string;

  @Field()
  age: number;

  @Field()
  address: string;
}
