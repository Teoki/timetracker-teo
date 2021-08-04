import { RequestHandler } from "express";
import { Label, labelSchema } from "../entity/label.model";
import { getRepository } from "typeorm";
import {ValidationError} from "yup";

type GetAllLabelsResponseBody = {
  labels: Label[];
};

type GetLabelResponseBody = {
  label: Label;
};

type CreateLabelResponseBody = {
  createdLabel: Label;
};

type CreateLabelRequestBody = {
  label: Omit<Label, "id">;
};

type UpdateLabelResponseBody = {
  updatedLabel: Label;
};

type UpdateLabelRequestBody = {
  updateLabel: Partial<Omit<Label, "id">>;
};

export const getAllLabels: RequestHandler<void, GetAllLabelsResponseBody> =
  async (req, res) => {
    try {
      const repository = await getRepository(Label);
      const labels: Label[] = await repository.find();
      res.send({ labels: labels });
    } catch (e) {
      console.log("[GET ALL LABELS: ERROR] " + e.message);
      res.sendStatus(500);
    }
  };

export const getLabel: RequestHandler<{ id: string }, GetLabelResponseBody> =
  async (req, res) => {
    try {
      const repository = await getRepository(Label);
      const label = await repository.findOneOrFail(req.params.id);
      console.log("[GET LABEL: SUCCESS] found label in db");
      res.send({ label: label });
    } catch (e) {
      console.log("[GET LABEL: ERROR] " + e.message);
      res.sendStatus(400);
    }
  };

export const createLabel: RequestHandler<
  CreateLabelRequestBody,
  CreateLabelResponseBody
> = async (req, res) => {
  try {
    const repository = await getRepository(Label);
    const validRequestBody = await labelSchema.validate(req.body.label);
    const createdLabel = await Label.create(validRequestBody);
    const countHasLabelWithName = await repository.count({
      name: createdLabel.name,
    });
    if (countHasLabelWithName > 0) {
      console.log("[CREATE LABEL: ERROR] name already exists");
      res.sendStatus(400);
      return;
    }
    const savedLabel = await repository.save(createdLabel);
    console.log("[CREATE LABEL: SUCCESS] saved new label in db");
    res.send({ createdLabel: savedLabel }); //TODO status 200 senden, falls nicht nötig im frontend
  } catch (e) {
    if (e instanceof ValidationError) {
      console.log("[CREATE LABEL: ERROR] " + e);
      res.sendStatus(400);
      return;
    }
    console.log("[CREATE LABEL: ERROR] " + e.message);
    res.sendStatus(500);
  }
};

export const deleteLabel: RequestHandler<{ id: string }, string> = async (
  req,
  res
) => {
  try {
    const repository = await getRepository(Label);
    await repository.findOneOrFail(req.params.id);
    repository.delete(req.params.id);
    console.log("[DELETE LABEL: SUCCESS] deleted label with given id");
    res
      .status(200)
      .send(
        "[DELETE LABEL: SUCCESS] deleted label with the id: " + req.params.id
      );
  } catch (e) {
    console.log("[DELETE LABEL: ERROR] could not find label with given id");
    res
      .status(400)
      .send(
        "[DELETE LABEL: ERROR] there is no label to delete with the id: " +
          req.params.id
      );
    return;
  }
};

export const updateLabel: RequestHandler<
  { id: string },
  UpdateLabelResponseBody,
  UpdateLabelRequestBody
> = async (req, res) => {
  try {
    const repository = await getRepository(Label);
    const label = await repository.findOneOrFail(req.params.id);
    await repository.update(req.params.id, req.body.updateLabel); //TODO updatedAt Zeit wird 2 stunden zurück angezeigt, zb anstatt 18:32 steht da 16:32, bei CREATE passt alles aber
    console.log("[UPDATE LABEL: SUCCESS] updated label in db");
    res.send({ updatedLabel: label }); //TODO oder status 200 falls nicht nötig im frontend
  } catch (e) {
    console.log("[UPDATE LABEL: ERROR] " + e);
    res.sendStatus(400);
  }
};
