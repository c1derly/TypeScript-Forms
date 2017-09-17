var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="..\Events\EventHandler.ts" />
var TSF;
(function (TSF) {
    var Data;
    (function (Data) {
        /**
         * An event fired when a data source has its page changed
         */
        var PageChangeEvent = (function (_super) {
            __extends(PageChangeEvent, _super);
            function PageChangeEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * Fires the page change event
             * @param pageNum - the page being changed to
             * @param maxRecords - the max number of records available to make pages from
             */
            PageChangeEvent.prototype.fire = function (pageNum, maxRecords) {
                _super.prototype.fire.call(this, pageNum, maxRecords);
            };
            return PageChangeEvent;
        }(TSF.Events.EventHandler));
        Data.PageChangeEvent = PageChangeEvent;
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=PageChangeEvent.js.map