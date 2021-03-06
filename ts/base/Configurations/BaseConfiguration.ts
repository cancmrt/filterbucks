import jQuery from "jquery";
export class BaseConfiguration {


    BaseClass:string;
    DataDeepProp:string;
    DataFlushProp:string;
    CheckSelector:string;
    ButtonCheckSelector:string;
    Event:string;
    RelatedFilterShowClass:string;
    RelatedFilterHideClass:string;
    FilterShowClass:string;
    FilterHideClass:string;
    FilterTargetElementClass:string;
    FilterStartEvent:string;
    FilterEndEvent:string;
    Type:string;
    DefaultSelection:string;
    ExtraConfig:any;

    constructor(public Parents:JQuery<HTMLFormElement>, public ExtraConfiguration:any)
    {
        this.BaseClass = ".filterbucks";
        this.DataDeepProp = "fbdeep";
        this.DataFlushProp= "fbflush";
        this.CheckSelector = ":checked";
        this.ButtonCheckSelector = "clicked";
        this.Event = "change";
        this.RelatedFilterShowClass = "filterbucksRelatedShow";
        this.RelatedFilterHideClass = "filterbucksRelatedHide";
        this.FilterShowClass = "filterbucksFilteredShow";
        this.FilterHideClass = "filterbucksFilteredHide";
        this.FilterTargetElementClass = "filterbucksSelected";
        this.FilterStartEvent = "filterbucks-start";
        this.FilterEndEvent = "filterbucks-end";
        this.DefaultSelection = '[data-selected="true"]';
        this.ExtraConfig = ExtraConfiguration;

        this.Type = jQuery(Parents).get(0).tagName == "INPUT" ? jQuery(Parents).prop("type").toLowerCase() : jQuery(Parents).get(0).tagName.toLowerCase();
        if (this.Type === "button" || this.Type === "a") {
            this.Event = "click";
            this.CheckSelector = "[clicked]";
        }
        if (this.Type === "select") {
            this.CheckSelector = "option:selected";
        }
        if (this.Type === "radio" || this.Type === "checkbox") {
            this.CheckSelector = ":checked";
        }



    }

}