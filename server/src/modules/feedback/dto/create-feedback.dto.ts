import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import {
  FEEDBACK_CATEGORIES,
  FEEDBACK_RATINGS,
  type FeedbackCategory,
  type FeedbackRating,
} from '../entities/feedback.entity';

export class CreateFeedbackDto {
  @ApiProperty({
    description: 'Detailed message describing the feedback',
    type: String,
    minLength: 3,
    maxLength: 2000,
    example:
      'The application is easy to use, but the timetable editor could be improved.',
    required: true,
  })
  @IsString({ message: 'Feedback message must be a string' })
  @IsNotEmpty({ message: 'Feedback message must not be empty' })
  @MinLength(3, {
    message: 'Feedback message must be at least 3 characters long',
  })
  @MaxLength(2000, {
    message: 'Feedback message cannot exceed 2000 characters',
  })
  message!: string;

  @ApiProperty({
    description: 'Rating assigned to the feedback',
    enum: FEEDBACK_RATINGS,
    example: FEEDBACK_RATINGS[4],
    required: true,
  })
  @IsIn(FEEDBACK_RATINGS, {
    message: 'Rating must be one of the supported feedback ratings',
  })
  rating!: FeedbackRating;

  @ApiProperty({
    description: 'Category that best describes the feedback',
    enum: FEEDBACK_CATEGORIES,
    example: FEEDBACK_CATEGORIES[0],
    required: true,
  })
  @IsIn(FEEDBACK_CATEGORIES, {
    message: 'Category must be one of the supported feedback categories',
  })
  category!: FeedbackCategory;
}
