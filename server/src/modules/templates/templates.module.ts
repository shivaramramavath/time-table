import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TemplatesController } from './controllers/templates.controller';
import { Template, TemplateSchema } from './entities/template.entity';
import { TemplatesRepository } from './repository/templates.repository';
import { TemplatesService } from './services/templates.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Template.name, schema: TemplateSchema },
    ]),
  ],
  controllers: [TemplatesController],
  providers: [TemplatesService, TemplatesRepository],
  exports: [TemplatesService],
})
export class TemplatesModule {}
