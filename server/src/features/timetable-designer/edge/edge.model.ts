import { Schema, model, type InferSchemaType } from 'mongoose';

const edgeSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },

    designerId: {
      type: String,
      required: true,
    },

    source: {
      type: String,
      required: true,
    },

    target: {
      type: String,
      required: true,
    },

    sourceHandle: {
      type: String,
      default: undefined,
    },

    targetHandle: {
      type: String,
      default: undefined,
    },

    type: {
      type: String,
      default: undefined,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

edgeSchema.index(
  {
    designerId: 1,
    id: 1,
  },
  {
    unique: true,
  },
);

edgeSchema.index({
  designerId: 1,
  source: 1,
});

edgeSchema.index({
  designerId: 1,
  target: 1,
});

export type Edge = InferSchemaType<typeof edgeSchema>;

export const EdgeModel = model('Edge', edgeSchema);
