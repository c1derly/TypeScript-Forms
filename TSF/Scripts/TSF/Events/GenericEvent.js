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
         * UI event handeler with generic signatures (sender:sender, args:args)
         */
        var GenericEvent = (function (_super) {
            __extends(GenericEvent, _super);
            function GenericEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GenericEvent.prototype.fire = function (sender, args) {
                _super.prototype.fire.call(this, sender, args);
            };
            return GenericEvent;
        }(Events.EventHandler));
        Events.GenericEvent = GenericEvent;
    })(Events = TSF.Events || (TSF.Events = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=GenericEvent.js.map