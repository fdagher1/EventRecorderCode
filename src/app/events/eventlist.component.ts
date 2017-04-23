import { Component, OnInit } from '@angular/core';

import { IEvent } from './model-event';
import { ServiceEventData } from './service-eventdata.service';

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

    //Used to control the direction of the Event Name header arrow
    oddNumberClick: boolean = true;
    previousClickedElementName: string;
    previousClickedElementValue;

    constructor (private serviceeventData : ServiceEventData) {
    }

    ngOnInit(): void {
        this.serviceeventData.getEvents().subscribe(events => this.events = events, error => this.errorMessage = <any>error);
    }

    headerClicked(event: Event): void {
        //Get clicked element name and value
        var clickedElementName: string = (event.target as Element).getAttribute("name").toString();
        var clickedElementValue = document.getElementsByName(clickedElementName)[0].innerHTML;

        //Check if another header was previously clicked, if so remove arrow icon
        if (this.previousClickedElementName != null )
        {
            if ( clickedElementName == this.previousClickedElementName)
            {
                clickedElementValue = this.previousClickedElementValue;
            }
            else
            {
                document.getElementsByName(this.previousClickedElementName)[0].innerHTML = this.previousClickedElementValue;
            }                
        }

        //Store clicked element name and value for future reference
        this.previousClickedElementName = clickedElementName;
        this.previousClickedElementValue = clickedElementValue; 

        //If odd number clicks, point arrow upward, and sort by ascending order, id not, do the opposite
        if (this.oddNumberClick) {
            document.getElementsByName(clickedElementName)[0].innerHTML = clickedElementValue + "&uarr;"
            this.events.sort((e1, e2) => { if (e1[clickedElementName] > e2[clickedElementName]) { return 1; } if (e1[clickedElementName] < e2[clickedElementName]) { return -1; } return 0; });
        }
        else {
            document.getElementsByName(clickedElementName)[0].innerHTML = clickedElementValue + "&darr;"
            this.events.sort((e1, e2) => { if (e1[clickedElementName] > e2[clickedElementName]) { return -1; } if (e1[clickedElementName] < e2[clickedElementName]) { return 1; } return 0; });
        }

        //Change from/to odd/even number of clicks
        this.oddNumberClick = !this.oddNumberClick;
    }

}