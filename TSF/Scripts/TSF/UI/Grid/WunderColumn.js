var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="..\Column.ts" />
var TSF;
(function (TSF) {
    var UI;
    (function (UI) {
        var Grid;
        (function (Grid) {
            /**
             *  Used to specify columns for the wunder grid.
             */
            var WunderColumn = (function (_super) {
                __extends(WunderColumn, _super);
                /**
                 * Used to specify columns for the wunder grid.
                 * @param dataField - attribute of the object to bind the the cell for the given column
                 * @param headerText - Header text to display in the table header for the given column
                 * @param dataType - Data type of the column.  Only important if you are using a DateTime or you are allowing editing to your grid.
                The date format is applied if it is a date time.  During editing booleans are given checkboxes and values are validated
                Against their respective data type before being accepted
                 * @param dateFormat - reference http://blog.stevenlevithan.com/archives/date-time-format for more information
                 * @param generateCell - generate custom content for a cell
                 */
                function WunderColumn(dataField, displayText, dataType, width, dateFormat, editable, customCell, customEditCell, customHeader) {
                    var _this = _super.call(this, dataField, displayText, dataType) || this;
                    /** determines if the particular column is editable.  Default = true */
                    _this.editable = true;
                    /** reference http://blog.stevenlevithan.com/archives/date-time-format for more information */
                    _this.dateFormat = '';
                    _this.editable = editable;
                    _this.dateFormat = dateFormat;
                    _this.customCell = customCell;
                    _this.customHeader = customHeader;
                    _this.customEditCell = customEditCell;
                    _this.width = width;
                    return _this;
                }
                return WunderColumn;
            }(UI.Column));
            Grid.WunderColumn = WunderColumn;
        })(Grid = UI.Grid || (UI.Grid = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=WunderColumn.js.map