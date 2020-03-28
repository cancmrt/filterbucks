import jQuery from "jquery";
import { BaseConfiguration } from "../Configurations/BaseConfiguration";
import { ExtraConfigurationChecker } from "../Checks/ExtraConfigurationChecker";

export class FilterHiderInitializers{

    private Checker:ExtraConfigurationChecker;

    constructor(private Configuration:BaseConfiguration)
    {
        this.Checker = new ExtraConfigurationChecker(Configuration);
    }
    public RunHider(
        DeepElements:Array<JQuery<HTMLFormElement>>,
        FocusedItem:JQuery<HTMLFormElement>,
        AllDeeps:Array<number>,
        PossibleQueries:Array<string>):void
        {
            if(this.Checker.HasHideUnrelateds())
            {
                let OurConfiguration = this.Configuration;
                let OurChecker = this.Checker;
                let DeepCount = parseInt(jQuery(FocusedItem).data(OurConfiguration.DataDeepProp), 10);
                if (DeepCount != DeepElements.length) {
                    let DiscoverThisDeep = DeepCount + 1;
                    if (OurConfiguration.Type == "select") {
                        let UnSortedDeep = jQuery(OurConfiguration.Parents).filter("[data-" + OurConfiguration.DataDeepProp + "='" + DiscoverThisDeep + "']");
                        jQuery(UnSortedDeep).find("option").each(function () {
                            jQuery(this).removeClass(OurConfiguration.RelatedFilterShowClass);
                            jQuery(this).removeClass(OurConfiguration.RelatedFilterHideClass);
                            jQuery(this).addClass(OurConfiguration.RelatedFilterShowClass);
                            jQuery(this).show();
                        });
                        let SelectedElement = jQuery(FocusedItem).find(OurConfiguration.CheckSelector);
                        if (!OurChecker.HasFlushProp(SelectedElement)) {
                            jQuery(UnSortedDeep).find("option").each(function () {
                                if (!OurChecker.HasFlushProp(this)) {
                                    let UnSelectedValue = jQuery(this).val();
                                    let FindedAny = false;
                                    PossibleQueries.forEach(function(value) {
                                        let InvestgatorClass = OurConfiguration.BaseClass + value + "." + UnSelectedValue;
                                        let CountOfSelector = jQuery(InvestgatorClass).length;
                                        if (CountOfSelector > 0) {
                                            FindedAny = true;
                                        }
                                    });
                                    if (!FindedAny) {
                                        jQuery(this).removeClass(OurConfiguration.RelatedFilterShowClass);
                                        jQuery(this).removeClass(OurConfiguration.RelatedFilterHideClass);
                                        jQuery(this).addClass(OurConfiguration.RelatedFilterHideClass);
                                        jQuery(this).hide();
                                    }
                                    FindedAny = false;
                                }

                            });
                        }
                    }
                    else if (OurConfiguration.Type == "radio" || OurConfiguration.Type == "checkbox" || OurConfiguration.Type == "button" || OurConfiguration.Type == "a") {
                        var unSortedDeep = jQuery(OurConfiguration.Parents).filter("[data-" + OurConfiguration.DataDeepProp + "='" + DiscoverThisDeep + "']");
                        jQuery(unSortedDeep).each(function () {
                            jQuery(this).show();
                        });
                        let SelectedItem:any;
                        if (OurConfiguration.Type == "radio" || OurConfiguration.Type == "checkbox") {
                            SelectedItem = jQuery(FocusedItem);
                        }
                        if (OurConfiguration.Type == "button" || OurConfiguration.Type == "a") {
                            SelectedItem = jQuery(OurConfiguration.Parents).filter(OurConfiguration.CheckSelector).filter("[data-" + OurConfiguration.DataDeepProp + "='" + DeepCount + "']");
                        }

                        if (!OurChecker.HasFlushProp(SelectedItem)) {
                            jQuery(unSortedDeep).each(function () {
                                if (!OurChecker.HasFlushProp(this)) {
                                    let UnSelectedValue:string | undefined;
                                    if (OurConfiguration.Type === "a") {
                                        UnSelectedValue = jQuery(this).attr("value");
                                    }
                                    else {
                                        UnSelectedValue = jQuery(this).val() as string;
                                    }

                                    let FindedAny = false;
                                    PossibleQueries.forEach(function(value) {
                                        let InvestgatorClass = OurConfiguration.BaseClass + value + "." + UnSelectedValue;
                                        let CountOfSelector = jQuery(InvestgatorClass).length;
                                        if (CountOfSelector > 0) {
                                            FindedAny = true;
                                        }
                                    });
                                    if (!FindedAny && PossibleQueries.length > 0) {
                                        jQuery(this).removeClass(OurConfiguration.RelatedFilterShowClass);
                                        jQuery(this).removeClass(OurConfiguration.RelatedFilterHideClass);
                                        jQuery(this).addClass(OurConfiguration.RelatedFilterHideClass);
                                        jQuery(this).hide();
                                    }
                                    
                                    FindedAny = false;
                                }

                            });
                        }
                    }
            }
            if(DeepElements.length <= 0)
            {
                AllDeeps.forEach(function(deep) {
                    if (OurConfiguration.Type == "select") {
                        let UnSortedDeep = jQuery(OurConfiguration.Parents).filter("[data-" + OurConfiguration.DataDeepProp + "='" + deep + "']");
                        jQuery(UnSortedDeep).find("option").each(function () {

                            jQuery(this).removeClass(OurConfiguration.RelatedFilterShowClass);
                            jQuery(this).removeClass(OurConfiguration.RelatedFilterHideClass);
                            jQuery(this).addClass(OurConfiguration.RelatedFilterShowClass);
                            jQuery(this).show();

                        });
                    }
                    else if (OurConfiguration.Type == "radio" || OurConfiguration.Type == "checkbox" || OurConfiguration.Type == "button" || OurConfiguration.Type == "a") {
                        let UnSortedDeep = jQuery(OurConfiguration.Parents).filter("[data-" + OurConfiguration.DataDeepProp + "='" + deep + "']");
                        jQuery(UnSortedDeep).each(function () {
                            jQuery(this).removeClass(OurConfiguration.RelatedFilterShowClass);
                            jQuery(this).removeClass(OurConfiguration.RelatedFilterHideClass);
                            jQuery(this).addClass(OurConfiguration.RelatedFilterShowClass);
                            jQuery(this).show();
                        });
                    }
                });
            }
        }
    }
}