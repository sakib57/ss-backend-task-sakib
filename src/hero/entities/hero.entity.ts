import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type HeroDocument = Hero & Document;

@ObjectType()
@Schema()
export class Hero {
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
export const HeroSchema = SchemaFactory.createForClass(Hero);
