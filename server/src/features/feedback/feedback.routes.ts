import express from "express";
import { feedbackController } from "./feedback.controller.js";

export const feedbackRouter = express.Router();

feedbackRouter.post("/create", feedbackController.create);
