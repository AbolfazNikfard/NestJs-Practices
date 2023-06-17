import { injectable, inject } from "inversify";
import { tokens } from "./types";
import { IDriver, ILawyer, INavigator } from "./interfaces";

@injectable()
class badLawyer implements ILawyer {
    private _driver: IDriver
    constructor(@inject(tokens.driver) driver: IDriver) {
        this._driver = driver;
    }
    goToCourt(): void {
        console.log("I'm badLawyer. I'm going to court")
        this._driver.drive("Home", "court")
    }
    
}
@injectable()
class goodLawyer implements ILawyer {
    private _driver: IDriver
    constructor(@inject(tokens.driver) driver: IDriver) {
        this._driver = driver;
    }
    goToCourt() {
        console.log("I'm goodLawyer. I'm going to court");
        this._driver.drive("Home", "Court");
    }
    
}
@injectable()
class snappDriver implements IDriver {
    private _navigator: INavigator
    constructor(@inject(tokens.navigator) navigator: INavigator) {
        this._navigator = navigator;
    }
    drive(pointA: string, pointB: string) {
        console.log(`I'm Snapp driver. I'm driving from ${pointA} to ${pointB}`);
        this._navigator.navigating(pointA, pointB);
    }
}
@injectable()
class googleMapNavigator implements INavigator {
    navigating(pointA: string, pointB: string) {
        console.log(`Hi I'm google navigator. I'm navigating from ${pointA} to ${pointB}`);
    }
}

export { goodLawyer, badLawyer, snappDriver, googleMapNavigator };
