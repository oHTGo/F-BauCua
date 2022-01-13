import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import envConfig from '../../app/envConfig';
import { Role } from '../enums/Role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop({ default: Number(envConfig().DEFAULT_COIN) })
  coin: number;

  @Prop({ default: Role.User })
  role: Role;

  @Prop({ default: false })
  disabled: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
