import { Router } from "express";
import {
  createLabel,
  deleteLabel,
  getAllLabels,
} from "../controller/label.controller";

export const labelRouter = Router({ mergeParams: true });
labelRouter.get("/", getAllLabels);
labelRouter.post("/", createLabel);
labelRouter.delete("/:id", deleteLabel);
