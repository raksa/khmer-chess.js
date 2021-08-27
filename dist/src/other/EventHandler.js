"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventHandler = /** @class */ (function () {
    function EventHandler(options) {
        this._onEventListeners = {};
        this._propEvent = [];
        this._onEventListeners = {};
        this._propEvent = [];
        this.events = options.events;
    }
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
/*
 * Copyright (c) 2021, K4us
 * Author: Raksa Eng <eng.raksa@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 *---------------------------------------------------------------------------- */ 
//# sourceMappingURL=EventHandler.js.map