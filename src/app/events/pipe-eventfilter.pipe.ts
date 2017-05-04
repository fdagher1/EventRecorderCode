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
            /*return value.filter(function(event: IEvent) { 
                return event.eventName.toLocaleLowerCase().indexOf(filterBy) !== -1;
            });*/

            let eventarray: IEvent[] = [];
            for (let event of value) {
                if (event.eventName.toLocaleLowerCase().indexOf(filterBy) !== -1) {
                    eventarray.push(event);
                }
                else if (event.eventCity.toLocaleLowerCase().indexOf(filterBy) !== -1) {
                    eventarray.push(event);
                }
                else if (event.eventState.toLocaleLowerCase().indexOf(filterBy) !== -1) {
                    eventarray.push(event);
                }
                else if (event.eventCountry.toLocaleLowerCase().indexOf(filterBy) !== -1) {
                    eventarray.push(event);
                }
                else if (event.eventComment.toLocaleLowerCase().indexOf(filterBy) !== -1) {
                    eventarray.push(event);
                }
            }
            return eventarray;
        }
        else
        {
            return value;
        }
    }
}