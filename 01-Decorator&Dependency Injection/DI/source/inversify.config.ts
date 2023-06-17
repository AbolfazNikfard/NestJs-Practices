import { Container } from "inversify";
import "reflect-metadata";
import { tokens } from "./types";
import { IDriver, ILawyer, INavigator } from "./interfaces";
import { goodLawyer, badLawyer, snappDriver, googleMapNavigator } from "./entities";

const container = new Container();
container.bind<ILawyer>(tokens.lawyer).to(goodLawyer);
container.bind<IDriver>(tokens.driver).to(snappDriver);
container.bind<INavigator>(tokens.navigator).to(googleMapNavigator);

export { container };