"use strict";
var DataEvent = (function () {
    function DataEvent() {
    }
    DataEvent.prototype.createDb = function () {
        var events = [
            {
                'id': 1,
                'eventName': 'Yanni Concert',
                'eventType': 'Show'
            },
            {
                'id': 2,
                'eventName': 'Ski at Liberty M',
                'eventType': 'Sports'
            },
            {
                'id': 3,
                'eventName': 'Steakhouse',
                'eventType': 'Restaurant'
            }
        ];
        return { events: events };
    };
    return DataEvent;
}());
exports.DataEvent = DataEvent;
//# sourceMappingURL=data-event.js.map