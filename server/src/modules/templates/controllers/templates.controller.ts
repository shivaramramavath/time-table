import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../../../shared/common/decorators';
import { AuthenticateGuard } from '../../../shared/common/guards/authenticate.guard';
import { CreateTemplateDto } from '../dto/create-template.dto';
import { UpdateTemplateDto } from '../dto/update-template.dto';
import { TemplatesService } from '../services/templates.service';

@UseGuards(AuthenticateGuard)
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  create(
    @CurrentUser('id') userId: string,
    @Body()
    createTemplateDto: Omit<CreateTemplateDto, 'userId'>,
  ) {
    return this.templatesService.create({
      ...createTemplateDto,
      userId,
    });
  }

  @Get()
  async findAll(@CurrentUser('id') userId: string) {
    const templates = await this.templatesService.findAll(userId);

    return {
      data: templates,
      success: true,
    };
  }

  @Get(':templateId')
  async findOne(@Param('templateId') templateId: string) {
    const template = await this.templatesService.findOne(templateId);

    return {
      data: template,
      success: true,
    };
  }

  @Patch(':templateId')
  update(
    @Param('templateId') templateId: string,
    @Body() updateTemplateDto: UpdateTemplateDto,
  ) {
    return this.templatesService.update(templateId, updateTemplateDto);
  }

  @Delete(':templateId')
  async remove(@Param('templateId') templateId: string) {
    return await this.templatesService.remove(templateId);
  }
}
