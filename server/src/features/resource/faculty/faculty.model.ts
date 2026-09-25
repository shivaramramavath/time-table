import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';

const facultySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    employeeId: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    subjectIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
      },
    ],

    roomId: {
      type: String,
      // ref: 'Room',
      required: true,
    },

    maxPerDay: {
      type: Number,
      required: true,
      min: 1,
    },

    maxPerWeek: {
      type: Number,
      required: true,
      min: 1,
    },

    availability: {
      type: [[Boolean]],
      required: true,
      default: [],
    },

    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
);


export type Faculty = InferSchemaType<typeof facultySchema>;

export type FacultyDocument = HydratedDocument<Faculty>;

export const FacultyModel = model<Faculty>('Faculties', facultySchema);
