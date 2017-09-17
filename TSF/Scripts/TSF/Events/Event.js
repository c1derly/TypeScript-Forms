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
         * Standard event handeler with generic types signature (sender:any, args:any)
         */
        var Event = (function (_super) {
            __extends(Event, _super);
            function Event() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Event.prototype.fire = function (sender, args) {
                _super.prototype.fire.call(this, sender, args);
            };
            return Event;
        }(Events.EventHandler));
        Events.Event = Event;
    })(Events = TSF.Events || (TSF.Events = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=Event.js.map