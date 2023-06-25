import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  laststName: string;

  @Field(() => [String])
  permissions: string[];
}
