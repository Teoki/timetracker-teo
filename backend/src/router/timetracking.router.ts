import { NextFunction, RequestHandler, Router } from "express";
import {
  createTimetracking,
  getAllTimetrackings,
  deleteTimetracking,
  updateTimetracking,
} from "../controller/timetracking.controller";

export const timetrackingRouter = Router({ mergeParams: true });

timetrackingRouter.get("/", getAllTimetrackings);
timetrackingRouter.post("/", createTimetracking);
timetrackingRouter.put("/:id", updateTimetracking);
timetrackingRouter.delete("/:id", deleteTimetracking);
