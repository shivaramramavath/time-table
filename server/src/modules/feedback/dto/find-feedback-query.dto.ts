import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Min } from 'class-validator';

import {
  FEEDBACK_CATEGORIES,
  FEEDBACK_RATINGS,
  FEEDBACK_STATUSES,
  type FeedbackRating,
} from '../entities/feedback.entity';

export class FindFeedbackQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn(FEEDBACK_RATINGS)
  rating?: FeedbackRating;

  @IsOptional()
  @IsIn(FEEDBACK_CATEGORIES)
  category?: (typeof FEEDBACK_CATEGORIES)[number];

  @IsOptional()
  @IsIn(FEEDBACK_STATUSES)
  status?: (typeof FEEDBACK_STATUSES)[number];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;
}
