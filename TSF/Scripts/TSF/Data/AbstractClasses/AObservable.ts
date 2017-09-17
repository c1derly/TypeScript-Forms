/// <reference path="..\..\Base\Exception.ts" />
/// <reference path="..\..\Events\ValueEvent.ts" />
namespace TSF.Data.AbstractClasses {
    import Exception = TSF.Base.Exception
    /**
     * If an object inherits from this class it becomes observable.  Meaning you can listen for attribute changes on the object
     */
    export abstract class AObservable<T>  {
        /** holds a hashtable of events by attribute */
        protected $events: any = {};
        /** the event for if any value on the object has changed (does not work if the attribute was not defined with a value before hand) */
        protected $objectChangeEvent = new Events.ValueEvent<T>();
        /** used to determine if the events have been created yet for this object */
        protected $regEvents = false;
        /** is set to true if the any value on the object has changed */
        public $dirty = false;

        /**
         * Sets the value of an object without triggering an event
         * @param attr - attribute to set
         * @param val - value to set the attribute to
         */
        public $setAttributeWithoutEvent(attr: string, val:any)
        {
            Observer.$setValueNoEvent(this, attr, val);
        }
        /**
         * Observes a speific attribute of an object
         * @param callBackObject - object listening
         * @param method - method to call when the attribute has changed
         * @param attribute - the attribute to listen for (optional.  If left blank triggers the method on any attribute change)
         */
        public $observe(callBackObject: Object, method: (object: T) => void, attribute?: string): void {
            Observer.$observe(this, callBackObject, method, attribute);
        }

        /**
         * Stops observing a the objects event
         * @param callBackObject - the object that was listening
         * @param method - the method that should no longer be called on value change
         * @param attribute - the attribute to stop listening to (optional.  If left blank will stop listening to object change events)
         */
        public $stopObserving(callBackObject: Object, method: (object: T) => void, attribute?: string): void {
            Observer.$stopObserving(this, callBackObject, method, attribute);
        }
    }
}