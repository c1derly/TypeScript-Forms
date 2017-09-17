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
         * Event handeler with no input arguments
         */
        var EmptyEvent = (function (_super) {
            __extends(EmptyEvent, _super);
            function EmptyEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            EmptyEvent.prototype.fire = function () {
                _super.prototype.fire.call(this);
            };
            return EmptyEvent;
        }(Events.EventHandler));
        Events.EmptyEvent = EmptyEvent;
    })(Events = TSF.Events || (TSF.Events = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=EmptyEvent.js.map