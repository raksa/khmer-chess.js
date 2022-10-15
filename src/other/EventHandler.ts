/*
 * Copyright (c) 2021-2022, K4us
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
export type ListenerType<T> = (data: T) => any;

export default class EventHandler {
    _onEventListeners: { [key: string]: any } = {};
    _propEvent: any = [];
    events: any;
    _isLockProp: boolean = false;
    constructor(options: { events: any }) {
        this._onEventListeners = {};
        this._propEvent = [];
        this.events = options.events;
    }

    public destroy(){
        this._onEventListeners = {};
        this._propEvent = [];
    }

    _checkPropEvent() {
        if (this._isLockProp) {
            return;
        }
        while (this._propEvent.length) {
            const event = this._propEvent.shift();
            this._checkOnEvent(event.name, event.data);
        }
    }

    _addPropEvent(event: string, data?: any) {
        this._propEvent.push({
            name: event,
            data,
        });
        this._checkPropEvent();
    }

    _guardEventName(eventName?: string) {
        if (!eventName) {
            throw new Error('invalid event name');
        }
    }

    _checkOnEvent(eventName: string, data?: any) {
        this._guardEventName(eventName);
        this._onEventListeners[eventName] = this._onEventListeners[eventName] || [];
        this._onEventListeners[eventName].forEach((listener: ListenerType<any>) => {
            listener(data);
        });
    }

    _addOnEventListener(eventName: string, listener: ListenerType<any>) {
        this._guardEventName(eventName);
        this._onEventListeners[eventName] = this._onEventListeners[eventName] || [];
        this._onEventListeners[eventName].push(listener);
    }

    _removeOnEventListener(eventName: string, listener: ListenerType<any>) {
        this._guardEventName(eventName);
        this._onEventListeners[eventName] = this._onEventListeners[eventName] || [];
        const index = this._onEventListeners[eventName].indexOf(listener);
        ~index && this._onEventListeners[eventName].splice(index, 1);
    }
}
