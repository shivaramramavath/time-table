import { Schema, model, type InferSchemaType } from 'mongoose';

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    type: {
      type: String,
      enum: ['classroom', 'lab', 'seminar', 'auditorium', 'facultyRoom'],
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    building: {
      type: String,
      trim: true,
    },

    floor: {
      type: Number,
      min: 0,
    },

    facilities: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ['available', 'unavailable', 'maintenance'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  },
);

// Room code should be unique
roomSchema.index({ code: 1 }, { unique: true });

export type RoomDocument = InferSchemaType<typeof roomSchema>;

export const RoomModel = model<RoomDocument>('Room', roomSchema);
