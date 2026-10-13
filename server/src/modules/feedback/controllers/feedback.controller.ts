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
import { CurrentUser } from '../../../shared/common/decorators';
import { AuthenticateGuard } from '../../../shared/common/guards/authenticate.guard';
import { CreateFeedbackDto } from '../dto/create-feedback.dto';
import { FeedbackService } from '../services/feedback.service';

@Controller('feedbacks')
@UseGuards(AuthenticateGuard)
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  create(@CurrentUser('id') userId: string, @Body() dto: CreateFeedbackDto) {
    return this.feedbackService.create(userId, dto);
  }

  @Get('my')
  findMyFeedback(
    @CurrentUser('id') userId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.feedbackService.findMyFeedbacks(userId, page, limit);
  }

  @Get('my/:feedbackId')
  findOne(@Param('feedbackId') feedbackId: string) {
    return this.feedbackService.findOne(feedbackId);
  }

  @Delete('my/:feedbackId')
  @HttpCode(HttpStatus.OK)
  remove(@Param('feedbackId') feedbackId: string) {
    return this.feedbackService.remove(feedbackId);
  }

  // @Get('admin')
  // @UseGuards(AdminGuard)
  // findAll(
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  //   @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  // ) {
  //   return this.feedbackService.findAll(page, limit);
  // }

  // @Patch('admin/:feedbackId/status')
  // @UseGuards(AdminGuard)
  // updateStatus(
  //   @Param('feedbackId', ParseMongoIdPipe) feedbackId: string,
  //   @CurrentUser('id') adminId: string,
  //   @Body() dto: UpdateFeedbackStatusDto,
  // ) {
  //   return this.feedbackService.updateStatus(
  //     feedbackId,
  //     dto.status,
  //     dto.adminResponse,
  //     adminId,
  //   );
  // }
}
