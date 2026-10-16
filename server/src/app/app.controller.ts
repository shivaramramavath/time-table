import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { Roles } from '../shared/common/decorators';
import { AuthenticateGuard } from '../shared/common/guards/authenticate.guard';
import { RolesGuard } from '../shared/common/guards/roles.guard';
import { AppService } from './app.service';

@ApiTags('App')
@ApiBearerAuth('access-token')
@Throttle({ default: { ttl: 60_000, limit: 5 } })
@UseGuards(AuthenticateGuard, RolesGuard)
@Roles('admin')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get the welcome message' })
  @ApiResponse({
    status: 200,
    description: 'Welcome message returned successfully',
    schema: {
      type: 'string',
      example: 'Hello World!',
    },
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @ApiOperation({
    summary: 'Get detailed application health information',
  })
  @ApiResponse({
    status: 200,
    description: 'Health information returned successfully',
  })
  getHealth() {
    return this.appService.getHealth();
  }
}
