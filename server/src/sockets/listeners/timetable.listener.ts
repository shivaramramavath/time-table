import type { Server, Socket } from "socket.io";

import { errors } from "#utils/errors.js";

import { asyncSocketHandler } from "../lib/async-socket-handler.js";
import { timetableService } from "#features/timetable/timetable.service.js";

export const registerTimetableListeners = (io: Server, socket: Socket) => {
  socket.on(
    "timetable:update",
    asyncSocketHandler("timetable:update", async (payload) => {
      const { timetableId, timetable } = payload;

      if (!timetableId) {
        throw errors.badRequest("Missing timetableId");
      }

      return await timetableService.update(
        timetableId,
        socket.data.user.userId,
        timetable,
      );
    }),
  );

  socket.on(
    "timetable:get",
    asyncSocketHandler("timetable:get", async (payload) => {
      const { timetableId } = payload;

      if (!timetableId) {
        throw errors.badRequest("Missing timetableId");
      }

      return await timetableService.get(timetableId, socket.data.user.userId);
    }),
  );

  socket.on(
    "timetable:generate",
    asyncSocketHandler("timetable:generate", async (payload) => {
      const { timetableId } = payload;

      if (!timetableId) {
        throw errors.badRequest("Missing timetableId");
      }

      return await timetableService.generate({
        timetableId,
        userId: socket.data.user.userId,
      });
    }),
  );
};
