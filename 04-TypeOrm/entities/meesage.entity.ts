import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn,} from "typeorm";
import { User } from "./user.entity";
import { Chatroom } from "./chatroom.entity";
@Entity("messages")
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((_) => User, (user) => user.messages)
  user: User;
  
  @ManyToOne((_) => Chatroom, (chatroom) => chatroom.messages)
  chatroom: Chatroom;
}
