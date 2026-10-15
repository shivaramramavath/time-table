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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUser } from '../../../shared/common/decorators';
import { AuthenticateGuard } from '../../../shared/common/guards/authenticate.guard';
import { CreateTemplateDto } from '../dto/create-template.dto';
import { UpdateTemplateDto } from '../dto/update-template.dto';
import { TemplatesService } from '../services/templates.service';

@ApiTags('Templates')
@ApiBearerAuth('access-token')
@UseGuards(AuthenticateGuard)
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a template for the authenticated user' })
  @ApiResponse({ status: 201, description: 'Template created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid template data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @CurrentUser('id') userId: string,
    @Body() createTemplateDto: Omit<CreateTemplateDto, 'userId'>,
  ) {
    return this.templatesService.create({
      ...createTemplateDto,
      userId,
    });
  }

  @Get()
  @ApiOperation({
    summary: 'Get all templates belonging to the authenticated user',
  })
  @ApiResponse({ status: 200, description: 'Templates retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@CurrentUser('id') userId: string) {
    const templates = await this.templatesService.findAll(userId);

    return {
      data: templates,
      success: true,
    };
  }

  @Get(':templateId')
  @ApiOperation({ summary: 'Get a template by ID' })
  @ApiParam({
    name: 'templateId',
    description: 'MongoDB ObjectId of the template',
    type: String,
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({ status: 200, description: 'Template retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  async findOne(@Param('templateId') templateId: string) {
    const template = await this.templatesService.findOne(templateId);

    return {
      data: template,
      success: true,
    };
  }

  @Patch(':templateId')
  @ApiOperation({ summary: 'Update a template' })
  @ApiParam({
    name: 'templateId',
    description: 'MongoDB ObjectId of the template',
    type: String,
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({ status: 200, description: 'Template updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid template data' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  update(
    @Param('templateId') templateId: string,
    @Body() updateTemplateDto: UpdateTemplateDto,
  ) {
    return this.templatesService.update(templateId, updateTemplateDto);
  }

  @Delete(':templateId')
  @ApiOperation({ summary: 'Delete a template' })
  @ApiParam({
    name: 'templateId',
    description: 'MongoDB ObjectId of the template',
    type: String,
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({ status: 200, description: 'Template deleted successfully' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  async remove(@Param('templateId') templateId: string) {
    return this.templatesService.remove(templateId);
  }
}
