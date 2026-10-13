import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateTemplateDto } from '../dto/create-template.dto';
import { UpdateTemplateDto } from '../dto/update-template.dto';
import { TemplateQueueService } from '../queue/template-queue.service';
import { TemplatesRepository } from '../repository/templates.repository';

@Injectable()
export class TemplatesService {
  constructor(
    private readonly templatesRepository: TemplatesRepository,
    private readonly templateQueueService: TemplateQueueService,
  ) {}

  async create(createTemplateDto: CreateTemplateDto) {
    const template = await this.templatesRepository.create({
      ...createTemplateDto,
      userId: new Types.ObjectId(createTemplateDto.userId),
    });

    await this.templateQueueService.enqueueCreate({
      templateId: template._id.toString(),
      userId: createTemplateDto.userId,
    });

    return template;
  }

  async findAll(userId: string) {
    return await this.templatesRepository.findMany({ userId });
  }

  async findOne(templateId: string) {
    return await this.templatesRepository.findOne({ _id: templateId });
  }

  async update(templateId: string, updateTemplateDto: UpdateTemplateDto) {
    return await this.templatesRepository.updateById(
      templateId,
      updateTemplateDto,
    );
  }

  async remove(templateId: string) {
    const template = await this.templatesRepository.deleteById(templateId);

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    await this.templateQueueService.enqueueRemove({
      templateId,
      userId: template.userId.toString(),
    });
    return template;
  }
}
