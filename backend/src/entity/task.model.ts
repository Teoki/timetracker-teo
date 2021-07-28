import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import * as yup from "yup";

interface TaskInitProps {
  name: string;
  description: string;
  //createdAt: Date;
  //updatedAt: Date;
}

export const taskSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  //createdAt: yup.date().required(),
  //updatedAt: yup.date().required(),
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
