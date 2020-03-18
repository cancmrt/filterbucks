///<reference path="filterbucks.d.ts"/>

import jQuery from "jquery";
import {Base} from "./base/BaseConfiguration";


jQuery.fn.filterbucks = function(ExtraConfiguration:any)
{
    var base = new Base(this as JQuery<HTMLFormElement>,ExtraConfiguration);
    if (base.Type === "button" || base.Type === "a") {
        base.Event = "click";
        base.CheckSelector = "[clicked]";
    }
    if (base.Type === "select") {
        base.CheckSelector = "option:selected";
    }
    if (base.Type === "radio" || base.Type === "checkbox") {
        base.CheckSelector = ":checked";
    }
    this.on(base.Event, base, filterbucksEngine);
}
