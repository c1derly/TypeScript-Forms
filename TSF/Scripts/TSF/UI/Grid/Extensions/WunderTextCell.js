var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="BaseEditableCell.ts" />
var TSF;
(function (TSF) {
    var UI;
    (function (UI) {
        var Grid;
        (function (Grid) {
            var Extensions;
            (function (Extensions) {
                var WunderTextCell = (function (_super) {
                    __extends(WunderTextCell, _super);
                    function WunderTextCell() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    WunderTextCell.prototype.generateCell = function (value, column, row, grid) {
                        var _this = this;
                        var cell = new Grid.WunderCell();
                        var txt = new UI.TextBox();
                        txt.element.style.width = "95%";
                        txt.context.row = row;
                        txt.context.col = column;
                        txt.OnTextChange.add(function () { return _this.changeValue(txt, txt.Value); }, this);
                        if (value !== null && value !== undefined)
                            txt.Value = value.toString();
                        cell.Append(txt);
                        return cell;
                    };
                    return WunderTextCell;
                }(Extensions.BaseEditableCell));
                Extensions.WunderTextCell = WunderTextCell;
            })(Extensions = Grid.Extensions || (Grid.Extensions = {}));
        })(Grid = UI.Grid || (UI.Grid = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=WunderTextCell.js.map