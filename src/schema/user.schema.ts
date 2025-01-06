import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { first } from "rxjs";

@Schema()
export class User extends Document {
    @Prop({
        type: {
            first: { type: String, required: true },
            last: { type: String, required: true }
        },
        required: true
    })

    name: Object;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: Date, required: true })
    bornDate: Date;

    @Prop({ type: Number, default: null })
    calification: number | null;

    @Prop({ type: [String], default: [] })
    skills: string[];

    @Prop({ type: Boolean, default: true })
    active: boolean;

    @Prop({
        type: {
            country: { type: String, required: true },
            city: { type: String, required: true }
        },
        required: true,
    })
    region: {
        country: string;
        city: string;
    };

    @Prop({ type: String })
    phone: string;

    @Prop({ type: [String], default: [] })
    certification: string[];

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] })
    followers: mongoose.Schema.Types.ObjectId[];

    @Prop({ type: String, default: '' })
    profilePhoto: string;
}

export const UserSchema = SchemaFactory.createForClass(User);