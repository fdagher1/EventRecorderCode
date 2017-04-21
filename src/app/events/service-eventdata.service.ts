import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IEvent} from './model-event';

@Injectable()
export class ServiceEventData {

    //Used as the URL for the InMemoryDbService database 
    private baseUrl = 'api/events';

    //Constructor
    constructor(private http: Http) {
    }

    //Get all events
    getEvents (): Observable<IEvent[]> {
        return this.http.get(this.baseUrl).map(this.extractData).do(data => console.log('Service: getEvents: ' + JSON.stringify(data))).catch(this.handleError);
    }

    //Get one event. If id=0, return new/blank event
    getEvent(id: number): Observable<IEvent> {
        if (id ===0 ) {
            return Observable.of(this.initializeNewEvent());
        }
        else {
            const url = `${this.baseUrl}/${id}`;
            return this.http.get(url).map(this.extractData).do(data => console.log('Service: getEvent: ' + JSON.stringify(data))).catch(this.handleError);
        }
    }

    //Delete event
    deleteEvent(id: number): Observable<Response> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options).do(data => console.log('Service: deleteEvent: ' + JSON.stringify(data))).catch(this.handleError);
    }

    //Save event. If id=0, save as new event, if not, update old event
    saveEvent(event: IEvent): Observable<IEvent> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        if (event.id === 0) {
            event.id = undefined;
            return this.http.post(this.baseUrl, event, options).map(this.extractData).do(data => console.log('Service: createEvent: ' + JSON.stringify(data))).catch(this.handleError);
        }
        else {
            const url = `${this.baseUrl}/${event.id}`;
            return this.http.put(url, event, options).map(() => event).do(data => console.log('Service: updateEvent: ' + JSON.stringify(data))).catch(this.handleError);
        }
    }

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private initializeNewEvent(): IEvent {
        return {
            id: 0,
            eventName: null,
            eventType: "SelectEventType",
            eventStart: (new Date()).toISOString().split("T")[0],
            eventEnd: (new Date()).toISOString().split("T")[0],
            eventCity: null,
            eventState: null,
            eventCountry: null,
            eventCost: null,
            eventComment: null
        };
    }
}