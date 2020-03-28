
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
    public Run(Event:any): void {

        let Configuration = Event.data as BaseConfiguration;

        let FocusedItem = this as unknown as JQuery<HTMLFormElement>;

        let EventTriggers = new FilterbucksEvents(Configuration,FocusedItem);

        let Initializer = new FilterbucksElementInitializers(Configuration, FocusedItem);

        let Counter = new DeepCounter(Configuration);

        

        EventTriggers.FilterbucksStartEvent();
        
        Initializer.InitializeElement();

        let SelectedDeeps = Counter.SelectedElementsDeeps();
        let AllDeeps = Counter.AllElementsDeep();

        let FlushFilter = new Flusher(Configuration,SelectedDeeps,FocusedItem);

        let DeepSelector = new DeepElementSelector(Configuration,SelectedDeeps);

        let DeepElements = DeepSelector.GetDeepElements();

        FlushFilter.Flush();

        let QueryGenerator = new QueryEngine(Configuration);
        let Hider = new FilterHiderInitializers(Configuration);

        let PossibleQueries = QueryGenerator.DeepQueryGenerator(DeepElements);

        Hider.RunHider(DeepElements,FocusedItem,AllDeeps,PossibleQueries);

        var ClassQuery = QueryGenerator.CssQueryGenerator(PossibleQueries);

        Initializer.InitializeQuery(ClassQuery);
        
        EventTriggers.FilterbucksEndEvent();

    }
}