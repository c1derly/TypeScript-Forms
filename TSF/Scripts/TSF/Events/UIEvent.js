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
        * UI event handeler with specific signatures (sender:UI.TSControl, args:any)
        */
        var UIEvent = (function (_super) {
            __extends(UIEvent, _super);
            function UIEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            UIEvent.prototype.fire = function (sender, args) {
                _super.prototype.fire.call(this, sender, args);
            };
            return UIEvent;
        }(Events.EventHandler));
        Events.UIEvent = UIEvent;
    })(Events = TSF.Events || (TSF.Events = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=UIEvent.js.map