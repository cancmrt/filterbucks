
import {BaseConfiguration} from "./BaseConfiguration";
import {FilterbucksEvents} from "./Events/FilterbucksEvents";
import {FilterbucksElementInitializers} from "./Initializers/FilterbucksElementInitializers";

export class Engine
{
    private Configuration:BaseConfiguration | undefined;
    private FocusedItem:JQuery<HTMLFormElement> | undefined;
    private EventTriggers:FilterbucksEvents | undefined;
    private Initializer:FilterbucksElementInitializers | undefined;

    public Run(Event:any): void {

        this.Configuration = Event.data as BaseConfiguration;

        this.FocusedItem = this as unknown as JQuery<HTMLFormElement>;

        this.EventTriggers = new FilterbucksEvents(this.Configuration,this.FocusedItem);

        this.Initializer = new FilterbucksElementInitializers(this.Configuration, this.FocusedItem);

        this.EventTriggers.FilterbucksStartEvent();
        
        this.Initializer.InitializeElement();

    }
}