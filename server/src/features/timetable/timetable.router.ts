import express from "express";
import { timetableController } from "./timetable.controller.js";

export const timetableRouter = express.Router();

timetableRouter.post("/", timetableController.create);

timetableRouter.get("/", timetableController.getTimetables);

timetableRouter.get("/recent", timetableController.getRecentTimetables);

timetableRouter.get("/:timetableId", timetableController.get);

timetableRouter.patch("/:timetableId", timetableController.update);

timetableRouter.delete("/:timetableId", timetableController.delete);
