import { Schema, model, type InferSchemaType } from 'mongoose';

const messageSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    designerId: {
      type: String,
      required: true,
      index: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ['system', 'user', 'assistant'],
      default: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

messageSchema.index({
  designerId: 1,
  createdAt: 1,
});

export type Message = InferSchemaType<typeof messageSchema>;

export const MessageModel = model('Message', messageSchema);
