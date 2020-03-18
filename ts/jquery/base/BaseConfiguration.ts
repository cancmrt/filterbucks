
export class Base {


    BaseClass:string;
    DataDeepProp:string;
    DataFlushProp:string;
    CheckSelector:string;
    ButtonCheckSelector:string;
    Event:string;
    RelatedFilterShowClass:string;
    RelatedFilterHideClass:string;
    FilterShowClass:string
    FilterHideClass:string
    FilterTargetElementClass:string
    FilterStartEvent:string
    FilterEndEvent:string
    Type:string

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
        this.FilterShowClass = "filtebucksFilteredShow";
        this.FilterHideClass = "filtebucksFilteredHide";
        this.FilterTargetElementClass = "filterbucksSelected";
        this.FilterStartEvent = "filterbucks-start";
        this.FilterEndEvent = "filterbucks-end";
        this.Type = jQuery(Parents).get(0).tagName == "INPUT" ? jQuery(Parents).get(0).attr("type").toLowerCase() : jQuery(Parents).get(0).tagName.toLowerCase();
    }

}