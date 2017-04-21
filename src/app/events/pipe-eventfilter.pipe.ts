import { PipeTransform, Pipe } from '@angular/core';
import { IEvent } from './model-event';

@Pipe({
    name:'pipeeventFilter'
})
export class PipeEventFilter implements PipeTransform {
    transform (value: IEvent[], filterBy: string): IEvent[] 
    {
        if ( filterBy ) 
        { 
            filterBy = filterBy.toLocaleLowerCase();
        }
        else
        {
            filterBy = null;
        }
        
        if ( filterBy )
        {
            return value.filter((event: IEvent) => event.eventName.toLocaleLowerCase().indexOf(filterBy) !== -1 );
        }
        else
        {
            return value;
        }
    }
}