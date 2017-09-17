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
            var WunderCell = (function (_super) {
                __extends(WunderCell, _super);
                function WunderCell(ele, logicalParent) {
                    var _this = _super.call(this, ele, logicalParent) || this;
                    _this.checkEmptyEle('td');
                    _this.textElement = new UI.TSControl(document.createElement('span'));
                    _this.Append(_this.textElement);
                    return _this;
                }
                Object.defineProperty(WunderCell.prototype, "Text", {
                    get: function () {
                        return this.textElement.Text;
                    },
                    set: function (val) {
                        this.textElement.Text = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                return WunderCell;
            }(UI.TSControl));
            Grid.WunderCell = WunderCell;
        })(Grid = UI.Grid || (UI.Grid = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=WunderCell.js.map