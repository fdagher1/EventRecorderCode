import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

import { GenericValidator } from '../shared/generic-validator';

import { IEvent } from './model-event';
import { eventTypes } from './model-event';
import { ServiceEventData } from './service-eventdata.service';

@Component ({
    templateUrl: './eventedit.component.html'
})
export class EventEditComponent implements OnInit, AfterViewInit, OnDestroy {
    //Variables used for validators
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    //Used to display a message when an error occurs while getting or updating events through the event service
    errorMessage: string;

    //Used to display successful entering of random event
    statusMessage: string;

    //Used to check if the eventedit view is for a new event or edit event
    eventIdFromRouter;

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

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private serviceeventData: ServiceEventData) {

        //Define validation messages
        this.validationMessages = { 
            eventType: {
                required: 'Event name is required.'
            },
            eventName: { required: 'Event name is required.', minlength: 'Event name must be at least three characters', maxlength: 'Event name cannot exceed 50 characters.'
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
        console.log("ngOnInit");
        //Create Reactive Form
        this.eventForm = this.fb.group({
            eventType: ['', Validators.required],
            eventName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            eventStart: ['', Validators.required],
            eventEnd: ['', Validators.required],
            eventCity: ['', Validators.required],
            eventState: ['', Validators.required],
            eventCountry: ['', Validators.required],
            eventCost: [''],
            eventComment: ['']
        });

        //Get the event id that is passed through the URL, and then get the corresponding event to populate sheet with event data. If id=0, put sheet in edit mode
        this.sub = this.route.params.subscribe(
            params => {
                if (isNaN(+params['id'])) { 
                    this.eventIdFromRouter = 0;
                }
                else {
                    this.eventIdFromRouter = +params['id'];
                }

                this.getEvent(this.eventIdFromRouter);
                
                if (this.eventIdFromRouter==0) {
                    this.EditButtonClick();
                }
            }
        );
    }

    ngAfterViewInit(): void {
        console.log("ngAfterViewInit");
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.eventForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => { 
            this.displayMessage = this.genericValidator.processMessages(this.eventForm);
        });    
    }

    //When done editing the event data, unsubscribe 
    ngOnDestroy(): void {
        console.log("ngOnDestroy");
        this.sub.unsubscribe();
    }


    EditButtonClick(): void {
        this.editMode = true;
        document.getElementsByName("formfieldset")[0].removeAttribute("disabled");
    }
    
    //If event form has data which is valid, merge it with what the event object initially had, then send it to save data service
    SaveFormButtonClick(): void {
        if (this.eventForm.dirty && this.eventForm.valid) {
            let e = Object.assign({}, this.event, this.eventForm.value);
            
            this.serviceeventData.saveEvent(e).subscribe(() => this.onEventSaved(), (error: any) => this.errorMessage = <any>error);

            //Reroute to this in order to refill the form with the default values
            this.router.navigate(['/edit/0']);
        } 
    }

    EventListButtonClick(): void {
        this.router.navigate(['/eventlist']);
    }

    DeleteButtonClick(): void {
        if (confirm(`Really delete the event: ${this.event.eventName}?`)) {
            this.serviceeventData.deleteEvent(this.event.id).subscribe(() => this.onEventSaved(), (error: any) => this.errorMessage = <any>error);
        }
    }

    //Create random event object and add to view
    GenerateButtonClick(): void {       
        let generatedEvent: IEvent = {id: 0, eventType: "Activity",
                                        eventName: "Scuba Diving", 
                                        eventStart: (new Date()).toISOString().split("T")[0], 
                                        eventEnd: (new Date()).toISOString().split("T")[0], 
                                        eventCity: "Bandos Island",
                                        eventState: "Maldives",
                                        eventCountry: "Maldvies",
                                        eventCost:"$110",
                                        eventComment: "Saw a small shark!"};

        this.eventForm.controls['eventName'].setValue(generatedEvent.eventName);
        this.eventForm.controls['eventName'].markAsDirty();
        this.eventForm.controls['eventType'].setValue(generatedEvent.eventType);
        this.eventForm.controls['eventType'].markAsDirty();
        this.eventForm.controls['eventStart'].setValue(generatedEvent.eventStart);
        this.eventForm.controls['eventStart'].markAsDirty();
        this.eventForm.controls['eventEnd'].setValue(generatedEvent.eventEnd);
        this.eventForm.controls['eventEnd'].markAsDirty();
        this.eventForm.controls['eventCity'].setValue(generatedEvent.eventCity);
        this.eventForm.controls['eventCity'].markAsDirty();
        this.eventForm.controls['eventState'].setValue(generatedEvent.eventState);
        this.eventForm.controls['eventState'].markAsDirty();
        this.eventForm.controls['eventCountry'].setValue(generatedEvent.eventCountry);
        this.eventForm.controls['eventCountry'].markAsDirty();
        this.eventForm.controls['eventCost'].setValue(generatedEvent.eventCost);
        this.eventForm.controls['eventCost'].markAsDirty();
        this.eventForm.controls['eventComment'].setValue(generatedEvent.eventComment);
        this.eventForm.controls['eventComment'].markAsDirty();
    }

    //Requests the event from the dataservice and updates the form accordingly
    private getEvent(id: number): void {
        this.serviceeventData.getEvent(id).subscribe((event: IEvent) => this.onEventRetrieved(event),(error: any) => this.errorMessage = <any>error);
    }

    //Update form values with event data
    private onEventRetrieved(event: IEvent): void {
        //The below entryis needed, otherwise, a message "id is missing" (or the like) appears 
        this.event = event;

        this.eventForm.patchValue({ eventType: event.eventType,
                                    eventName: event.eventName,
                                    eventStart: event.eventStart,
                                    eventEnd: event.eventEnd,
                                    eventCity: event.eventCity,
                                    eventState: event.eventState,
                                    eventCountry: event.eventCountry,
                                    eventCost: event.eventCost,
                                    eventComment: event.eventComment})                         
    }

    //Display successful save message for 1 second, then reset form entries and navigate to form
    private onEventSaved(): void {
        this.statusMessage = "Saved";
        Observable.timer(1000).subscribe( x => this.statusMessage = "");
        this.eventForm.reset();
        this.router.navigate(['']);
    }
}
