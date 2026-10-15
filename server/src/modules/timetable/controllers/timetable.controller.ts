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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUser } from '../../../shared/common/decorators';
import { AuthenticateGuard } from '../../../shared/common/guards/authenticate.guard';
import { CreateTimetableDto } from '../dto/create-timetable.dto';
import { UpdateTimetableDto } from '../dto/update-timetable.dto';
import { TimetableService } from '../services/timetable.service';

@ApiTags('Timetable')
@ApiBearerAuth('access-token')
@UseGuards(AuthenticateGuard)
@Controller('timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Post()
  @ApiOperation({ summary: 'Create a timetable' })
  @ApiResponse({ status: 201, description: 'Timetable created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @CurrentUser('id') userId: string,
    @Body() createTimetableDto: Omit<CreateTimetableDto, 'userId'>,
  ) {
    const timetable = await this.timetableService.create({
      ...createTimetableDto,
      userId,
    });

    return { data: timetable, success: true };
  }

  @Get()
  @ApiOperation({ summary: 'Get all timetables belonging to the current user' })
  @ApiResponse({
    status: 200,
    description: 'Timetables retrieved successfully',
  })
  async findMany(@CurrentUser('id') userId: string) {
    const timetables = await this.timetableService.findMany(userId);

    return { data: timetables, success: true };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a timetable by ID' })
  @ApiResponse({ status: 200, description: 'Timetable retrieved successfully' })
  async findOne(@Param('id') id: string) {
    const timetable = await this.timetableService.findOne(id);

    return { data: timetable, success: true };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a timetable' })
  @ApiResponse({ status: 200, description: 'Timetable updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() updateTimetableDto: UpdateTimetableDto,
  ) {
    const timetable = await this.timetableService.update(
      id,
      updateTimetableDto,
    );

    return { data: timetable, success: true };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a timetable' })
  @ApiResponse({ status: 200, description: 'Timetable deleted successfully' })
  async remove(@Param('id') id: string) {
    const timetable = await this.timetableService.remove(id);

    return { data: timetable, success: true };
  }
}
