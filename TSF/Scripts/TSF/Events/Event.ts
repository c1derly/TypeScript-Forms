/// <reference path=".\EventHandler.ts" />
namespace TSF.Events {
    /**
     * Standard event handeler with generic types signature (sender:any, args:any)
     */
    export class Event extends EventHandler<(sender: any, args: any) => void>
    {
        public fire(sender:any,args:any): void {
            super.fire(sender,args);
        }
    }
} 