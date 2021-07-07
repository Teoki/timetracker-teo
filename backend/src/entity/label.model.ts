import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as yup from "yup";

export const labelSchema = yup.object().shape({
  name: yup.string().required(),
  //....
});

@Entity()
export class Label {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;
  //....
}
