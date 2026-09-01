import { emitAsync } from "@/shared/socket/emit-async";
import type { Message } from "../../types";

type GetProps = {
  designerId: string;
  page?: number;
};

type GetResult = {
  messages: Message[];
  page: number;
  pageSize: number;
  hasMore: boolean;
};

export const messageSocket = {
  send: (message: Message) => {
    return emitAsync<Message>("message:send", {
      message,
    });
  },

  get: ({ designerId, page = 1 }: GetProps): Promise<GetResult> => {
    return emitAsync("message:get", {
      designerId,
      page,
    });
  },
};
