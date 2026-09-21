import { Schema, model, type InferSchemaType } from 'mongoose';

const facultySchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },

    designerId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    department: {
      type: String,
      trim: true,
    },

    subjectIds: {
      type: [String],
      default: [],
    },

    unavailablePeriods: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

facultySchema.index(
  {
    designerId: 1,
    id: 1,
  },
  {
    unique: true,
  },
);

facultySchema.index(
  {
    designerId: 1,
    email: 1,
  },
  {
    unique: true,
  },
);

facultySchema.index({
  designerId: 1,
  department: 1,
});

export type Faculty = InferSchemaType<typeof facultySchema>;

export const FacultyModel = model('Faculty', facultySchema);
