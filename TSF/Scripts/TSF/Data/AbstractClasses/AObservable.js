/// <reference path="..\..\Base\Exception.ts" />
/// <reference path="..\..\Events\ValueEvent.ts" />
var TSF;
(function (TSF) {
    var Data;
    (function (Data) {
        var AbstractClasses;
        (function (AbstractClasses) {
            /**
             * If an object inherits from this class it becomes observable.  Meaning you can listen for attribute changes on the object
             */
            var AObservable = (function () {
                function AObservable() {
                    /** holds a hashtable of events by attribute */
                    this.$events = {};
                    /** the event for if any value on the object has changed (does not work if the attribute was not defined with a value before hand) */
                    this.$objectChangeEvent = new TSF.Events.ValueEvent();
                    /** used to determine if the events have been created yet for this object */
                    this.$regEvents = false;
                    /** is set to true if the any value on the object has changed */
                    this.$dirty = false;
                }
                /**
                 * Sets the value of an object without triggering an event
                 * @param attr - attribute to set
                 * @param val - value to set the attribute to
                 */
                AObservable.prototype.$setAttributeWithoutEvent = function (attr, val) {
                    Data.Observer.$setValueNoEvent(this, attr, val);
                };
                /**
                 * Observes a speific attribute of an object
                 * @param callBackObject - object listening
                 * @param method - method to call when the attribute has changed
                 * @param attribute - the attribute to listen for (optional.  If left blank triggers the method on any attribute change)
                 */
                AObservable.prototype.$observe = function (callBackObject, method, attribute) {
                    Data.Observer.$observe(this, callBackObject, method, attribute);
                };
                /**
                 * Stops observing a the objects event
                 * @param callBackObject - the object that was listening
                 * @param method - the method that should no longer be called on value change
                 * @param attribute - the attribute to stop listening to (optional.  If left blank will stop listening to object change events)
                 */
                AObservable.prototype.$stopObserving = function (callBackObject, method, attribute) {
                    Data.Observer.$stopObserving(this, callBackObject, method, attribute);
                };
                return AObservable;
            }());
            AbstractClasses.AObservable = AObservable;
        })(AbstractClasses = Data.AbstractClasses || (Data.AbstractClasses = {}));
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=AObservable.js.map