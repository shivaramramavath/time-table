import { Schema, model, type InferSchemaType } from 'mongoose';

const subjectSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ['theory', 'lab', 'tutorial'],
      required: true,
    },

    credits: {
      type: Number,
      required: true,
      min: 0,
    },

    weeklyPeriods: {
      type: Number,
      required: true,
      min: 1,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    semester: {
      type: Number,
      required: true,
      min: 1,
    },

    requiresLab: {
      type: Boolean,
      required: true,
      default: false,
    },

    preferredRoomIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Room',
      },
    ],

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

subjectSchema.index(
  {
    code: 1,
    department: 1,
    semester: 1,
  },
  {
    unique: true,
  },
);

export type SubjectDocument = InferSchemaType<typeof subjectSchema>;

export const SubjectModel = model<SubjectDocument>('Subject', subjectSchema);
