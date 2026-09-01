import { PAGE_SIZE } from "#configs/constants.js";

import { MessageModel, type Message } from "./message.model.js";

export const messageRepository = {
  async create(message: Message) {
    return MessageModel.create(message);
  },

  async createMany(messages: Message[]) {
    return MessageModel.insertMany(messages);
  },

  async findById(id: string) {
    return MessageModel.findOne({ id }).lean();
  },

  async findAll(designerId: string) {
    return MessageModel.find({ designerId }).sort({ createdAt: 1 }).lean();
  },

  async count(designerId: string) {
    return MessageModel.countDocuments({ designerId });
  },
};
