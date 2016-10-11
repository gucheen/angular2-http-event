import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

type HttpEventType = "START" | "FINISH";

export function httpEmitter(target, key, descriptor) {
    return Object.assign({}, descriptor, {
        value: function () {
            httpEventServiceFactory.emitHttpEvent('START');
            const subscription = descriptor.value.apply(this, arguments).share();
            subscription.subscribe(() => {
                httpEventServiceFactory.emitHttpEvent('FINISH');
            });
            return subscription;
        }
    });
}

@Injectable()
export class HttpEventService {
    private httpEvent = new BehaviorSubject<HttpEventType>(null);

    httpEventCenter = this.httpEvent.asObservable();

    constructor() {
    }

    emitHttpEvent(type: HttpEventType) {
        return this.httpEvent.next(type);
    }
}

export const httpEventServiceFactory = new HttpEventService();
