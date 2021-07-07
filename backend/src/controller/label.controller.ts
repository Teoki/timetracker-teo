import { RequestHandler } from "express";
import { Label } from "../entity/label.model";

type GetAllLabelsResponse = Label[];

type CreateLabelRequestBody = {
  name: string;
};
type CreateLabelResponseBody = {
  createdLabel: Label;
};

export const getAllLabels: RequestHandler<{}, GetAllLabelsResponse> = (
  req,
  res
) => {};
export const createLabel: RequestHandler<
  {},
  CreateLabelResponseBody,
  CreateLabelRequestBody
> = (req, res) => {};
export const deleteLabel: RequestHandler<{ id: string }, {}> = (req, res) => {
  res.status(204);
};
