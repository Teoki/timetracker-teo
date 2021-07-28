import { RequestHandler } from "express";
import { Task, taskSchema } from "../entity/task.model";
import { getRepository } from "typeorm";

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
    const repository = await getRepository(Task);
    const tasks = repository.find({});
    console.log("GRÖßE VOM REPO: " + repository.find({ relations: ["task"] }));
    console.log(tasks);
    console.log("called getAllTasks");
    //res.send(tasks);
  };
export const getTask: RequestHandler<{ id: string }, GetTaskResponseBody> =
  async (req, res) => {
    console.log("GET TASK CALLED id: " + req.params.id);
    const taskRepository = await getRepository(Task);
    const task = await taskRepository.findOne(req.params.id);
    if (task !== undefined){
      res.send({ task: task });
    } else {
      console.log("NO TASK FOUND id: " + req.params.id);
      res.sendStatus(400);
    }
  };
export const updateTask: RequestHandler<
  { id: string },
  UpdateTaskResponseBody,
  UpdateTaskRequestBody
> = async (req, res) => {
  const repository = await getRepository(Task);
  await repository.update(req.params.id, req.body.updateTask);
  const updatedTask = await repository.findOneOrFail(req.params.id);
  res.send({ updatedTask: updatedTask });
};

export const createTask: RequestHandler<
  CreateTaskRequestBody,
  CreateTaskResponseBody
> = async (req, res) => {
  const taskRepository = await getRepository(Task);
  console.log("called createTask");
  console.log("req.body = " + req.body.task);

  try {
    const validateBody = await taskSchema.validate(req.body.task);
    const validTask = Task.create(validateBody);
    //const task = Task.create(req.body.task);
    const countHasTaskWithName = await taskRepository.count({
      name: validTask.name,
    });
    if (countHasTaskWithName > 0) {
      console.log("ICH HABE RICHTIG GEZÄHLT");
      throw new Error();
    }
    const savedTask = await taskRepository.save(validTask);
    console.log("SAVED new Task (in createTask)");
    res.send({ createdTask: savedTask });
  } catch (e) {
    console.log("NAME EXISTIERT BEREITS" + e.message);
    res.sendStatus(400);
  }
};

export const deleteTask: RequestHandler<{ id: string }, string> = async (
  req,
  res
) => {
  const repository = await getRepository(Task);
  const foundTask = repository.findOneOrFail(req.params.id);
  if (foundTask.catch()) {
    console.error("KEINE ID ZUM LÖSCHEN GEFUNDEN");
    res.send("There is no Task to delete with the id: " + req.params.id);
  }
  console.log("ID GEFUNDEN");
  repository.delete(req.params.id);
  res.sendStatus(res.statusCode);
};
