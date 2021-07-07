import { RequestHandler } from "express";
import { Timetracking } from "../entity/timetracking.model";

type GetAllTimetrackingsResponse = Timetracking[];

type CreateTimetrackingResponse = {
  createdTimetracking: Timetracking;
};

type CreateTimetrackingRequestBody = Omit<Timetracking, "id">;

type UpdateTimetrackingResponse = {
  updatedTimetracking: Timetracking;
};
type UpdateTimetrackingRequestBody = Partial<Omit<Timetracking, "id">>;

export const getAllTimetrackings: RequestHandler<
  {},
  GetAllTimetrackingsResponse
> = async (req, res) => {
  res.send([]);
};
export const createTimetracking: RequestHandler<
  {},
  CreateTimetrackingResponse,
  CreateTimetrackingRequestBody
> = async (req, res) => {};

export const updateTimetracking: RequestHandler<
  { id: string },
  UpdateTimetrackingResponse,
  UpdateTimetrackingRequestBody
> = async (req, res) => {};

export const deleteTimetracking: RequestHandler<{ id: string }, {}> = async (
  req,
  res
) => {
  res.status(204).send({});
};
