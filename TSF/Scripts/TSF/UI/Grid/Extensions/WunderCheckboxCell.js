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
                /**
                 *  Used by the wundergrid when no editable cell method is provided by the column to generate an editable checkbox cell
                 */
                var WunderCheckboxCell = (function (_super) {
                    __extends(WunderCheckboxCell, _super);
                    function WunderCheckboxCell() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    /** generates the cell */
                    WunderCheckboxCell.prototype.generateCell = function (value, column, row, grid) {
                        var _this = this;
                        var cell = new Grid.WunderCell();
                        var cbx = new UI.Checkbox();
                        cbx.Indeterminate = true;
                        cbx.context.row = row;
                        cbx.context.col = column;
                        cbx.OnCheckedChanged.add(function () { return _this.changeValue(cbx, cbx.Checked); }, this);
                        if (value !== null && value !== undefined)
                            cbx.Checked = value;
                        cell.Append(cbx);
                        return cell;
                    };
                    return WunderCheckboxCell;
                }(Extensions.BaseEditableCell));
                Extensions.WunderCheckboxCell = WunderCheckboxCell;
            })(Extensions = Grid.Extensions || (Grid.Extensions = {}));
        })(Grid = UI.Grid || (UI.Grid = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=WunderCheckboxCell.js.map