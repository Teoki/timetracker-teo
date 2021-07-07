import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controller/task.controller";

export const taskRouter = Router({ mergeParams: true });

taskRouter.get("/", getAllTasks);
taskRouter.get("/:id", getTask);
taskRouter.post("/", createTask);
taskRouter.delete("/:id", deleteTask);
taskRouter.put("/:id", updateTask);
