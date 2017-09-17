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
             * Used to resize grid columns in the wunder grid
             */
            var Resizer = (function (_super) {
                __extends(Resizer, _super);
                /**
                 * Used to resize grid columns in the wunder grid
                 * @param element - element to use as the resizer
                 * @param grid - the grid being resized
                 * @param cell - header cell to be resized
                 * @param width
                 */
                function Resizer(element, grid, cell, left, width, index) {
                    var _this = _super.call(this, element) || this;
                    _this.index = index;
                    _this.grid = grid;
                    _this.headerCell = cell;
                    _this.width = width;
                    var me = _this;
                    var style = _this.Style;
                    style.cursor = 'col-resize';
                    _this.left = left;
                    //if (float === 'left')
                    //    style.margin = '0px 0px 0px -2px';
                    //else
                    //    style.margin = '0px -2px 0px 0px';
                    _this.Style.position = 'absolute';
                    cell.Style.position = 'relative';
                    _this.rePosition();
                    _this.Style.top = '0px';
                    style.width = width + 'px';
                    style.height = '100%';
                    style.display = 'inline-block';
                    //style.cssFloat = float;
                    _this.jElement.mouseup(function () { return _this.grid.context.selectedResizer = undefined; });
                    _this.jElement.mousedown(function (event) {
                        me.mouseDown(event);
                    });
                    _this.OnDoubleClick.add(_this.doubleClick, _this);
                    return _this;
                }
                Resizer.prototype.rePosition = function () {
                    var _this = this;
                    var padding = 0;
                    setTimeout(function () {
                        if (_this.headerCell.element.style.paddingRight)
                            padding = parseInt(_this.headerCell.element.style.paddingRight);
                        if (!_this.left)
                            _this.Style.left = (_this.headerCell.element.clientWidth - (_this.width - 1) - padding) + 'px';
                        else
                            _this.Style.left = '-1px';
                    }, 18);
                };
                /**
                 *  handles a double click on a column sizer
                 * @param sender - sizer
                 * @param args - none
                 */
                Resizer.prototype.doubleClick = function (sender, args) {
                    var maxWidth = 0;
                    var nodes = this.headerCell.element.childNodes;
                    var len = nodes.length;
                    var backupStyle = this.headerCell.Style.whiteSpace;
                    if (!backupStyle)
                        backupStyle = 'normal';
                    this.headerCell.Style.whiteSpace = 'pre';
                    var headWidth = parseInt(this.headerCell.Style.width.replace('px', ''));
                    var cellPadding = parseInt(this.headerCell.jElement.css('padding-left').replace('px', '')) + parseInt(this.headerCell.jElement.css('padding-right').replace('px', ''));
                    for (var i = 0; i < len; i++) {
                        maxWidth += nodes[i].offsetWidth;
                    }
                    maxWidth += cellPadding;
                    this.headerCell.Style.whiteSpace = backupStyle;
                    len = this.grid.Rows.length;
                    for (var i = 0; i < len; i++) {
                        var cell = this.grid.Rows[i].cells[this.index];
                        var nodes_1 = cell.element.childNodes;
                        var cellLen = cell.element.childNodes.length;
                        var width = 0;
                        var backupStyle_1 = cell.Style.whiteSpace;
                        if (!backupStyle_1)
                            backupStyle_1 = 'normal';
                        cell.Style.whiteSpace = 'pre';
                        for (var j = 0; j < cellLen; j++) {
                            width += nodes_1[j].offsetWidth;
                        }
                        width += cellPadding;
                        cell.Style.whiteSpace = backupStyle_1;
                        if (width > maxWidth)
                            maxWidth = width;
                    }
                    this.headerCell.Style.width = maxWidth + 'px';
                    var gridWidth = parseInt(this.grid.Style.width.replace('px', ''));
                    this.grid.Style.width = (gridWidth + (maxWidth - headWidth)) + 'px';
                    this.rePosition();
                    if (this.prevResizer)
                        this.prevResizer.rePosition();
                };
                /**
                 * handles mouse down on the control to start the resizing process
                 * @param event
                 */
                Resizer.prototype.mouseDown = function (event) {
                    this.grid.context.selectedResizer = this;
                    this.currentColumnWidth = parseInt(this.headerCell.Style.width.replace('px', ''));
                    this.currentGridWidth = parseInt(this.grid.Style.width.replace('px', ''));
                    this.currentMousePageX = event.pageX;
                    this.grid.context.selectedColumn = this;
                    this.currentClientWidth = this.headerCell.element.clientWidth;
                    if (this.left && this.prevResizer)
                        this.currentResizerLeft = parseFloat(this.prevResizer.Style.left.replace('px', ''));
                    else
                        this.currentResizerLeft = parseFloat(this.Style.left.replace('px', ''));
                };
                /**
                 * Handles mouse move events while a column is being resized
                 * @param event
                 */
                Resizer.prototype.onMouseMove = function (event) {
                    var width = this.width;
                    var diff = event.pageX - this.currentMousePageX;
                    var gridStyle = this.grid.Style;
                    var cellStyle = this.headerCell.Style;
                    var backup = cellStyle.width;
                    var clientWidth = this.headerCell.element.clientWidth;
                    //let gridWidth: any = gridStyle.width.replace('px', '');
                    cellStyle.width = (this.currentColumnWidth + diff) + 'px';
                    if (clientWidth === this.headerCell.element.clientWidth)
                        cellStyle.width = backup;
                    else {
                        gridStyle.width = (this.currentGridWidth + diff) + 'px';
                        if (this.left) {
                            if (this.prevResizer)
                                this.prevResizer.Style.left = (this.currentResizerLeft + this.headerCell.element.clientWidth - this.currentClientWidth) + 'px';
                        }
                        else
                            this.Style.left = (this.currentResizerLeft + this.headerCell.element.clientWidth - this.currentClientWidth) + 'px';
                    }
                    if (window.getSelection) {
                        if (window.getSelection().empty) {
                            window.getSelection().empty();
                        }
                        else if (window.getSelection().removeAllRanges) {
                            window.getSelection().removeAllRanges();
                        }
                    }
                    else if (document.selection) {
                        document.selection.empty();
                    }
                };
                return Resizer;
            }(UI.TSControl));
            Grid.Resizer = Resizer;
        })(Grid = UI.Grid || (UI.Grid = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=Resizer.js.map