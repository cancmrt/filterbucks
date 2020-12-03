import jQuery from "jquery";
import { BaseConfiguration } from "../Configurations/BaseConfiguration";
import { ExtraConfigurationChecker } from "../Checks/ExtraConfigurationChecker";

export class ButtonSelector {

    private Checker:ExtraConfigurationChecker

    constructor(private Configuration:BaseConfiguration, private FocusedItem:JQuery<HTMLFormElement> | HTMLFormElement)
    {
        this.Checker = new ExtraConfigurationChecker(Configuration);
    }
    ButtonSelectorAdd(FocusThis?:JQuery<HTMLFormElement> | HTMLFormElement):void{
        let FocusDecided:JQuery<HTMLFormElement> | HTMLFormElement;
        if(FocusThis !== undefined)
        {
            FocusDecided = FocusThis;
        }
        else{
            FocusDecided = this.FocusedItem;
        }
        
        jQuery(FocusDecided).attr(this.Configuration.ButtonCheckSelector, "");
        jQuery(FocusDecided).addClass(this.Configuration.FilterTargetElementClass);
        if (this.Checker.HasButtonCssOpacity())
        {
            jQuery(FocusDecided).css("opacity", "0.5");
        }
    }
    
    ButtonSelectorRemove(FocusThis?:JQuery<HTMLFormElement> | HTMLFormElement):void{
        let FocusDecided:JQuery<HTMLFormElement> | HTMLFormElement;
        if(FocusThis !== undefined)
        {
            FocusDecided = FocusThis;
        }
        else{
            FocusDecided = this.FocusedItem;
        }
        jQuery(FocusDecided).removeAttr(this.Configuration.ButtonCheckSelector);
        jQuery(FocusDecided).removeClass(this.Configuration.FilterTargetElementClass);

        if (this.Checker.HasButtonCssOpacity())
        {
            jQuery(FocusDecided).css("opacity", "1");
        }
    }
}