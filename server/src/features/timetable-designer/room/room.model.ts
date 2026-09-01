import { Schema, model, type InferSchemaType } from "mongoose";

const roomSchema = new Schema(
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

    roomNumber: {
      type: String,
      required: true,
      trim: true,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    floor: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["classroom", "laboratory", "seminar-hall"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

roomSchema.index(
  {
    designerId: 1,
    id: 1,
  },
  {
    unique: true,
  },
);

roomSchema.index(
  {
    designerId: 1,
    roomNumber: 1,
  },
  {
    unique: true,
  },
);

export type Room = InferSchemaType<typeof roomSchema>;

export const RoomModel = model("Room", roomSchema);
