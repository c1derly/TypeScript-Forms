/// <reference path=".\EventHandler.ts" />
namespace TSF.Events {
    /**
     * UI event handeler with generic signatures (sender:sender, args:args)
     */
    export class GenericEvent<sender,args> extends EventHandler<(sender: sender, args: args) => void>
    {
        public fire(sender: sender, args: args): void {
            super.fire(sender, args);
        }
    }
}   