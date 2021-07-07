import { Router } from "express";
import { timetrackingRouter } from "./timetracking.router";
import { taskRouter } from "./task.router";
import { labelRouter } from "./label.router";

export const globalRouter = Router({ mergeParams: true });

interface HelloWorldReponse {
  message: string;
}
globalRouter.get("/", (req, res) => {
  res.send({ message: "hello world global" } as HelloWorldReponse);
});

globalRouter.use("/timetracking", timetrackingRouter);
globalRouter.use("/task", taskRouter);
globalRouter.use("/label", labelRouter);
