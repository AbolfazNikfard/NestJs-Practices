import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { Chatroom } from "./chatroom.entity";

@Entity("members")
export class Member {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  chatroomId: number;

  @ManyToOne((_) => User, (user) => user.members)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne((_) => Chatroom, (chatroom) => chatroom.members)
  @JoinColumn({ name: "chatroomId" })
  chatroom: Chatroom;
}
