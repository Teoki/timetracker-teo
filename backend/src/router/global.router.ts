import { Router } from "express";
import { timetrackingRouter } from "./timetracking.router";
import { taskRouter } from "./task.router";
import { labelRouter } from "./label.router";

export const globalRouter = Router({ mergeParams: true });

interface Welcome {
  message: string;
}
globalRouter.get("/", (req, res) => {
  res.send({ message: "Welcome to Time Tracker App!" } as Welcome);
});

globalRouter.use("/timetracking", timetrackingRouter);
globalRouter.use("/task", taskRouter);
globalRouter.use("/label", labelRouter);
