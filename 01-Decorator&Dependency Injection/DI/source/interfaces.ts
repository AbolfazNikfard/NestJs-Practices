interface ILawyer {
    goToCourt():void;
}
interface IDriver {
    drive(origin: string, destination: string): void;
}
interface INavigator {
    navigating(origin: string, destination: string): void;
}
export {ILawyer,IDriver,INavigator};