import { Schema, model, type HydratedDocument, type InferSchemaType } from 'mongoose';

const timetableDesignerSchema = new Schema(
  {
    timetableId: {
      type: Schema.Types.ObjectId,
      ref: 'Timetable',
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export type TimetableDesigner = InferSchemaType<typeof timetableDesignerSchema>;

export type TimetableDesignerDocument = HydratedDocument<TimetableDesigner>;

export const TimetableDesignerModel = model<TimetableDesigner>(
  'TimetableDesigner',
  timetableDesignerSchema,
);
