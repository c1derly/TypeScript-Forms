/// <reference path="..\TSControl.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="Extensions\WunderTextCell.ts" />
/// <reference path="Extensions\WunderTextCell.ts" />
var TSF;
(function (TSF) {
    var UI;
    (function (UI) {
        var Grid;
        (function (Grid) {
            var WunderRow = (function (_super) {
                __extends(WunderRow, _super);
                function WunderRow(ele, logicalParent) {
                    var _this = _super.call(this, ele, logicalParent) || this;
                    /** cells of the row */
                    _this.cells = [];
                    _this.checkEmptyEle('tr');
                    return _this;
                }
                Object.defineProperty(WunderRow.prototype, "Editing", {
                    get: function () {
                        return this.editing;
                    },
                    set: function (editing) {
                        this.editing = editing;
                        this.emptyContent();
                        if (this.data)
                            this.createCells();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WunderRow.prototype, "Data", {
                    get: function () {
                        return this.data;
                    },
                    set: function (data) {
                        this.data = data;
                        this.createCells();
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Creates the cells in the row based off of the columns.  the columns have to be set first before the data is set for this method to work.
                 */
                WunderRow.prototype.createCells = function () {
                    var data = this.data;
                    if (data) {
                        var len = this.columns.length;
                        this.cells = new Array(len);
                        var cells = this.cells;
                        for (var i = 0; i < len; i++) {
                            var column = this.columns[i];
                            var val = this.data;
                            val = eval('val.' + column.dataField.replace(/[;\r\n]*/g, ''));
                            if (column.dataType === UI.ColumnType.DateTime) {
                                var format;
                                if (!column.dateFormat)
                                    format = "mm/dd/yyyy HH:MM:ss";
                                else
                                    format = column.dateFormat;
                                val = TSF.Utilities.DateFormatter.formatDate(new Date(val), format);
                            }
                            var cell;
                            if (this.editing === true) {
                                if (column.customEditCell)
                                    cell = column.customEditCell.generateCell(val, column, this, this.grid);
                                else {
                                    if (column.dataType === UI.ColumnType.Boolean)
                                        cell = WunderRow.editableCheckCellGenerator.generateCell(val, column, this, this.grid);
                                    else
                                        cell = WunderRow.editableTextCellGenerator.generateCell(val, column, this, this.grid);
                                }
                            }
                            else if (column.customCell)
                                cell = column.customCell.generateCell(val, column, this, this.grid);
                            else {
                                cell = new Grid.WunderCell();
                                cell.Text = val;
                                if (column.width)
                                    cell.jElement.width(column.width);
                            }
                            cell.column = column;
                            cell.row = this;
                            cells[i] = cell;
                            this.Append(cell);
                        }
                    }
                };
                return WunderRow;
            }(UI.TSControl));
            WunderRow.editableTextCellGenerator = new Grid.Extensions.WunderTextCell();
            WunderRow.editableCheckCellGenerator = new Grid.Extensions.WunderCheckboxCell();
            Grid.WunderRow = WunderRow;
        })(Grid = UI.Grid || (UI.Grid = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=WunderRow.js.map