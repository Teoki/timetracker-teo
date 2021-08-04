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
    timetracking.startTime = Timetracking.updateStartTimeOfTimetracking(); //TODO --> Daten von frontend, LIEBER MIT "UPDATE"?
    timetracking.endTime = Timetracking.updateEndTimeOfTimetracking(); //TODO --> Daten von frontend, LIEBER MIT "UPDATE"?
    return timetracking;
  }

  //TODO MOCK --> im frontend zählen und diese methode im frontend erstellen, aus dem frontend nur ein "update" aufrufen, bei "start" button klick und dann in der DB startTime updaten
  private static updateStartTimeOfTimetracking() {
    return new Date();
  }

  //TODO MOCK --> im frontend zählen und diese methode im frontend erstellen
  private static updateEndTimeOfTimetracking() {
    return new Date();
  }
}
