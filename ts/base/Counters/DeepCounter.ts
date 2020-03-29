import jQuery from "jquery";
import { BaseConfiguration } from "../Configurations/BaseConfiguration";

export class DeepCounter{

    constructor(private Configuration:BaseConfiguration)
    {

    }

    public SelectedElementsDeeps():Array<number>{ //Equivalent off giveUniqDeepCounts

        let FindedDeeps: Array<number> = [];
        let OurConfiguration = this.Configuration;

        jQuery(OurConfiguration.Parents).each(function () {
            if (OurConfiguration.Type == "select") {
                let DetectCheckSelector = $(this).find(OurConfiguration.CheckSelector)
                if (DetectCheckSelector.length > 0) {
                    FindedDeeps.push(parseInt(jQuery(this).data(OurConfiguration.DataDeepProp), 10));
                }
            }
            else if (OurConfiguration.Type == "radio" || OurConfiguration.Type == "checkbox" || OurConfiguration.Type == "button" || OurConfiguration.Type == "a") {
                let DetectCheckSelector = $(this).filter(OurConfiguration.CheckSelector)
                if (DetectCheckSelector.length > 0) {
                    FindedDeeps.push(parseInt(jQuery(this).data(OurConfiguration.DataDeepProp), 10));
                }
            }


        });

        let UniqueDeeps = FindedDeeps.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });

        UniqueDeeps = UniqueDeeps.sort(function (a, b) { return a - b });

        return UniqueDeeps;
    }
    public AllElementsDeep():Array<number>{ //Equivalent off allUniqDeepCounts

        let FindedDeeps:Array<number> = [];
        let OurConfiguration = this.Configuration;
        jQuery(OurConfiguration.Parents).each(function () {
            if (OurConfiguration.Type == "select") {
                FindedDeeps.push(parseInt(jQuery(this).data(OurConfiguration.DataDeepProp), 10));
            }
            else if (OurConfiguration.Type == "radio" || OurConfiguration.Type == "checkbox" || OurConfiguration.Type == "button" || OurConfiguration.Type == "a") {
                FindedDeeps.push(parseInt(jQuery(this).data(OurConfiguration.DataDeepProp), 10));
            }


        });

        var uniqueDeeps = FindedDeeps.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });

        uniqueDeeps = uniqueDeeps.sort(function (a, b) { return a - b });

        return uniqueDeeps;
    }

}