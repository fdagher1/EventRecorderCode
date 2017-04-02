import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IEvent } from './event';

export class DataEvent implements InMemoryDbService {

    createDb() {
        let events: IEvent[] = [
            {
                'id': 1,
                'eventName': 'Yanni Concert',
                'eventType': 'Show'
            },
            {
                'id': 2,
                'eventName': 'Ski at Liberty M',
                'eventType': 'Sports'
            },
            {
                'id': 3,
                'eventName': 'Steakhouse',
                'eventType': 'Restaurant'
            }
        ];
        return { events };
    }
}

        