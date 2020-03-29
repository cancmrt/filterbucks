import jQuery from "jquery";
import { BaseConfiguration } from "../Configurations/BaseConfiguration";
import { ExtraConfigurationChecker } from "../Checks/ExtraConfigurationChecker";
import { ButtonSelector } from "../SpecialSelectors/ButtonSelector";

export class Flusher {

    
    private Checker:ExtraConfigurationChecker

    constructor(private Configuration:BaseConfiguration, 
        private SelectedDeeps:Array<number>, 
        private FocusedItem:JQuery<HTMLFormElement>)
    {
        this.Checker = new ExtraConfigurationChecker(Configuration);
        
    }
    public Flush():void{
        let DeepCount = parseInt(jQuery(this.FocusedItem).data(this.Configuration.DataDeepProp), 10);
        let RealDeepCount = parseInt(jQuery(this.FocusedItem).data(this.Configuration.DataDeepProp), 10);

        if (this.Checker.HasFlushProp(this.FocusedItem))
        {
            DeepCount--;
        }
        let OurConfiguration = this.Configuration;
        let OurChecker = this.Checker;
        this.SelectedDeeps.forEach(function(ThisDeep){
            
            if(DeepCount < ThisDeep){

                var FlushThis = jQuery(OurConfiguration.Parents).filter("[data-" + OurConfiguration.DataDeepProp + "='" + ThisDeep + "']");

                if (OurConfiguration.Type == "select") {
                    jQuery(FlushThis).find("option").each(function(){
                        if(OurChecker.HasFlushProp(this))
                        {
                            jQuery(FlushThis).val(jQuery(this).val() as string);
                        }
                    });
                }
                else if (OurConfiguration.Type == "button" || OurConfiguration.Type == "a") {
                    jQuery(FlushThis).each(function(){
                        let SpeacialBtnSelector = new ButtonSelector(OurConfiguration,this);
                        if(OurChecker.HasFlushProp(this) && RealDeepCount !== ThisDeep)
                        {
                            SpeacialBtnSelector.ButtonSelectorAdd();
                        }

                        if(!OurChecker.HasFlushProp(this))
                        {
                            SpeacialBtnSelector.ButtonSelectorRemove();
                        }
                    });
                }
                else if (OurConfiguration.Type == "radio" || OurConfiguration.Type == "checkbox") {
                    jQuery(FlushThis).each(function(){

                        if(OurChecker.HasFlushProp(this) && RealDeepCount !== ThisDeep)
                        {
                            jQuery(this).prop("checked", true);
                        }

                        if(!OurChecker.HasFlushProp(this))
                        {
                            jQuery(this).prop("checked", false);
                        }
                    });
                    
                }
                
            }
        });
    }
}