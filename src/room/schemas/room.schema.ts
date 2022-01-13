import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop()
  name: string;

  @Prop({ default: [] })
  members: string[];

  @Prop()
  rollResult: number[];

  @Prop({ type: Map, of: [String], default: {} })
  betResult: Map<string, number[]>;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
