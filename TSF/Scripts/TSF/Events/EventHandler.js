/// <reference path="..\Base\Exception.ts" />
var TSF;
(function (TSF) {
    var Events;
    (function (Events) {
        /**
         * Generic event handeler
         */
        var EventHandler = (function () {
            function EventHandler() {
                /** array of subscribers */
                this.events = [];
            }
            /**
             * Adds a listener to the event object
             * @param method - method to call when the event is triggered
             * @param callBackObject - object to be used as the this when firing the event
             */
            EventHandler.prototype.add = function (method, callBackObject) {
                this.events.push(new TSF.DS.Tuple(method, callBackObject));
            };
            /**
             * Removes a subscription from the event object
             * @param method - method to unsubscribe
             * @param callBackObject - object that was listening that wants to unsubscribe
             */
            EventHandler.prototype.remove = function (method, callBackObject) {
                var count = this.events.length;
                this.events = this.events.filter(function (x) { return x.Item2 !== callBackObject && x.Item1 !== method; });
                if (count === this.events.length)
                    throw new TSF.Base.Exception("Event not found to remove");
            };
            /**
             * Clears all events from the event handeler
             */
            EventHandler.prototype.clearEvents = function () {
                this.events = [];
            };
            /**
             * Fires the event
             * @param args - the arguments to pass to the listening method.
             */
            EventHandler.prototype.fire = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                for (var i = 0; i < this.events.length; i++) {
                    this.events[i].Item1.apply(this.events[i].Item2, args);
                }
            };
            return EventHandler;
        }());
        Events.EventHandler = EventHandler;
    })(Events = TSF.Events || (TSF.Events = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=EventHandler.js.map