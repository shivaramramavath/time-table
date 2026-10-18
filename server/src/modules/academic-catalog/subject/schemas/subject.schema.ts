import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export const SUBJECT_TYPES = ['theory', 'lab', 'tutorial'] as const;

export type SubjectType = (typeof SUBJECT_TYPES)[number];

export const SUBJECT_STATUSES = ['active', 'inactive'] as const;

export type SubjectStatus = (typeof SUBJECT_STATUSES)[number];

export type SubjectDocument = HydratedDocument<Subject>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Subject {
  _id!: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  })
  code!: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name!: string;

  @Prop({
    type: String,
    enum: SUBJECT_TYPES,
    required: true,
  })
  type!: SubjectType;

  @Prop({
    type: Number,
    required: true,
    min: 0,
  })
  credits!: number;

  @Prop({
    type: Number,
    required: true,
    min: 1,
  })
  weeklyPeriods!: number;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  department!: string;

  @Prop({
    type: Number,
    required: true,
    min: 1,
  })
  semester!: number;

  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  requiresLab!: boolean;

  @Prop({
    type: [Types.ObjectId],
    ref: 'Room',
    default: [],
  })
  preferredRoomIds!: Types.ObjectId[];

  @Prop({
    type: String,
    enum: SUBJECT_STATUSES,
    default: 'active',
    required: true,
  })
  status!: SubjectStatus;

  createdAt!: Date;
  updatedAt!: Date;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);

SubjectSchema.index(
  {
    code: 1,
    department: 1,
    semester: 1,
  },
  {
    unique: true,
  },
);
