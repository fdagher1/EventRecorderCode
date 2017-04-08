import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IEvent } from './event';

export class DataEvent implements InMemoryDbService {

    createDb() {
        let events: IEvent[] = [
            {
                'id': 1,
                'eventName': 'Yanni Concert',
                'eventType': 'Concert/Play'
            },
            {
                'id': 2,
                'eventName': 'Ski at Liberty M',
                'eventType': 'Activity'
            },
            {
                'id': 3,
                'eventName': 'Steakhouse',
                'eventType': 'Restaurant'
            },
            {
                'id': 4,
                'eventName': 'Circa',
                'eventType': 'Restaurant'
            },
            {
                'id': 5,
                'eventName': 'Lisbon',
                'eventType': 'Site'
            },
            {
                'id': 6,
                'eventName': 'San Juan',
                'eventType': 'Site'
            }
        ];
        return { events };
    }
}

        