/// <reference path=".\EventHandler.ts" />
namespace TSF.Events {
    /**
     * Basic event with one argument that can be dynamically typed.
     */
    export class ValueEvent<T> extends EventHandler<(value:T) => void>
    {
        /**
         * Fires the event
         * @param value - the value to be passed into the listening methods.
         */
        public fire(value:T): void {
            super.fire(value);
        }
    }
} 