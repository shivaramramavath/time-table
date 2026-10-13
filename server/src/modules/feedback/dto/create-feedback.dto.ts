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
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(2000)
  message!: string;

  @IsIn(FEEDBACK_RATINGS)
  rating!: FeedbackRating;

  @IsIn(FEEDBACK_CATEGORIES)
  category!: FeedbackCategory;
}
