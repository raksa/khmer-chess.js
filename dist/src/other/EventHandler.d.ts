export declare type ListenerType<T> = (data?: T) => any;
export default class EventHandler {
    _onEventListeners: {
        [key: string]: any;
    };
    _propEvent: any;
    events: any;
    _isLockProp: boolean;
    constructor(options: {
        events: any;
    });
    _checkPropEvent(): void;
    _addPropEvent(event: string, data?: any): void;
    _guardEventName(eventName?: string): void;
    _checkOnEvent(eventName: string, data?: any): void;
    _addOnEventListener(eventName: string, listener: ListenerType<any>): void;
    _removeOnEventListener(eventName: string, listener: ListenerType<any>): void;
}
