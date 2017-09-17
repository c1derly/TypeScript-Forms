/// <reference path=".\EventHandler.ts" />
namespace TSF.Events {
    /**
     * Event handeler specifically for check changed event.  Takes a sender:UI.Checkbox,checked:boolean and args:any for input
     */
    export class CheckedChangedEvent extends EventHandler<(sender: UI.Checkbox, checked: boolean, args: any) => void>
    {
        /**
         * event to trigger the method
         * @param sender - the object to fire the event for
         * @param args - the additional arguments to pass in
         */
        public fire(sender: UI.Checkbox, args: any): void {
            super.fire(sender, sender.Checked, args);
        }
    }
}