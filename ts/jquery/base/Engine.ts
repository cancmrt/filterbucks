
import {BaseConfiguration} from "./Configurations/BaseConfiguration";
import {FilterbucksEvents} from "./Events/FilterbucksEvents";
import {FilterbucksElementInitializers} from "./Initializers/FilterbucksElementInitializers";
import {DeepCounter} from "./Counters/DeepCounter";
import {Flusher} from "./SpecialSelectors/Flusher";
import {DeepElementSelector} from "./SpecialSelectors/DeepElementSelector";

export class Engine
{
    private Configuration:BaseConfiguration | undefined;
    private FocusedItem:JQuery<HTMLFormElement> | undefined;
    private EventTriggers:FilterbucksEvents | undefined;
    private Initializer:FilterbucksElementInitializers | undefined;
    private Counter:DeepCounter | undefined;
    private Flusher:Flusher | undefined;

    public Run(Event:any): void {

        this.Configuration = Event.data as BaseConfiguration;

        this.FocusedItem = this as unknown as JQuery<HTMLFormElement>;

        this.EventTriggers = new FilterbucksEvents(this.Configuration,this.FocusedItem);

        this.Initializer = new FilterbucksElementInitializers(this.Configuration, this.FocusedItem);

        this.Counter = new DeepCounter(this.Configuration)

        this.EventTriggers.FilterbucksStartEvent();
        
        this.Initializer.InitializeElement();

        let SelectedDeeps = this.Counter.SelectedElementsDeeps();
        let AllDeeps = this.Counter.AllElementsDeep();

        this.Flusher = new Flusher(this.Configuration,SelectedDeeps,this.FocusedItem);

        let DeepSelector = new DeepElementSelector(this.Configuration,SelectedDeeps);

        let DeepElements = DeepSelector.GetDeepElements();

        this.Flusher.Flush();



    }
}