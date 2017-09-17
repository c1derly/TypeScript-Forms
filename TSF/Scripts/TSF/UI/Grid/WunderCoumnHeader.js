var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="..\TSControl.ts" />
var TSF;
(function (TSF) {
    var UI;
    (function (UI) {
        var Grid;
        (function (Grid) {
            /**
             * Object that represents a cell in the wundergrid.  Has a reference to the underlying cell
             */
            var WunderColumnHeader = (function (_super) {
                __extends(WunderColumnHeader, _super);
                function WunderColumnHeader(ele, logicalParent) {
                    var _this = _super.call(this, ele, logicalParent) || this;
                    _this.checkEmptyEle('th');
                    return _this;
                }
                return WunderColumnHeader;
            }(UI.TSControl));
            Grid.WunderColumnHeader = WunderColumnHeader;
        })(Grid = UI.Grid || (UI.Grid = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=WunderCoumnHeader.js.map