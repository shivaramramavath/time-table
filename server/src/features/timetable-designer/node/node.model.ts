import { Schema, model, type InferSchemaType } from 'mongoose';

const positionSchema = new Schema(
  {
    x: {
      type: Number,
      required: true,
    },

    y: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const nodeSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },

    designerId: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ['institution', 'program', 'academic-year', 'section'],
      required: true,
    },

    position: {
      type: positionSchema,
      required: true,
    },

    data: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

nodeSchema.index(
  {
    designerId: 1,
    id: 1,
  },
  {
    unique: true,
  },
);

nodeSchema.index({
  designerId: 1,
  type: 1,
});

export type Node = InferSchemaType<typeof nodeSchema>;

export const NodeModel = model('Node', nodeSchema);
