import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  _id: Types.ObjectId;

  @Prop({
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  })
  userName: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({
    required: true,
    minlength: 6,
    select: false,
  })
  password: string;

  @Prop({
    default: false,
  })
  isEmailVerified: boolean;

  @Prop({
    type: {
      darkMode: {
        type: Boolean,
        default: false,
      },
    },
  })
  preferences: {
    darkMode: boolean;
  };

  @Prop({
    type: String,
    default: null,
  })
  avatar: string | null;

  @Prop({
    type: Date,
    default: Date.now,
  })
  lastLoginAt: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
