import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Comment extends Document {
  
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: true })
  createdBy: mongoose.ObjectId;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Forum' }) // Relación con foros
  forum: mongoose.Types.ObjectId;

  @Prop({ required: true })
  body: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }] }) 
  response: mongoose.Types.ObjectId[];

  @Prop( {type: String, default:  null})
  photo: string;

  @Prop()
    editedAt?: Date; // Nuevo campo para registrar ediciones
    
  updatedAt: Date;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);