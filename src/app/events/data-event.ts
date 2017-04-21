import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IEvent } from './model-event';

export class DataEvent implements InMemoryDbService {

    createDb() {
        let events: IEvent[] = [
            {
                'id': 1,
                'eventType': 'Concert/Play',
                'eventName': 'Yanni Concert at Warner Theater',
                'eventStart': '2017-04-01',
                'eventEnd': '2017-04-01',
                'eventCity': 'Washington DC',
                'eventState': 'DC',
                'eventCountry': 'United States',
                'eventCost': '47',
                'eventComment': 'Amazing music, great seats'
            },
            {
                'id': 2,
                'eventType': 'Activity',
                'eventName': 'Ski at Liberty Mountain',
                'eventStart': '2016-02-03',
                'eventEnd': '2016-02-03',
                'eventCity': 'Littlestown',
                'eventState': 'PA',
                'eventCountry': 'United States',
                'eventCost': '120',
                'eventComment': 'Fun but tiring, nice company'
            },
            {
                'id': 3,
                'eventType': 'Restaurant',
                'eventName': 'DC Steakhouse',
                'eventStart': '2016-06-02',
                'eventEnd': '2016-06-02',
                'eventCity': 'Washington DC',
                'eventState': 'DC',
                'eventCountry': 'United States',
                'eventCost': '138',
                'eventComment': 'Very good food. Suit required!'
            },
            {
                'id': 4,
                'eventType': 'Hotel',
                'eventName': 'Hotel Elephant',
                'eventStart': '2016-01-18',
                'eventEnd': '2016-01-21',
                'eventCity': "Lisbon",
                'eventState': 'Lisbon',
                'eventCountry': 'Portugal',
                'eventCost': '120/night',
                'eventComment': 'Central location, small rooms'
            },
            {
                'id': 5,
                'eventType': 'Site',
                'eventName': 'Lisbon Sites',
                'eventStart': '2016-01-19',
                'eventEnd': '2016-01-19',
                'eventCity': 'Lisbon',
                'eventState': 'Lisbon',
                'eventCountry': 'Portugal',
                'eventCost': 'free',
                'eventComment': 'Lots of walking'
            },
            {
                'id': 6,
                'eventType': 'Site',
                'eventName': 'San Juan Sites',
                'eventStart': '2016-02-17',
                'eventEnd': '2016-02-17',
                'eventCity': 'San Juan',
                'eventState': 'San Juan',
                'eventCountry': 'Puerto Rico',
                'eventCost': 'free',
                'eventComment': ''
            }
        ];
        return { events };
    }
}

        