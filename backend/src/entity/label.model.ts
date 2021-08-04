import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import * as yup from "yup";
import { Task } from "./task.model";

interface LabelInitProps {
  name: string;
}

export const labelSchema = yup.object().shape({
  name: yup.string().required(),
});

@Entity()
export class Label {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

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

  @ManyToMany(() => Task, (task) => task.labelList)
  @JoinTable()
  taskList!: Task[];

  static create(props: LabelInitProps): Label {
    const label = new Label();
    const current_timestamp = new Date();
    label.name = props.name;
    label.createdAt = current_timestamp;
    label.updatedAt = current_timestamp;
    return label;
  }
}
