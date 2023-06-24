import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateHeroInput {
  @Field()
  name: string;

  @Field()
  age: number;

  @Field()
  address: string;
}
