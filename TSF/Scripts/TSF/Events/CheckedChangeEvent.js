var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path=".\EventHandler.ts" />
var TSF;
(function (TSF) {
    var Events;
    (function (Events) {
        /**
         * Event handeler specifically for check changed event.  Takes a sender:UI.Checkbox,checked:boolean and args:any for input
         */
        var CheckedChangedEvent = (function (_super) {
            __extends(CheckedChangedEvent, _super);
            function CheckedChangedEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * event to trigger the method
             * @param sender - the object to fire the event for
             * @param args - the additional arguments to pass in
             */
            CheckedChangedEvent.prototype.fire = function (sender, args) {
                _super.prototype.fire.call(this, sender, sender.Checked, args);
            };
            return CheckedChangedEvent;
        }(Events.EventHandler));
        Events.CheckedChangedEvent = CheckedChangedEvent;
    })(Events = TSF.Events || (TSF.Events = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=CheckedChangeEvent.js.map