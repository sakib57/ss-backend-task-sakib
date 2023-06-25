import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Director } from 'src/director/entities/director.entity';
import { Hero } from 'src/hero/entities/hero.entity';
import { Heroine } from 'src/heroine/entities/heroine.entity';

export type MovieDocument = Movie & Document;

@ObjectType()
@Schema()
export class Movie {
  @Field()
  @Prop({ required: true, unique: true })
  name: string;

  @Field(() => Director)
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Director',
    default: undefined,
  })
  director: Director;

  @Field(() => Hero)
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Hero',
    default: undefined,
  })
  hero: Hero;

  @Field(() => Heroine)
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Heroine',
    default: undefined,
  })
  heroine: Heroine;

  @Field()
  @Prop()
  runTime: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
