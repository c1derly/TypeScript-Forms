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
         * Basic event with one argument that can be dynamically typed.
         */
        var ValueEvent = (function (_super) {
            __extends(ValueEvent, _super);
            function ValueEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * Fires the event
             * @param value - the value to be passed into the listening methods.
             */
            ValueEvent.prototype.fire = function (value) {
                _super.prototype.fire.call(this, value);
            };
            return ValueEvent;
        }(Events.EventHandler));
        Events.ValueEvent = ValueEvent;
    })(Events = TSF.Events || (TSF.Events = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=ValueEvent.js.map