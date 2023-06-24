import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DirectorDocument = Director & Document;

@ObjectType()
@Schema()
export class Director {
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

export const DirectorSchema = SchemaFactory.createForClass(Director);
