import {Base} from "./BaseConfiguration";

export class Engine
{
    static Run(Event:any): void {
        var baseConfiguration = Event.data as Base;
    }
}