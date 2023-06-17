import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./meesage.entity";
import { Member } from "./member.entity";
export type chatroomStatusType = "channel" | "Pv" | "Group";
@Entity("chatrooms")
export class Chatroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: chatroomStatusType;

  @Column({
    nullable: true,
  })
  title: string;

  @OneToMany((_) => Message, (message) => message.chatroom)
  messages: Message[];
  
  @OneToMany((_) => Member, (member) => member.chatroom)
  members: Member[];
}
