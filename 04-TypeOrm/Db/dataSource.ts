import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";
import { Chatroom } from "../entities/chatroom.entity";
import { Message } from "../entities/meesage.entity";
import { Member } from "../entities/member.entity";
import { Image } from "../entities/image.entity";
const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  database: "messenger",
  port: 5432,
  username: "postgres",
  password: "postgress",
  synchronize: true,
  logging: true,
  entities: [User, Chatroom, Message, Member, Image],
  // options: {
  //   encrypt: false,
  // },
});
function initializeDB() {
  return new Promise((res, rej) => {
    dataSource
      .initialize()
      .then(() => res("Database initialized"))
      .catch((err) => {
        rej(`${err.message} \nOccured On Database Initilizing`);
      });
  });
}
export  {initializeDB , dataSource};
