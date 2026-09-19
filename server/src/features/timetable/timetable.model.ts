import {
  Schema,
  model,
  type HydratedDocument,
  type InferSchemaType,
} from "mongoose";

const timetableSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    stage: {
      type: String,
      enum: ["incomplete", "editing", "complete"],
      default: "incomplete",
    },
  },
  {
    timestamps: true,
  },
);

timetableSchema.index({
  userId: 1,
  createdAt: -1,
});

timetableSchema.index({
  userId: 1,
  updatedAt: -1,
});

timetableSchema.index({
  userId: 1,
  title: 1,
});

export type Timetable = InferSchemaType<typeof timetableSchema>;

export type TimetableDocument = HydratedDocument<Timetable>;

export const TimetableModel = model<Timetable>("Timetable", timetableSchema);
