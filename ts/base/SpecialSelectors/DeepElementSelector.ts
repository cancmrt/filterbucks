import jQuery from "jquery";
import {BaseConfiguration} from "../Configurations/BaseConfiguration";

export class DeepElementSelector
{
    constructor(private Configuration:BaseConfiguration, private UniqueDeeps:Array<number>)
    {

    }
    public GetDeepElements():Array<JQuery<HTMLFormElement>>{
        let DeepElements:Array<JQuery<HTMLFormElement>> = [];
        let OurConfiguration = this.Configuration;
        this.UniqueDeeps.forEach(function(deep) {

            let FindedDeep:JQuery<HTMLFormElement> | undefined;
            if (OurConfiguration.Type == "select") {
                FindedDeep = jQuery(OurConfiguration.Parents).filter("[data-" + OurConfiguration.DataDeepProp + "='" + deep + "']").find(OurConfiguration.CheckSelector);
            }
            else if (OurConfiguration.Type == "radio" || OurConfiguration.Type == "checkbox" || OurConfiguration.Type == "button" || OurConfiguration.Type == "a") {
                FindedDeep = jQuery(OurConfiguration.Parents).filter(OurConfiguration.CheckSelector).filter("[data-" + OurConfiguration.DataDeepProp + "='" + deep + "']");
            }
            if(FindedDeep !== undefined && jQuery(FindedDeep).length > 0)
            {
                DeepElements.push(FindedDeep);
            }
        });

        return DeepElements;
    }

}