import { CreateHeroineInput } from './create-heroine.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHeroineInput extends PartialType(CreateHeroineInput) {
  @Field(() => Int)
  id: number;
}
