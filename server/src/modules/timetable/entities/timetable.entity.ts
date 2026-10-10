import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum TimetableStatus {
  DRAFT = 'draft',
  EDITING = 'editing',
  COMPLETED = 'completed',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export type TimetableDocument = HydratedDocument<Timetable>;

@Schema({
  timestamps: true,
  collection: 'timetables',
  versionKey: false,
})
export class Timetable {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    index: false,
  })
  userId: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  })
  title: string;

  @Prop({
    type: String,
    trim: true,
    maxlength: 200,
    default: '',
  })
  description: string;

  @Prop({
    type: String,
    enum: TimetableStatus,
    default: TimetableStatus.DRAFT,
    required: true,
  })
  status: TimetableStatus;
}

export const TimetableSchema = SchemaFactory.createForClass(Timetable);

TimetableSchema.index({ userId: 1, createdAt: -1 });

TimetableSchema.index({ userId: 1, updatedAt: -1 });

TimetableSchema.index({ userId: 1, title: 1 });
