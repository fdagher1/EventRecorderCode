import { PipeTransform, Pipe } from '@angular/core';
import { IEvent } from './event';

@Pipe({
    name: 'pipeeventFilter'
})
export class PipeEventFilter implements PipeTransform {
    transform(value: IEvent[], filterBy: string): IEvent[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((product: IEvent) =>
            product.eventName.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}