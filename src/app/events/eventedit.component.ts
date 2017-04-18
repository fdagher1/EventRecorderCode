import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

import { GenericValidator } from '../shared/generic-validator';

import { IEvent } from './event';
import { eventTypes } from './event';
import { ServiceEventData } from './service-eventdata.service';

@Component ({
    templateUrl: './eventedit.component.html'
})
export class EventEditComponent implements OnInit {
    //Variables used for validators
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    //Variable used if an error occurs getting or updating events through the event service
    errorMessage: string;

    //Used for displaying successful entering of random event
    statusMessage: string;

    //Used to check if the eventedit view is for a new event or edit event
    eventIdFromRouter: number;

    //Used to check if form is in View or Edit Mode
    editMode: boolean = false;

    //Variable used to create the form and bind to data 
    eventForm: FormGroup;
    event: IEvent;
    eventTypes = eventTypes;

    //Get formInputElements
    @ViewChildren(FormControlName, {read: ElementRef }) formInputElements: ElementRef[];

    //Variable used to subscribe to changes in ID value in URL
    private sub: Subscription;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private serviceeventData: ServiceEventData) {

        this.validationMessages = {
            eventName: {
                required: 'Event name is required.',
                minlength: 'Event name must be at least three characters',
                maxlength: 'Event name cannot exceed 50 characters.'
            },
            eventType: {
                required: 'Event name is required.'
            },
            eventStart: {
                required: 'Event start date is required.'
            },
            eventEnd: {
                required: 'Event end date is required.'
            },
            eventCity: {
                required: 'Event city name is required.'
            },
            eventState: {
                required: 'Event state name is required.'
            },
            eventCountry: {
                required: 'Event country name is required.'
            }
        };

        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    //During initialization of this component, create the form group and form components, then get event ID from URL
    ngOnInit(): void {
        //Create Reactive Form
        this.eventForm = this.fb.group({
            eventName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            eventType: ['', Validators.required],
            eventStart: ['', Validators.required],
            eventEnd: ['', Validators.required],
            eventCity: ['', Validators.required],
            eventState: ['', Validators.required],
            eventCountry: ['', Validators.required],
            eventCost: [''],
            eventComment: ['']
        });

        //Get parameter passed through the URL and then call get event to populate sheet with event data
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                if (isNaN(id))
                { 
                    id = 0;
                }
                this.eventIdFromRouter = id;
                this.getEvent(id);
                if (id==0)
                {
                    this.EventEditClick();
                }
            }
        );
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.eventForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.eventForm);
        });

        
    }

    //When done editing the event data, unsubscribe 
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    //Requests the event from the dataservice and updates the form accordingly
    getEvent(id: number): void {
        this.serviceeventData.getEvent(id)
            .subscribe(
                (event: IEvent) => this.onEventRetrieved(event),
                (error: any) => this.errorMessage = <any>error
            );
    }

    //If event form has data which is valid, merge it with what the event object initially had, then send it to save data service
    saveEvent(): void {
        if (this.eventForm.dirty && this.eventForm.valid) {
            let e = Object.assign({}, this.event, this.eventForm.value);
            
            this.serviceeventData.saveEvent(e)
                .subscribe(
                    () => this.onEventSaved(),
                    (error: any) => this.errorMessage = <any>error
                );
        } 
    }

    //Create random event object and add to view
    generateRandomEvent(): void {       
        let gEvent: IEvent = {id: 0, eventName: "Scuba Diving", 
                                        eventType: "Activity", 
                                        eventStart: this.getISOString(new Date()), 
                                        eventEnd: this.getISOString(new Date()), 
                                        eventCity: "Bandos Island",
                                        eventState: "Maldives",
                                        eventCountry: "Maldvies",
                                        eventCost:"$110",
                                        eventComment: "Saw a small shark!"};

        this.eventForm.controls['eventName'].setValue(gEvent.eventName);
        this.eventForm.controls['eventName'].markAsDirty();
        this.eventForm.controls['eventType'].setValue(gEvent.eventType);
        this.eventForm.controls['eventType'].markAsDirty();
        this.eventForm.controls['eventStart'].setValue(gEvent.eventStart);
        this.eventForm.controls['eventStart'].markAsDirty();
        this.eventForm.controls['eventEnd'].setValue(gEvent.eventEnd);
        this.eventForm.controls['eventEnd'].markAsDirty();
        this.eventForm.controls['eventCity'].setValue(gEvent.eventCity);
        this.eventForm.controls['eventCity'].markAsDirty();
        this.eventForm.controls['eventState'].setValue(gEvent.eventState);
        this.eventForm.controls['eventState'].markAsDirty();
        this.eventForm.controls['eventCountry'].setValue(gEvent.eventCountry);
        this.eventForm.controls['eventCountry'].markAsDirty();
        this.eventForm.controls['eventCost'].setValue(gEvent.eventCost);
        this.eventForm.controls['eventCost'].markAsDirty();
        this.eventForm.controls['eventComment'].setValue(gEvent.eventComment);
        this.eventForm.controls['eventComment'].markAsDirty();
    }

    //Update form values with event data
    onEventRetrieved(event: IEvent): void {
        this.event = event;
        console.log("Component: attempting to add event: " + JSON.stringify(this.event));

        this.eventForm.patchValue({ eventName: this.event.eventName, 
                                    eventType: this.event.eventType,
                                    eventStart: this.event.eventStart,
                                    eventEnd: this.event.eventEnd,
                                    eventCity: this.event.eventCity,
                                    eventState: this.event.eventState,
                                    eventCountry: this.event.eventCountry,
                                    eventCost: this.event.eventCost,
                                    eventComment: this.event.eventComment})   

        console.log("done");                         
    }

    getISOString (aneventdate: Date): string {
        let dateISOformat = aneventdate.toISOString();
        let dateISOformatArray = dateISOformat.split("T");
        let dateISOformatDateOnly = dateISOformatArray[0];
        
        return dateISOformatDateOnly;
    }

    //Display successful save message for 1 second, then reset form entries and navigate to form
    onEventSaved(): void {
        this.statusMessage = "Saved";
        Observable.timer(1000).subscribe( x => this.statusMessage = "");
        this.eventForm.reset();
        this.router.navigate(['']);
    }

    gotoEventList(): void {
        this.router.navigate(['/eventlist']);
    }

    deleteEvent(): void {
        if (confirm(`Really delete the event: ${this.event.eventName}?`)) {
            this.serviceeventData.deleteEvent(this.event.id)
            .subscribe(
                () => this.onEventSaved(),
                (error: any) => this.errorMessage = <any>error
            );
        }
    }

    EventEditClick(): void {
        this.editMode = true;
        document.getElementsByName("formfieldset")[0].removeAttribute("disabled");
    }
}
