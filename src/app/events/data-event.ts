import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IEvent } from './event';

export class DataEvent implements InMemoryDbService {

    createDb() {
        let events: IEvent[] = [
            {
                'id': 1,
                'eventName': 'Yanni Concert',
                'eventType': 'Concert/Play',
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
                'eventName': 'Ski at Liberty Mountain',
                'eventType': 'Activity',
                'eventStart': '2016-02-03',
                'eventEnd': '2016-02-03',
                'eventCity': 'Littlestown',
                'eventState': 'PA',
                'eventCountry': 'United States',
                'eventCost': '120',
                'eventComment': 'Tiring but fun, nice company'
            },
            {
                'id': 3,
                'eventName': 'Steakhouse',
                'eventType': 'Restaurant',
                'eventStart': '2016-06-02',
                'eventEnd': '2016-06-02',
                'eventCity': 'Washington DC',
                'eventState': 'DC',
                'eventCountry': 'United States',
                'eventCost': '138',
                'eventComment': 'Very good food. Had to wear a suit from the restaurant'
            },
            {
                'id': 4,
                'eventName': 'Hotel Elephant',
                'eventType': 'Hotel',
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
                'eventName': 'Lisbon Sites',
                'eventType': 'Site',
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
                'eventName': 'San Juan Sites',
                'eventType': 'Site',
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

        