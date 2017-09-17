/// <reference path=".\EventHandler.ts" />
namespace TSF.Events {
     /**
     * UI event handeler with specific signatures (sender:UI.TSControl, args:any)
     */
    export class UIEvent extends EventHandler<(sender: UI.TSControl, args: any) => void>
    {
        public fire(sender: UI.TSControl, args: any): void {
            super.fire(sender, args);
        }
    }
}