import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IEvent} from './event';

@Injectable()
export class ServiceEventData {
    private baseUrl = 'api/events';

    constructor(private http: Http) {
    }

    getEvents (): Observable<IEvent[]> {
        return this.http.get(this.baseUrl)
                .map(this.extractData)
                .do(data => console.log('getEvents: ' + JSON.stringify(data)))
                .catch(this.handleError);
    }

    getEvent(id: number): Observable<IEvent> {
        if (id ===0 ) {
            return Observable.of(this.initializeEvent());

        }

        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
                .map(this.extractData)
                .do(data => console.log('getEvent: ' + JSON.stringify(data)))
                .catch(this.handleError);
    }

    deleteEvent(id: number): Observable<Response> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
                    .do(data => console.log('deleteEvent: ' + JSON.stringify(data)))
                    .catch(this.handleError);
    }

    saveEvent(event: IEvent): Observable<IEvent> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        if (event.id === 0) {
            return this.createEvent(event, options);
        }
        return this.updateEvent(event, options);
    }

    private createEvent(event: IEvent, options: RequestOptions): Observable<IEvent> {
        event.id = undefined;
        return this.http.post(this.baseUrl, event, options)
                .map(this.extractData)
                .do(data => console.log('createEvent: ' + JSON.stringify(data)))
                .catch(this.handleError);
    }

    private updateEvent(event: IEvent, options: RequestOptions): Observable<IEvent> {
        const url = `${this.baseUrl}/${event.id}`;
        return this.http.put(url, event, options)
                .map(() => event)
                .do(data => console.log('updateEvent: ' + JSON.stringify(data)))
                .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    initializeEvent(): IEvent {
        return {
            id: 0,
            eventName: null,
            eventType: null
        };
    }
}