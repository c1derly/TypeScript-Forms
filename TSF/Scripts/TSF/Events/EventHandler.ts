/// <reference path="..\Base\Exception.ts" />

namespace TSF.Events {

    /**
     * Generic event handeler
     */
    export class EventHandler<Func extends Function>
    {
        /** array of subscribers */
        protected events: Array<DS.Tuple> = [];
        /**
         * Adds a listener to the event object
         * @param method - method to call when the event is triggered
         * @param callBackObject - object to be used as the this when firing the event
         */
        add(method: Func, callBackObject: Object) {
            this.events.push(new DS.Tuple(method, callBackObject));
        }
        /**
         * Removes a subscription from the event object
         * @param method - method to unsubscribe
         * @param callBackObject - object that was listening that wants to unsubscribe
         */
        remove(method: Func, callBackObject: Object) {
            var count = this.events.length;
            this.events = this.events.filter(x => x.Item2 !== callBackObject && x.Item1 !== method);
            if (count === this.events.length)
                throw new Base.Exception("Event not found to remove");

        }
        /**
         * Clears all events from the event handeler
         */
        clearEvents() {
            this.events = [];
        }
        /**
         * Fires the event
         * @param args - the arguments to pass to the listening method.
         */
        fire(...args) {
            for (var i = 0; i < this.events.length; i++) {
                this.events[i].Item1.apply(this.events[i].Item2, args);
            }
        }
    }
} 