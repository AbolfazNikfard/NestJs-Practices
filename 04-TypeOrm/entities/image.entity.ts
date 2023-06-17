import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("images")
export class Image {
  @PrimaryColumn()
  url: string;

  @JoinColumn()
  @OneToOne((_) => User)
  user: number;
}
