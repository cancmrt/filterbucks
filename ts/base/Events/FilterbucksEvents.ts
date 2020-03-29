import jQuery from "jquery";
import {BaseConfiguration} from "../Configurations/BaseConfiguration";

export class FilterbucksEvents
{
    constructor(private Configuration:BaseConfiguration, private FocusedItem:JQuery<HTMLFormElement>)
    {

    }
    public FilterbucksStartEvent():void {
        jQuery(this.Configuration.Parents).trigger(this.Configuration.FilterStartEvent,this.FocusedItem);
    }
    public FilterbucksEndEvent():void {
        jQuery(this.Configuration.Parents).trigger(this.Configuration.FilterEndEvent,this.FocusedItem);
    }


}