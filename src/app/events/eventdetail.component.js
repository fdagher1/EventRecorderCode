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
var router_1 = require('@angular/router');
var service_eventdata_service_1 = require('./service-eventdata.service');
var EventDetailComponent = (function () {
    function EventDetailComponent(route, router, serviceeventData) {
        this.route = route;
        this.router = router;
        this.serviceeventData = serviceeventData;
    }
    EventDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['id'];
            _this.getEvent(id);
        });
    };
    EventDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    EventDetailComponent.prototype.getEvent = function (id) {
        var _this = this;
        this.serviceeventData.getEvent(id).subscribe(function (event) { return _this.event = event; }, function (error) { return _this.errorMessage = error; });
    };
    EventDetailComponent.prototype.onBack = function () {
        this.router.navigate(['/eventlist']);
    };
    EventDetailComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/Events/eventdetail.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, service_eventdata_service_1.ServiceEventData])
    ], EventDetailComponent);
    return EventDetailComponent;
}());
exports.EventDetailComponent = EventDetailComponent;
//# sourceMappingURL=eventdetail.component.js.map