import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import * as yup from "yup";
import { Label } from "./label.model";
import { Timetracking } from "./timetracking.model";

interface TaskInitProps {
  name: string;
  description: string;
}

export const taskSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
});

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

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

  @ManyToMany(() => Label, (label) => label.tasks)
  @JoinTable()
  labels!: Label[];

  @OneToMany(() => Timetracking, (timetracking) => timetracking.task)
  timetrackings!: Timetracking[];

  static create(props: TaskInitProps): Task {
    const task = new Task();
    const current_timestamp = new Date();
    task.name = props.name;
    task.description = props.description;
    task.createdAt = current_timestamp;
    task.updatedAt = current_timestamp;
    return task;
  }
}
