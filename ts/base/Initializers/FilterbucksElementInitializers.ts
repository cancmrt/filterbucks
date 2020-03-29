import jQuery from "jquery";
import { BaseConfiguration } from "../Configurations/BaseConfiguration";
import { ExtraConfigurationChecker } from "../Checks/ExtraConfigurationChecker";
import { ButtonSelector } from "../SpecialSelectors/ButtonSelector";

export class FilterbucksElementInitializers
{
    private Checker:ExtraConfigurationChecker;
    private SpecialSelector:ButtonSelector;
    constructor(private Configuration:BaseConfiguration, private FocusedItem:JQuery<HTMLFormElement>)
    {
        this.Checker = new ExtraConfigurationChecker(Configuration);
        this.SpecialSelector = new ButtonSelector(Configuration,FocusedItem);
    }
    public InitializeElement():void
    {
        if (this.Configuration.Type == "button" || this.Configuration.Type == "a") {

            this.ButtonInitializer();
    
        }
        else{
            this.FormElementInitializer();
        }
    }
    public InitializeQuery(Query:string):void
    {
        jQuery(this.Configuration.BaseClass).css("display", "none");
        jQuery(this.Configuration.BaseClass).removeClass(this.Configuration.FilterShowClass);
        jQuery(this.Configuration.BaseClass).removeClass(this.Configuration.FilterHideClass);
        jQuery(this.Configuration.BaseClass).addClass(this.Configuration.FilterHideClass);
        jQuery(Query).css("display", "");
        jQuery(Query).removeClass(this.Configuration.FilterHideClass);
        jQuery(Query).addClass(this.Configuration.FilterShowClass);
    }
    private ButtonInitializer():void
    {
        if(this.Checker.HasBtnSingleChoise())
        {
            var SelectedDeepCount = jQuery(this.FocusedItem).data(this.Configuration.DataDeepProp);
            var AlreadySelectedBtn = jQuery(this.Configuration.Parents)
                                            .filter("[" + this.Configuration.ButtonCheckSelector + "]")
                                            .filter('[data-'+this.Configuration.DataDeepProp+' = "'+SelectedDeepCount+'"]');
            if(AlreadySelectedBtn.length == 1)
            {
                this.SpecialSelector.ButtonSelectorRemove(AlreadySelectedBtn);
                this.SpecialSelector.ButtonSelectorAdd();
            }
            else if(AlreadySelectedBtn.length < 1)
            {
                this.SpecialSelector.ButtonSelectorAdd();
            }
            
        }
        else{
            if (jQuery(this.FocusedItem).is("[" + this.Configuration.ButtonCheckSelector + "]")) {

                this.SpecialSelector.ButtonSelectorRemove();
            }
            else {
                
                this.SpecialSelector.ButtonSelectorAdd();
            }
        }
    }
    private FormElementInitializer():void
    {
        jQuery(this.Configuration.Parents).removeClass(this.Configuration.FilterTargetElementClass);
        jQuery(this.FocusedItem).addClass(this.Configuration.FilterTargetElementClass);
    }
}