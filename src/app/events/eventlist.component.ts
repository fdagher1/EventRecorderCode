import { Component, OnInit } from '@angular/core';

import { IEvent } from './event';
import { ServiceEventData } from './service-eventdata.service';
import { Router } from '@angular/router';


@Component({
    templateUrl: './eventlist.component.html'
})
export class EventListComponent implements OnInit {
    //Used as placeholder for the filter 
    listFilter: string;

    //Used for displaying any errors occured when retrieving event data
    errorMessage: string;

    //This is the event model 
    events: IEvent[];

    constructor (private serviceeventData : ServiceEventData,
                    private router: Router) {

    }

    ngOnInit(): void {
        this.serviceeventData.getEvents()
            .subscribe(events => this.events = events, 
            error => this.errorMessage = <any>error);
    }
}