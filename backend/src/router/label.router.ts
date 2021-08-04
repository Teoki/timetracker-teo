import { Router } from "express";
import {
  getLabel,
  createLabel,
  deleteLabel,
  getAllLabels,
  updateLabel,
} from "../controller/label.controller";

export const labelRouter = Router({ mergeParams: true });

labelRouter.get("/", getAllLabels);
labelRouter.get("/:id", getLabel);
labelRouter.post("/", createLabel);
labelRouter.delete("/:id", deleteLabel);
labelRouter.put("/:id", updateLabel);
