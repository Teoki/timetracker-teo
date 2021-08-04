import { RequestHandler } from "express";
import { Task, taskSchema } from "../entity/task.model";
import { getRepository } from "typeorm";
import { ValidationError } from "yup";

type GetAllTasksResponseBody = {
  tasks: Task[];
};

type GetTaskResponseBody = {
  task: Task;
};

type CreateTaskResponseBody = {
  createdTask: Task;
};

type CreateTaskRequestBody = {
  task: Omit<Task, "id">;
};

type UpdateTaskResponseBody = {
  updatedTask: Task;
};

type UpdateTaskRequestBody = {
  updateTask: Partial<Omit<Task, "id">>;
};

export const getAllTasks: RequestHandler<void, GetAllTasksResponseBody> =
  async (req, res) => {
    try {
      const repository = await getRepository(Task);
      const tasks: Task[] = await repository.find();
      res.send({ tasks: tasks });
    } catch (e) {
      console.log("[GET ALL TASKS: ERROR] " + e.message);
      res.sendStatus(500);
    }
  };

export const getTask: RequestHandler<{ id: string }, GetTaskResponseBody> =
  async (req, res) => {
    try {
      const repository = await getRepository(Task);
      const task = await repository.findOneOrFail(req.params.id);
      console.log("[GET TASK: SUCCESS] found task in db");
      res.send({ task: task });
    } catch (e) {
      console.log("[GET TASK: ERROR] " + e.message);
      res.sendStatus(400);
    }
  };

export const updateTask: RequestHandler<{ id: string }, UpdateTaskResponseBody, UpdateTaskRequestBody> =
    async (req, res) => {
  try {
    const repository = await getRepository(Task);
    const task = await repository.findOneOrFail(req.params.id);
    await repository.update(req.params.id, req.body.updateTask);
    console.log("[UPDATE TASK: SUCCESS] updated task in db");
    res.send({ updatedTask: task }); //TODO lieber status 200? (falls nicht nötig im frontend)
  } catch (e) {
    if (e instanceof ValidationError) {
      console.log("[UPDATE TASK: ERROR] " + e);
      res.sendStatus(400);
      return;
    }
    console.log("[UPDATE TASK: ERROR] " + e.message);
    res.sendStatus(500);
  }
};

export const createTask: RequestHandler<CreateTaskRequestBody, CreateTaskResponseBody> =
    async (req, res) => {
  try {
    const repository = await getRepository(Task);
    const validRequestBody = await taskSchema.validate(req.body.task);
    const createdTask = await Task.create(validRequestBody); //TODO await nicht nötig?
    const countHasTaskWithName = await repository.count({
      name: createdTask.name,
    });
    if (countHasTaskWithName > 0) {
      console.log("[CREATE TASK: ERROR] name already exists");
      res.sendStatus(400);
      return;
    }
    const savedTask = await repository.save(createdTask);
    console.log("[CREATE TASK: SUCCESS] saved new task in db");
    res.send({ createdTask: savedTask }); //TODO status 200 lieber returnen? (falls nicht nötig im frontend)
  } catch (e) {
    if (e instanceof ValidationError) {
      console.log("[CREATE TASK: ERROR] " + e);
      res.sendStatus(400);
      return;
    }
    console.log("[CREATE TASK: ERROR] " + e);
    res.sendStatus(500);
  }
};

export const deleteTask: RequestHandler<{ id: string }, string> =
    async (req, res) => {
  try {
    const repository = await getRepository(Task);
    await repository.findOneOrFail(req.params.id);
    repository.delete(req.params.id);
    console.log("[DELETE TASK: SUCCESS] deleted task with given id");
    res.status(200).send("[DELETE TASK: SUCCESS] deleted task with the id: " + req.params.id);
  } catch (e) {
    console.log("[DELETE TASK: ERROR] could not find task with given id in db");
    res.status(400).send("[DELETE TASK: ERROR] there is no task to delete with the id: " + req.params.id);
    return;
  }
};
