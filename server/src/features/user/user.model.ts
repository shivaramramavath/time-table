import { Schema, model, type HydratedDocument, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    preferences: {
      darkMode: {
        type: Boolean,
        default: false,
      },
    },

    avatar: {
      type: String,
      default: null,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export type User = InferSchemaType<typeof userSchema>;

export type UserDocument = HydratedDocument<User>;

export const UserModel = model<User>('User', userSchema);
