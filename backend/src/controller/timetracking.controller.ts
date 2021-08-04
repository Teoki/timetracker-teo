import { RequestHandler } from "express";
import { Timetracking, timetrackingSchema } from "../entity/timetracking.model";
import { getRepository } from "typeorm";
import { ValidationError } from "yup";

type GetAllTimetrackingsResponseBody = {
  timetrackings: Timetracking[];
};

type GetTimetrackingResponseBody = {
  timetracking: Timetracking;
};

type CreateTimetrackingResponseBody = {
  createdTimetracking: Timetracking;
};

type CreateTimetrackingRequestBody = {
  timetracking: Omit<Timetracking, "id">;
};

type UpdateTimetrackingResponseBody = {
  updatedTimetracking: Timetracking;
};

type UpdateTimetrackingRequestBody = {
  updateTimetracking: Partial<Omit<Timetracking, "id">>;
};

export const getAllTimetrackings: RequestHandler<void, GetAllTimetrackingsResponseBody> =
    async (req, res) => {
  try {
    const repository = await getRepository(Timetracking);
    const timetrackings: Timetracking[] = await repository.find();
    res.send({ timetrackings: timetrackings });
  } catch (e) {
    console.log("[GET ALL TIMETRACKINGS: ERROR] " + e.message);
    res.sendStatus(500);
  }
};

export const getTimetracking: RequestHandler<{ id: string }, GetTimetrackingResponseBody> =
    async (req, res) => {
  try {
    const repository = await getRepository(Timetracking);
    const timetracking = await repository.findOneOrFail(req.params.id);
    console.log("[GET TIMETRACKING: SUCCESS] found timetracking in db");
    res.send({ timetracking: timetracking });
  } catch (e) {
    console.log("[GET TIMETRACKING: ERROR] " + e.message);
    res.sendStatus(400);
  }
};

export const updateTimetracking: RequestHandler<{ id: string }, UpdateTimetrackingResponseBody, UpdateTimetrackingRequestBody> =
    async (req, res) => {
  try {
    const repository = await getRepository(Timetracking);
    const timetracking = await repository.findOneOrFail(req.params.id);
    await repository.update(req.params.id, req.body.updateTimetracking);
    console.log("[UPDATE TIMETRACKING: SUCCESS] updated timetracking in db");
    res.send({ updatedTimetracking: timetracking }); //TODO lieber status 200? (falls nicht nötig im frontend)
  } catch (e) {
    if (e instanceof ValidationError) {
      console.log("[UPDATE TIMETRACKING: ERROR] " + e);
      res.sendStatus(400);
      return;
    }
    console.log("[UPDATE TIMETRACKING: ERROR] " + e.message);
    res.sendStatus(500);
  }
};

export const createTimetracking: RequestHandler<CreateTimetrackingRequestBody, CreateTimetrackingResponseBody> =
    async (req, res) => {
  try {
    const repository = await getRepository(Timetracking);
    const validRequestBody = await timetrackingSchema.validate(req.body.timetracking);
    const createdTimetracking = await Timetracking.create(validRequestBody); //TODO await nicht nötig?
    const savedTimetracking = await repository.save(createdTimetracking);
    console.log("[CREATE TIMETRACKING: SUCCESS] saved new timetracking in db");
    res.send({ createdTimetracking: savedTimetracking }); //TODO status 200 lieber returnen? (falls nicht nötig im frontend)
  } catch (e) {
    if (e instanceof ValidationError) {
      console.log("[CREATE TIMETRACKING: ERROR] " + e);
      res.sendStatus(400);
      return;
    }
    console.log("[CREATE TIMETRACKING: ERROR] " + e);
    res.sendStatus(500);
  }
};

export const deleteTimetracking: RequestHandler<{ id: string }, string> =
  async (req, res) => {
    try {
      const repository = await getRepository(Timetracking);
      await repository.findOneOrFail(req.params.id);
      repository.delete(req.params.id);
      console.log("[DELETE TIMETRACKING: SUCCESS] deleted timetracking with given id");
      res.status(200).send("[DELETE TIMETRACKING: SUCCESS] deleted timetracking with the id: " + req.params.id);
    } catch (e) {
      console.log("[DELETE TIMETRACKING: ERROR] could not find timetracking with given id in db");
      res.status(400).send("[DELETE TIMETRACKING: ERROR] there is no timetracking to delete with the id: " + req.params.id);
      return;
    }
};
