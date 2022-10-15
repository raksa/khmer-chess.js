"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventHandler = /** @class */ (function () {
    function EventHandler(options) {
        this._onEventListeners = {};
        this._propEvent = [];
        this._isLockProp = false;
        this._onEventListeners = {};
        this._propEvent = [];
        this.events = options.events;
    }
    EventHandler.prototype.destroy = function () {
        this._onEventListeners = {};
        this._propEvent = [];
    };
    EventHandler.prototype._checkPropEvent = function () {
        if (this._isLockProp) {
            return;
        }
        while (this._propEvent.length) {
            var event = this._propEvent.shift();
            this._checkOnEvent(event.name, event.data);
        }
    };
    EventHandler.prototype._addPropEvent = function (event, data) {
        this._propEvent.push({
            name: event,
            data: data,
        });
        this._checkPropEvent();
    };
    EventHandler.prototype._guardEventName = function (eventName) {
        if (!eventName) {
            throw new Error('invalid event name');
        }
    };
    EventHandler.prototype._checkOnEvent = function (eventName, data) {
        this._guardEventName(eventName);
        this._onEventListeners[eventName] = this._onEventListeners[eventName] || [];
        this._onEventListeners[eventName].forEach(function (listener) {
            listener(data);
        });
    };
    EventHandler.prototype._addOnEventListener = function (eventName, listener) {
        this._guardEventName(eventName);
        this._onEventListeners[eventName] = this._onEventListeners[eventName] || [];
        this._onEventListeners[eventName].push(listener);
    };
    EventHandler.prototype._removeOnEventListener = function (eventName, listener) {
        this._guardEventName(eventName);
        this._onEventListeners[eventName] = this._onEventListeners[eventName] || [];
        var index = this._onEventListeners[eventName].indexOf(listener);
        ~index && this._onEventListeners[eventName].splice(index, 1);
    };
    return EventHandler;
}());
exports.default = EventHandler;
//# sourceMappingURL=EventHandler.js.map