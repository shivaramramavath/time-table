import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export const FACULTY_STATUSES = ['active', 'inactive'] as const;

export type FacultyStatus = (typeof FACULTY_STATUSES)[number];

export type FacultyDocument = HydratedDocument<Faculty>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Faculty {
  _id!: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name!: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  })
  email!: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  department!: string;

  @Prop({
    type: [Types.ObjectId],
    ref: 'Subject',
    default: [],
  })
  subjectIds!: Types.ObjectId[];

  @Prop({
    type: String,
    ref: 'Room',
    required: true,
  })
  roomId!: string;

  @Prop({
    type: Number,
    required: true,
    min: 1,
  })
  maxPerDay!: number;

  @Prop({
    type: Number,
    required: true,
    min: 1,
  })
  maxPerWeek!: number;

  @Prop({
    type: [[Boolean]],
    required: true,
    default: [],
  })
  availability!: boolean[][];

  @Prop({
    type: String,
    enum: FACULTY_STATUSES,
    default: 'active',
    required: true,
  })
  status!: FacultyStatus;

  createdAt!: Date;
  updatedAt!: Date;
}

export const FacultySchema = SchemaFactory.createForClass(Faculty);

FacultySchema.index({ email: 1 }, { unique: true });
FacultySchema.index({ department: 1, status: 1 });
