const callMap: Map<string, number> = new Map();
function callLimit(Time: number) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log("Decorator => callLimit");
    console.log("target: ", target.name);
    console.log("propertyKey: ", propertyKey);
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]): any {
      let methodCallNumber = callMap.get(originalMethod.name);
      if (methodCallNumber) {
        if (methodCallNumber === 10)
          return "can't call method over 10 times in one minute";
        callMap.set(originalMethod.name, ++methodCallNumber);
      } else {
        setInterval(() => {
          console.log("method Interval");
          methodCallNumber = 0;
          callMap.set(originalMethod.name, methodCallNumber);
        }, Time);
        callMap.set(originalMethod.name, 1);
      }
      console.log("callMap : ", callMap);
      return originalMethod.apply(this, args);
    };
  };
}

class User {
  private _id: number;
  private _name: string;
  private _age: number;
  constructor(id: number, name: string, age: number) {
    (this._id = id), (this._name = name), (this._age = age);
  }
  @callLimit(40000)
  getId(): number {
    return this._id;
  }
  @callLimit(40000)
  getName(): string {
    return this._name;
  }
  @callLimit(40000)
  getAge(): number {
    return this._age;
  }
}
const user = new User(1, "Abolfazl", 24);
setInterval(() => {
  console.log("call Interval");
  for (let i = 0; i < 20; i++) {
    console.log("Id : ", user.getId());
    console.log("Name : ", user.getName());
    console.log("Age : ", user.getAge());
  }
}, 10000);
