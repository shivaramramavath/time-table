import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from '../../shared/email/email.module';
import { FeedbackController } from './controllers/feedback.controller';
import { Feedback, FeedbackSchema } from './entities/feedback.entity';
import { FeedbackRepository } from './repository/feedback.repository';
import { FeedbackService } from './services/feedback.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Feedback.name, schema: FeedbackSchema },
    ]),
    EmailModule,
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService, FeedbackRepository],
})
export class FeedbackModule {}
