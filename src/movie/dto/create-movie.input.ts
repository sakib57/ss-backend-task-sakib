import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId, IsString } from 'class-validator';

@InputType()
export class CreateMovieInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsMongoId()
  director: string;

  @Field()
  @IsMongoId()
  hero: string;

  @Field()
  @IsMongoId()
  heroine: string;

  @Field()
  runTime: string;
}
