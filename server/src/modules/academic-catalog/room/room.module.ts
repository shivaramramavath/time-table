import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomController } from './controllers/room.controller';
import { Room, RoomSchema } from './entities/room.entity';
import { RoomRepository } from './repository/room.repository';
import { RoomService } from './services/room.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Room.name,
        schema: RoomSchema,
      },
    ]),
  ],
  controllers: [RoomController],
  providers: [RoomService, RoomRepository],
  exports: [RoomService],
})
export class RoomModule {}
