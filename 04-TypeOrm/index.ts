import { initializeDB, dataSource } from "./Db/dataSource";
import { User } from "./entities/user.entity";
async function run() {
  try {
    const dbInitilizeResult = await initializeDB();
    console.log(dbInitilizeResult);
    //#region Insert one user
    ////////////////////////////// With insert()

    // await dataSource.manager.insert(User,{
    //   name:"Abolfazl",
    //   phone:"09156278358",
    //   password:"1234"
    // });

    /////////////////////////////// With save()

    // const addNewUser = new User("Abolfazl","09156278358","1234");
    // await dataSource.manager.save(addNewUser);

    //#endregion
    //#region Insert multi user

    /////////////////////////////// With insert()

    // await dataSource.manager.insert(User,[{
    //   name:"Abolfazl",
    //   phone:"123456789",
    //   password:"1234"
    // },{
    //   name:"Ali",
    //   phone:"1234567890",
    //   password:"1234"
    // }]);

    /////////////////////////////// With save()

    // const NewUser1 = new User("Abolfazl","123456789","1234");
    // const NewUser2 = new User("Ali","1234567890","1234");
    // await dataSource.manager.save([NewUser1,NewUser2]);

    //#endregion
    //#region Update user
    /////////////////////////////// With update()

    // await dataSource.manager.update(
    //   User, //which entity
    //   { phone: "1234567890" }, //find user
    //   { name: "Ahmad" } //update desired properties
    // );

    /////////////////////////////// With save()

    // const user = await dataSource.manager.findOneBy(User,{phone:"1234567890"});
    // if(user)
    // user.name = "Ali";
    // await dataSource.manager.save(user);

    //#endregion
    //#region Update multi user
    /////////////////////////////// With update()

    // await dataSource.manager.update(
    //   User, //which entity
    //   {name:"Abolfazl"}, //find users
    //   { name: "Amir" } //update desired properties
    // );

    /////////////////////////////// With save()

    // const user = await dataSource.manager.findBy(User,{name:"Amir"});
    // if(user)
    // user[0].name = "Abolfazl";
    // await dataSource.manager.save(user);

    //#endregion
    //#region Delete one user
    /////////////////////////////// With update()

    // await dataSource.manager.delete(
    //   User, //which entity
    //   { phone: "1234567890" } //find user
    // );

    /////////////////////////////// With remove()

    // const user = await dataSource.manager.findOneBy(User,{phone:"09156278358"});
    // await dataSource.manager.remove(user);

    //#endregion
    //#region Delete multi user
    /////////////////////////////// With delete()

    // await dataSource.manager.delete(
    //   User, //which entity
    //   {password:"1234"}//find users
    // );

    /////////////////////////////// With remove()

    // const user = await dataSource.manager.findBy(User,{password:"1234"});
    // await dataSource.manager.remove(user);

    //#endregion
  } catch (err) {
    console.log("Catched Error : ", err);
  }
}
run();
