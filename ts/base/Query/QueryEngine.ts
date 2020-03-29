import jQuery from "jquery";
import {BaseConfiguration} from "../Configurations/BaseConfiguration";
export class QueryEngine{
    constructor(private Configuration:BaseConfiguration)
    {

    }
    public DeepQueryGenerator(DeepElements:Array<JQuery<HTMLFormElement>>,Queries?:Array<string>):Array<string>{
        
        if(Queries === undefined) {
            Queries = [];
        }

        if (DeepElements.length === 0) {
            return Queries;
        }

        let CopyDeepElements = DeepElements.slice();
        let TakenLayer = CopyDeepElements.shift();
        let ExtendQueries:Array<string> = [];
        let DetectedNone = jQuery(TakenLayer!).filter("[data-" + this.Configuration.DataFlushProp + "='true']");
        if (jQuery(DetectedNone).length <= 0) {
            jQuery(TakenLayer!).each(function () {
                let element = this;
                if (Queries!.length == 0) {
                    let classValue = "." + jQuery(element).attr("value");
                    ExtendQueries.push(classValue);

                }
                else if (Queries!.length > 0) {
                    Queries!.forEach(function(query) {
                        let classValue = "." + jQuery(element).attr("value");
                        let newQuery = query + classValue;
                        ExtendQueries.push(newQuery);
                    });
                }
            });
        }
        else if (jQuery(DetectedNone).length > 0) {
            ExtendQueries = Queries;
        }


        return this.DeepQueryGenerator(CopyDeepElements, ExtendQueries);
        
    }
    public CssQueryGenerator(PossibleQueries:Array<string>):string
    {
        var ClassQuery = "";
        if (PossibleQueries === null) {
            ClassQuery = this.Configuration.BaseClass;
        }
        else if (PossibleQueries.length <= 0) {
            ClassQuery = this.Configuration.BaseClass;
        }
        else if (PossibleQueries !== null && PossibleQueries.length > 0) {
            let OurConfiguration = this.Configuration;
            PossibleQueries.forEach(function(value) {
                ClassQuery += OurConfiguration.BaseClass + value + ","
            });
            ClassQuery = ClassQuery.substring(0, ClassQuery.length - 1);
        }

        return ClassQuery;
    }
}