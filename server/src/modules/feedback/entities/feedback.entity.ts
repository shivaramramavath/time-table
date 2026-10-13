import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type FeedbackDocument = HydratedDocument<Feedback>;

export const FEEDBACK_RATINGS = [1, 2, 3, 4, 5] as const;
export type FeedbackRating = (typeof FEEDBACK_RATINGS)[number];

export const FEEDBACK_CATEGORIES = [
  'general',
  'bug',
  'feature-request',
  'ui-ux',
  'performance',
  'other',
] as const;

export type FeedbackCategory = (typeof FEEDBACK_CATEGORIES)[number];

export const FEEDBACK_STATUSES = [
  'pending',
  'reviewed',
  'resolved',
  'rejected',
] as const;

export type FeedbackStatus = (typeof FEEDBACK_STATUSES)[number];

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Feedback {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId!: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 2000,
  })
  message!: string;

  @Prop({
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: (value: number) => Number.isInteger(value),
      message: 'Rating must be an integer between 1 and 5',
    },
  })
  rating!: FeedbackRating;

  @Prop({
    type: String,
    enum: FEEDBACK_CATEGORIES,
    default: 'general',
    required: true,
  })
  category!: FeedbackCategory;

  @Prop({
    type: String,
    enum: FEEDBACK_STATUSES,
    default: 'pending',
    required: true,
    index: true,
  })
  status!: FeedbackStatus;

  @Prop({
    type: String,
    trim: true,
    maxlength: 2000,
  })
  adminResponse?: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  reviewedBy?: Types.ObjectId;

  createdAt!: Date;
  updatedAt!: Date;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);

FeedbackSchema.index({ userId: 1, createdAt: -1 });
FeedbackSchema.index({ status: 1, createdAt: -1 });
