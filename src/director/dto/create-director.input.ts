import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateDirectorInput {
  @Field()
  name: string;

  @Field()
  age: number;

  @Field()
  address: string;
}
