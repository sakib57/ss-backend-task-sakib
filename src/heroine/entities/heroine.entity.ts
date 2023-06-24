import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type HeroineDocument = Heroine & Document;

@ObjectType()
@Schema()
export class Heroine {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop()
  age: number;

  @Field()
  @Prop()
  address: string;
}
export const HeroineSchema = SchemaFactory.createForClass(Heroine);
