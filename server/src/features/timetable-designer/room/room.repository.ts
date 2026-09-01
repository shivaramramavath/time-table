import { RoomModel, type Room } from "./room.model.js";

export const roomRepository = {
  findById: async (designerId: string, id: string): Promise<Room | null> => {
    return RoomModel.findOne({
      designerId,
      id,
    })
      .lean()
      .exec();
  },

  findAll: async (designerId: string): Promise<Room[]> => {
    return RoomModel.find({
      designerId,
    })
      .sort({ roomNumber: 1 })
      .lean()
      .exec();
  },

  findByRoomNumber: async (
    designerId: string,
    roomNumber: string,
  ): Promise<Room | null> => {
    return RoomModel.findOne({
      designerId,
      roomNumber,
    })
      .lean()
      .exec();
  },

  create: async (room: Room): Promise<Room> => {
    const document = await RoomModel.create(room);

    return document.toObject();
  },

  createMany: async (rooms: Room[]): Promise<Room[]> => {
    return RoomModel.insertMany(rooms);
  },

  update: async (
    designerId: string,
    id: string,
    data: Partial<Room>,
  ): Promise<Room | null> => {
    return RoomModel.findOneAndUpdate(
      {
        designerId,
        id,
      },
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
      },
    )
      .lean()
      .exec();
  },

  delete: async (designerId: string, id: string): Promise<boolean> => {
    const result = await RoomModel.deleteOne({
      designerId,
      id,
    });

    return result.deletedCount > 0;
  },

  deleteMany: async (designerId: string, ids: string[]): Promise<number> => {
    if (ids.length === 0) {
      return 0;
    }

    const result = await RoomModel.deleteMany({
      designerId,
      id: {
        $in: ids,
      },
    });

    return result.deletedCount;
  },
};
