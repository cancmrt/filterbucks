///<reference path="filterbucks.d.ts"/>

import jQuery from "jquery";
import {BaseConfiguration} from "./base/Configurations/BaseConfiguration";
import {Engine} from "./base/Engine";




jQuery.fn.filterbucks = function(ExtraConfiguration:any)
{
    let base = new BaseConfiguration(this as JQuery<HTMLFormElement>,ExtraConfiguration);
    if (base.Type === "button" || base.Type === "a") {
        base.Event = "mousedown";
        base.CheckSelector = "[clicked]";
    }
    if (base.Type === "select") {
        base.CheckSelector = "option:selected";
    }
    if (base.Type === "radio" || base.Type === "checkbox") {
        base.CheckSelector = ":checked";
    }

    var filterbucksEngine = new Engine();

    this.on(base.Event, base, filterbucksEngine.Run);

    if(ExtraConfiguration.ControlInitiazeSelection && ExtraConfiguration.ControlInitiazeSelection === true){
        filterbucksEngine.ForceRun(base);
    }
    
};
