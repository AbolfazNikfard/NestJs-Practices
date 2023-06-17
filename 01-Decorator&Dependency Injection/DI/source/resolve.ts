import { ILawyer } from "./interfaces";
import { container } from "./inversify.config";
import { tokens } from "./types";
console.log("container : ", container);
const lawyer = container.get<ILawyer>(tokens.lawyer);
console.log("lawyer instance : ", lawyer);
lawyer.goToCourt();