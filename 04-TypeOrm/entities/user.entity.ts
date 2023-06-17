import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./meesage.entity";
import { Member } from "./member.entity";

@Entity("users")
export class User {
  constructor(name:string,phone:string,password:string){
    this.name = name,
    this.phone = phone,
    this.password = password
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  phone: string;

  @Column()
  password: string;

  @OneToMany((_) => Message, (message) => message.user)
  messages: Message[];

  @OneToMany((_) => Member, (member) => member.user)
  members: Member[];
}
