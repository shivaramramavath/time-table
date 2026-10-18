import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUser } from '../../../../shared/common/decorators';
import { AuthenticateGuard } from '../../../../shared/common/guards/authenticate.guard';
import { CreateRoomDto } from '../dto/create-room.dto';
import { RoomQueryDto } from '../dto/query-room.dto';
import { UpdateRoomDto } from '../dto/update-room.dto';
import { RoomService } from '../services/room.service';

@ApiTags('Rooms')
@ApiBearerAuth('access-token')
@UseGuards(AuthenticateGuard)
@Controller('academic-catalog/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new room' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Room created successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid room data',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Room code already exists',
  })
  async create(
    @CurrentUser('id') userId: string,
    @Body() createRoomDto: CreateRoomDto,
  ) {
    const room = await this.roomService.create(userId, createRoomDto);

    return {
      success: true,
      data: room,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a room by ID' })
  @ApiParam({
    name: 'id',
    description: 'MongoDB ObjectId of the room',
    example: '671a12345678901234567890',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Room retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Room not found',
  })
  async getById(@Param('id') roomId: string) {
    const room = await this.roomService.getById(roomId);

    return {
      success: true,
      data: room,
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Get rooms with filtering, sorting, and pagination',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rooms retrieved successfully',
  })
  async getAll(@Query() query: RoomQueryDto) {
    const result = await this.roomService.getAll(query);

    return {
      success: true,
      ...result,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a room by ID' })
  @ApiParam({
    name: 'id',
    description: 'MongoDB ObjectId of the room',
    example: '671a12345678901234567890',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Room updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid room data or ID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Room not found',
  })
  async update(
    @Param('id') roomId: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    const room = await this.roomService.update(roomId, updateRoomDto);

    return {
      success: true,
      data: room,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a room by ID' })
  @ApiParam({
    name: 'id',
    description: 'MongoDB ObjectId of the room',
    example: '671a12345678901234567890',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Room deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Room not found',
  })
  async delete(@Param('id') roomId: string) {
    const room = await this.roomService.delete(roomId);

    return {
      success: true,
      data: room,
    };
  }
}
