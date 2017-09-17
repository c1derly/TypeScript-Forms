/// <reference path=".\EventHandler.ts" />
namespace TSF.Events {
    /**
     * Event handeler with no input arguments
     */
    export class EmptyEvent extends EventHandler<() => void>
    {
        public fire(): void
        {
            super.fire();
        }
    }
}  