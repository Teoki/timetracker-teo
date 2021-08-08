import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import * as yup from "yup";
import { Task } from "./task.model";

interface TimetrackingInitProps {
  description: string;
}

export const timetrackingSchema = yup.object().shape({
  description: yup.string().required(),
});

@Entity()
export class Timetracking {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  description!: string;

  @UpdateDateColumn({ type: "timestamp" })
  startTime!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  endTime!: Date;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt!: Date;

  @JoinColumn()
  @ManyToOne(() => Task, (task) => task.timetrackings)
  task!: Task;

  static create(props: TimetrackingInitProps): Timetracking {
    const timetracking = new Timetracking();
    const current_timestamp = new Date();
    timetracking.description = props.description;
    timetracking.createdAt = current_timestamp;
    timetracking.updatedAt = current_timestamp;
    timetracking.startTime = Timetracking.updateStartTimeOfTimetracking(); //TODO data comes from frontend, update it from there
    timetracking.endTime = Timetracking.updateEndTimeOfTimetracking(); //TODO data comes from frontend, update it from there
    return timetracking;
  }

  //this is a mock-method, so it's possible to create Timetrackings
  //TODO in the future, send a "PUT"-HTTP request from the frontend and update the startTime in DB as soon as the user clicks "start Timetracking"
  private static updateStartTimeOfTimetracking() {
    return new Date();
  }

  //this is a mock-method, so it's possible to create Timetrackings
  //TODO in the future, send a "PUT"-HTTP request from the frontend and update the endTime in DB as soon as the user clicks "stop Timetracking"
  private static updateEndTimeOfTimetracking() {
    return new Date();
  }
}
