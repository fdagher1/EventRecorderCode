"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/observable/fromEvent');
require('rxjs/add/observable/merge');
var Observable_1 = require('rxjs/Observable');
var generic_validator_1 = require('../shared/generic-validator');
var service_eventdata_service_1 = require('./service-eventdata.service');
var EventEditComponent = (function () {
    function EventEditComponent(fb, route, router, serviceeventData) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.serviceeventData = serviceeventData;
        this.displayMessage = {};
        this.validationMessages = {
            eventName: {
                required: 'Event name is required.',
                minlength: 'Event name must be at least three characters',
                maxlength: 'Event name cannot exceed 50 characters.'
            },
            eventType: {
                required: 'Event name is required.'
            }
        };
        this.genericValidator = new generic_validator_1.GenericValidator(this.validationMessages);
    }
    EventEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.eventForm = this.fb.group({
            eventName: ['', [forms_1.Validators.required,
                    forms_1.Validators.minLength(3),
                    forms_1.Validators.maxLength(50)]],
            eventType: ['', forms_1.Validators.required]
        });
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['id'];
            _this.getEvent(id);
        });
    };
    EventEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    EventEditComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Watch for the blur event from any input element on the form.
        var controlBlurs = this.formInputElements
            .map(function (formControl) { return Observable_1.Observable.fromEvent(formControl.nativeElement, 'blur'); });
        // Merge the blur event observable with the valueChanges observable
        Observable_1.Observable.merge.apply(Observable_1.Observable, [this.eventForm.valueChanges].concat(controlBlurs)).debounceTime(800).subscribe(function (value) {
            _this.displayMessage = _this.genericValidator.processMessages(_this.eventForm);
        });
    };
    EventEditComponent.prototype.getEvent = function (id) {
        var _this = this;
        this.serviceeventData.getEvent(id)
            .subscribe(function (event) { return _this.onEventRetrieved(event); }, function (error) { return _this.errorMessage = error; });
    };
    EventEditComponent.prototype.onEventRetrieved = function (event) {
        if (this.eventForm) {
            this.eventForm.reset();
        }
        this.event = event;
        this.eventForm.patchValue({
            eventName: this.event.eventName,
            eventType: this.event.eventType
        });
    };
    EventEditComponent.prototype.deleteEvent = function () {
        var _this = this;
        if (this.event.id === 0) {
            this.onSaveComplete();
        }
        else {
            if (confirm("Really delete the event: " + this.event.eventName + "?")) {
                this.serviceeventData.deleteEvent(this.event.id)
                    .subscribe(function () { return _this.onSaveComplete(); }, function (error) { return _this.errorMessage = error; });
            }
        }
    };
    EventEditComponent.prototype.saveEvent = function () {
        var _this = this;
        if (this.eventForm.dirty && this.eventForm.valid) {
            var e = Object.assign({}, this.event, this.eventForm.value);
            this.serviceeventData.saveEvent(e)
                .subscribe(function () { return _this.onSaveComplete(); }, function (error) { return _this.errorMessage = error; });
        }
        else if (!this.eventForm.dirty) {
            this.onSaveComplete();
        }
    };
    EventEditComponent.prototype.onSaveComplete = function () {
        this.eventForm.reset();
        this.router.navigate(['/eventlist']);
    };
    __decorate([
        core_1.ViewChildren(forms_1.FormControlName, { read: core_1.ElementRef }), 
        __metadata('design:type', Array)
    ], EventEditComponent.prototype, "formInputElements", void 0);
    EventEditComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/Events/eventedit.component.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.ActivatedRoute, router_1.Router, service_eventdata_service_1.ServiceEventData])
    ], EventEditComponent);
    return EventEditComponent;
}());
exports.EventEditComponent = EventEditComponent;
//# sourceMappingURL=eventedit.component.js.map