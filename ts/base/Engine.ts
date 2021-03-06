
import {BaseConfiguration} from "./Configurations/BaseConfiguration";
import {FilterbucksEvents} from "./Events/FilterbucksEvents";
import {FilterbucksElementInitializers} from "./Initializers/FilterbucksElementInitializers";
import {DeepCounter} from "./Counters/DeepCounter";
import {Flusher} from "./SpecialSelectors/Flusher";
import {DeepElementSelector} from "./SpecialSelectors/DeepElementSelector";
import {QueryEngine} from "./Query/QueryEngine";
import {FilterHiderInitializers} from "./Initializers/FilterHiderInitializers";

export class Engine
{
    public Run(Event:any,ForceToRun:any = undefined): void {

        let Configuration = Event.data as BaseConfiguration;
        let FocusedItem = undefined;
        if(ForceToRun)
            FocusedItem = ForceToRun as unknown as JQuery<HTMLFormElement>;
        else
             FocusedItem = this as unknown as JQuery<HTMLFormElement>;

        let EventTriggers = new FilterbucksEvents(Configuration,FocusedItem);

        let Initializer = new FilterbucksElementInitializers(Configuration, FocusedItem);

        let Counter = new DeepCounter(Configuration);
        

        EventTriggers.FilterbucksStartEvent();
        
        Initializer.InitializeElement();

        let SelectedDeeps = Counter.SelectedElementsDeeps();
        let AllDeeps = Counter.AllElementsDeep();
        let FlushFilter = new Flusher(Configuration,SelectedDeeps,FocusedItem);

        if(Configuration.ExtraConfig && Configuration.ExtraConfig.DisableFlusher && Configuration.ExtraConfig.DisableFlusher === true )
        {

        }
        else if(Configuration.ExtraConfig && Configuration.ExtraConfig.DisableFlusher && Configuration.ExtraConfig.DisableFlusher === true)
        {
            FlushFilter.Flush();
        }
        else{
            FlushFilter.Flush();
        }

        let DeepSelector = new DeepElementSelector(Configuration,SelectedDeeps);

        let DeepElements = DeepSelector.GetDeepElements();

        let QueryGenerator = new QueryEngine(Configuration);
        let Hider = new FilterHiderInitializers(Configuration);

        let PossibleQueries = QueryGenerator.DeepQueryGenerator(DeepElements);

        Hider.RunHider(DeepElements,FocusedItem,AllDeeps,PossibleQueries);

        var ClassQuery = QueryGenerator.CssQueryGenerator(PossibleQueries);

        Initializer.InitializeQuery(ClassQuery);
        
        EventTriggers.FilterbucksEndEvent();

    }
    public ForceRun(base:BaseConfiguration){
        let engineBase = this;
        jQuery(base.DefaultSelection).each(function(){
            let event = {
                data: base
            };
            if(base.Type === "checkbox")
                jQuery(this).prop('checked',true);
            else if(base.Type === "select")
            {
                let upperEl = jQuery(this).prev();
                let valueOfElement = jQuery(this).attr('value') as string;
                jQuery(upperEl).val(valueOfElement);
                engineBase.Run(event,upperEl);
                return;
            }
            engineBase.Run(event,this);
        });
        
    }
}