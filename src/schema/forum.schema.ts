import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { User } from './user.schema';

@Schema()
export class Forum extends Document {
  
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: true })
  createdBy: mongoose.ObjectId;

  @Prop({ required: true })
  request: string;

  @Prop({ required: true })
  body: string;

  @Prop({ type: String }) // Agrega el campo photo
  photo: string;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }], default: [] })
  responses: mongoose.ObjectId[]; // Cambiado a plural y definido como un array
}

export const ForumSchema = SchemaFactory.createForClass(Forum);
