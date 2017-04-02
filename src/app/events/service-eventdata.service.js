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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/map');
require('rxjs/add/observable/of');
var ServiceEventData = (function () {
    function ServiceEventData(http) {
        this.http = http;
        this.baseUrl = 'api/events';
    }
    ServiceEventData.prototype.getEvents = function () {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .do(function (data) { return console.log('getEvents: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ServiceEventData.prototype.getEvent = function (id) {
        if (id === 0) {
            return Observable_1.Observable.of(this.initializeEvent());
        }
        var url = this.baseUrl + "/" + id;
        return this.http.get(url)
            .map(this.extractData)
            .do(function (data) { return console.log('getEvent: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ServiceEventData.prototype.deleteEvent = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.baseUrl + "/" + id;
        return this.http.delete(url, options)
            .do(function (data) { return console.log('deleteEvent: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ServiceEventData.prototype.saveEvent = function (event) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        if (event.id === 0) {
            return this.createEvent(event, options);
        }
        return this.updateEvent(event, options);
    };
    ServiceEventData.prototype.createEvent = function (event, options) {
        event.id = undefined;
        return this.http.post(this.baseUrl, event, options)
            .map(this.extractData)
            .do(function (data) { return console.log('createEvent: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ServiceEventData.prototype.updateEvent = function (event, options) {
        var url = this.baseUrl + "/" + event.id;
        return this.http.put(url, event, options)
            .map(function () { return event; })
            .do(function (data) { return console.log('updateEvent: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ServiceEventData.prototype.extractData = function (response) {
        var body = response.json();
        return body.data || {};
    };
    ServiceEventData.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    ServiceEventData.prototype.initializeEvent = function () {
        return {
            id: 0,
            eventName: null,
            eventType: null
        };
    };
    ServiceEventData = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ServiceEventData);
    return ServiceEventData;
}());
exports.ServiceEventData = ServiceEventData;
//# sourceMappingURL=service-eventdata.service.js.map