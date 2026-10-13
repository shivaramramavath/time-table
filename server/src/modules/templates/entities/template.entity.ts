import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export const TEMPLATE_STATUSES = ['processing', 'completed'] as const;
export type TemplateStatus = (typeof TEMPLATE_STATUSES)[number];

export const TEMPLATE_VISIBILITIES = ['private', 'public'] as const;
export type TemplateVisibility = (typeof TEMPLATE_VISIBILITIES)[number];

export type TemplateDocument = HydratedDocument<Template>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Template {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  userId!: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  })
  name!: string;

  @Prop({
    type: String,
    trim: true,
    maxlength: 500,
  })
  description?: string;

  @Prop({
    type: String,
    enum: TEMPLATE_STATUSES,
    default: 'processing',
    required: true,
  })
  status!: TemplateStatus;

  @Prop({
    type: String,
    enum: TEMPLATE_VISIBILITIES,
    default: 'private',
    required: true,
    index: true,
  })
  visibility!: TemplateVisibility;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
