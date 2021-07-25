import { RequestHandler } from "express";
import { Task } from "../entity/task.model";

type GetAllTasksResponseBody = {
  tasks: Task[];
};

type GetTaskResponseBody = {
  task: Task;
};

type CreateTaskResponseBody = {
  createdTask: Task;
};

type CreateTaskRequestBody = Omit<Task, "id">;

type UpdateTaskResponseBody = {
  createdTask: Task;
};

type UpdateTaskRequestBody = Partial<Omit<Task, "id">>;

export const getAllTasks: RequestHandler<{}, GetAllTasksResponseBody> = (
  req,
  res
) => {
  console.log("Get All Tasks");
  res.send();
};
export const getTask: RequestHandler<{ id: string }, GetTaskResponseBody> = (
  req,
  res
) => {};
export const updateTask: RequestHandler<
  { id: string },
  UpdateTaskResponseBody,
  UpdateTaskRequestBody
> = (req, res) => {};
export const createTask: RequestHandler<
  {},
  CreateTaskResponseBody,
  CreateTaskRequestBody
> = (req, res) => {};
export const deleteTask: RequestHandler<{ id: string }, {}> = (req, res) => {};
