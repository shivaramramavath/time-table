import { Message, MessageModel } from "./message.model.js";

export const messageRepository = {
  async create(message: Message) {
    return MessageModel.create(message);
  },

  async createMany(messages: Message[]) {
    return MessageModel.insertMany(messages);
  },

  async findById(id: string) {
    return MessageModel.findOne({
      id,
    }).lean();
  },
};
