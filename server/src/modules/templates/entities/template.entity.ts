import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

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
  userId: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  })
  name: string;

  @Prop({
    type: String,
    trim: true,
    maxlength: 500,
  })
  description?: string;

  @Prop({
    type: String,
    enum: ['private', 'public'],
    default: 'private',
    required: true,
    index: true,
  })
  visibility: 'private' | 'public';
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
