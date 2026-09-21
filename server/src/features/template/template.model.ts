import { Schema, model, type InferSchemaType } from 'mongoose';

const templateSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    visibility: {
      type: String,
      enum: ['private', 'public'],
      default: 'private',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type Template = InferSchemaType<typeof templateSchema>;

export const TemplateModel = model('Template', templateSchema);
