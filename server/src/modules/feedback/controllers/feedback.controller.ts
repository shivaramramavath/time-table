import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser, Roles } from '../../../shared/common/decorators';
import { AuthenticateGuard } from '../../../shared/common/guards/authenticate.guard';
import { RolesGuard } from '../../../shared/common/guards/roles.guard';
import { CreateFeedbackDto } from '../dto/create-feedback.dto';
import { FindFeedbackQueryDto } from '../dto/find-feedback-query.dto';
import { FeedbackService } from '../services/feedback.service';

@ApiTags('Feedback')
@ApiBearerAuth('access-token')
@Controller('feedbacks')
@UseGuards(AuthenticateGuard)
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @ApiOperation({ summary: 'Submit feedback' })
  @ApiResponse({ status: 201, description: 'Feedback submitted successfully' })
  @ApiResponse({ status: 400, description: 'Invalid feedback data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@CurrentUser('id') userId: string, @Body() dto: CreateFeedbackDto) {
    return this.feedbackService.create(userId, dto);
  }

  @Get('my')
  @ApiOperation({
    summary: 'Get the authenticated user’s feedback with pagination',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Page number (defaults to 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 20,
    description: 'Number of feedback records per page (defaults to 20)',
  })
  @ApiResponse({ status: 200, description: 'Feedback retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findMyFeedback(
    @CurrentUser('id') userId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.feedbackService.findMyFeedbacks(userId, page, limit);
  }

  @Get('my/:feedbackId')
  @ApiOperation({ summary: 'Get a specific feedback record' })
  @ApiParam({
    name: 'feedbackId',
    description: 'MongoDB ID of the feedback record',
    type: String,
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({ status: 200, description: 'Feedback retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Feedback not found' })
  findOne(@Param('feedbackId') feedbackId: string) {
    return this.feedbackService.findOne(feedbackId);
  }

  @Delete('my/:feedbackId')
  @ApiOperation({ summary: 'Delete a feedback record' })
  @ApiParam({
    name: 'feedbackId',
    description: 'MongoDB ID of the feedback record',
    type: String,
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({ status: 200, description: 'Feedback deleted successfully' })
  @ApiResponse({ status: 404, description: 'Feedback not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(HttpStatus.OK)
  remove(@Param('feedbackId') feedbackId: string) {
    return this.feedbackService.remove(feedbackId);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all feedback records' })
  @ApiOkResponse({
    description: 'Feedback records retrieved successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({
    description: 'Forbidden — admin role required',
  })
  @UseGuards(AuthenticateGuard, RolesGuard)
  @Roles('admin')
  findMany(@Query() query: FindFeedbackQueryDto) {
    return this.feedbackService.findMany(query);
  }
}
