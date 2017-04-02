import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { IEvent } from './event';
import { ServiceEventData } from './service-eventdata.service';

@Component({
    templateUrl: './eventdetail.component.html'
})
export class EventDetailComponent implements OnInit, OnDestroy {
    //Event model
    event: IEvent;
    
    //Used to display any errors occured in retriveing event data
    errorMessage: string;
    
    //Used for subscribing to changes in ID passed in URL 
    private sub: Subscription;

    constructor ( private route: ActivatedRoute,
                    private router: Router,
                    private serviceeventData: ServiceEventData) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getEvent(id);
            }
        );
    }  

    ngOnDestroy() {
            this.sub.unsubscribe();
    }

    getEvent(id: number) {
        this.serviceeventData.getEvent(id).subscribe(
            event => this.event = event,
            error => this.errorMessage = <any>error);
    } 

    onBack(): void {
        this.router.navigate(['/eventlist']);
    }

}
