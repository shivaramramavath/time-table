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
import { CreateTimetableDto } from '../dto/create-timetable.dto';
import { UpdateTimetableDto } from '../dto/update-timetable.dto';
import { TimetableService } from '../services/timetable.service';

@UseGuards(AuthenticateGuard)
@Controller('timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Body() createTimetableDto: Omit<CreateTimetableDto, 'userId'>,
  ) {
    const timetable = await this.timetableService.create({
      ...createTimetableDto,
      userId,
    });

    return {
      data: timetable,
      success: true,
    };
  }

  @Get()
  async findMany(@CurrentUser('id') userId: string) {
    const timetables = await this.timetableService.findMany(userId);

    return {
      data: timetables,
      success: true,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const timetable = await this.timetableService.findOne(id);

    return {
      data: timetable,
      success: true,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTimetableDto: UpdateTimetableDto,
  ) {
    const timetable = await this.timetableService.update(
      id,
      updateTimetableDto,
    );

    return {
      data: timetable,
      success: true,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const timetable = await this.timetableService.remove(id);

    return {
      data: timetable,
      success: true,
    };
  }
}
