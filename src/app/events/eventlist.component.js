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
var service_eventdata_service_1 = require('./service-eventdata.service');
var EventListComponent = (function () {
    function EventListComponent(serviceeventData) {
        this.serviceeventData = serviceeventData;
    }
    EventListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.serviceeventData.getEvents()
            .subscribe(function (events) { return _this.events = events; }, function (error) { return _this.errorMessage = error; });
    };
    EventListComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/events/eventlist.component.html'
        }), 
        __metadata('design:paramtypes', [service_eventdata_service_1.ServiceEventData])
    ], EventListComponent);
    return EventListComponent;
}());
exports.EventListComponent = EventListComponent;
//# sourceMappingURL=eventlist.component.js.map