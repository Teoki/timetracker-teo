import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as yup from "yup";

export const timetrackingSchema = yup.object().shape({
  startTime: yup.date().required(),
  endTime: yup.date().required(),
  //....
});

@Entity()
export class Timetracking {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "date" })
  startTime!: Date;

  @Column({ type: "date" })
  endTime!: Date;
  //...
}
