import { Schema, model, type InferSchemaType } from 'mongoose';

const subjectSchema = new Schema(
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

    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    duration: {
      type: Number,
      required: true,
      min: 1,
    },

    labDetails: {
      isLab: {
        type: Boolean,
        required: true,
        default: false,
      },

      weeklyPeriods: {
        type: Number,
        min: 0,
      },
    },

    weeklyPeriods: {
      type: Number,
      required: true,
      min: 1,
    },

    periodsPerDay: {
      type: Number,
      min: 1,
    },

    consecutivePeriods: {
      type: Number,
      min: 1,
    },

    roomRequirements: {
      type: {
        type: String,
        enum: ['classroom', 'laboratory', 'seminar-hall'],
      },

      minimumCapacity: {
        type: Number,
        min: 1,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

subjectSchema.index(
  {
    designerId: 1,
    id: 1,
  },
  {
    unique: true,
  },
);

subjectSchema.index(
  {
    designerId: 1,
    code: 1,
  },
  {
    unique: true,
  },
);

export type Subject = InferSchemaType<typeof subjectSchema>;

export const SubjectModel = model('Subject', subjectSchema);
