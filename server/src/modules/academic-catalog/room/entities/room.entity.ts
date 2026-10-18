import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export const ROOM_TYPES = [
  'classroom',
  'lab',
  'seminar',
  'auditorium',
  'facultyRoom',
] as const;

export type RoomType = (typeof ROOM_TYPES)[number];

export const ROOM_STATUSES = [
  'available',
  'unavailable',
  'maintenance',
] as const;

export type RoomStatus = (typeof ROOM_STATUSES)[number];

export type RoomDocument = HydratedDocument<Room>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Room {
  _id!: Types.ObjectId;

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
  })
  name!: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  })
  code!: string;

  @Prop({
    type: String,
    enum: ROOM_TYPES,
    required: true,
  })
  type!: RoomType;

  @Prop({
    type: Number,
    required: true,
    min: 1,
  })
  capacity!: number;

  @Prop({
    type: String,
    trim: true,
  })
  building?: string;

  @Prop({
    type: Number,
    min: 0,
  })
  floor?: number;

  @Prop({
    type: [String],
    default: [],
  })
  facilities!: string[];

  @Prop({
    type: String,
    enum: ROOM_STATUSES,
    default: 'available',
    required: true,
  })
  status!: RoomStatus;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

RoomSchema.index({ code: 1 }, { unique: true });
