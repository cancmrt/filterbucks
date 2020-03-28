import jQuery from "jquery";
import {BaseConfiguration} from "../Configurations/BaseConfiguration";
export class ExtraConfigurationChecker
{
    constructor(private Configuration:BaseConfiguration)
    {

    }

    public HasButtonCssOpacity():boolean{
        if(
            this.Configuration.ExtraConfiguration && 
            this.Configuration.ExtraConfiguration.ButtonCssOpacity && 
            this.Configuration.ExtraConfiguration.ButtonCssOpacity === true
            )
        {
            return true;
        }
        else{
            return false;
        }
    }
    public HasHideUnrelateds():boolean{
        if(this.Configuration.ExtraConfiguration 
            && this.Configuration.ExtraConfiguration.HideUnrelateds 
            && this.Configuration.ExtraConfiguration.HideUnrelateds === true)
        {
            return true;
        }
        else{
            return false;
        }
    
    }
    public HasBtnSingleChoise():boolean{
        if(this.Configuration.ExtraConfiguration 
            && this.Configuration.ExtraConfiguration.BtnSingleChoise 
            && this.Configuration.ExtraConfiguration.BtnSingleChoise === true)
        {
            return true;
        }
        else{
            return false;
        }
    
    }
    public HasFlushProp(Item:JQuery<HTMLFormElement> | HTMLFormElement)
    {
        if (
            (jQuery(Item).attr("data-" + this.Configuration.DataFlushProp)) && 
            (jQuery(Item).attr("data-" + this.Configuration.DataFlushProp) === "true")
            )
        {
            return true;
        }
        else{
            return false;
        }
    }
}