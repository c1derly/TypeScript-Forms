var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="..\..\TSControl.ts" />
var TSF;
(function (TSF) {
    var UI;
    (function (UI) {
        var Grid;
        (function (Grid) {
            var Extensions;
            (function (Extensions) {
                /**
                 *  Used by the wundergrid when no custom header method is provided by the column to generate anthe header
                 */
                var SortableColumnHeader = (function (_super) {
                    __extends(SortableColumnHeader, _super);
                    function SortableColumnHeader() {
                        var _this = _super.call(this, document.createElement('div')) || this;
                        _this.OnClick.add(_this.click, _this);
                        return _this;
                    }
                    /** generates the cell */
                    SortableColumnHeader.prototype.generateHeader = function (column, target) {
                        var _this = this;
                        this.column = column;
                        this.target = target;
                        var header = new Grid.WunderColumnHeader();
                        var textEle = new UI.TSControl(document.createElement('span'));
                        textEle.Text = column.displayText;
                        header.Append(textEle);
                        header.Append(this);
                        this.Style.display = 'inline-block';
                        this.element.innerHTML = "▵<br/>▿";
                        this.Style.lineHeight = '13px';
                        this.Style.fontSize = '1.5em';
                        this.Style.height = '100%';
                        this.Style.cssFloat = 'right';
                        this.Style.cursor = 'pointer';
                        this.Class = 'wgSorter';
                        setTimeout(function () {
                            var paddingTop = parseInt(header.jElement.css('padding-top').replace('px', ''));
                            var paddingBottom = parseInt(header.jElement.css('padding-bottom').replace('px', ''));
                            var elePadTop = parseInt(_this.jElement.css('padding-top').replace('px', ''));
                            var elePadBottom = parseInt(_this.jElement.css('padding-bottom').replace('px', ''));
                            _this.Style.marginTop = (((header.element.clientHeight - paddingTop - paddingBottom) / 2) - ((_this.element.clientHeight - elePadTop - elePadBottom) / 2)) + 'px';
                        }, 1);
                        target.onSortChanged.add(this.sortChanged, this);
                        return header;
                    };
                    SortableColumnHeader.prototype.click = function (sender, args) {
                        if (this.order === undefined)
                            this.target.applySorting([new TSF.Data.SortElement(this.column.dataField, TSF.Data.SortDirection.ASC)], true);
                        else if (this.order === TSF.Data.SortDirection.ASC)
                            this.target.applySorting([new TSF.Data.SortElement(this.column.dataField, TSF.Data.SortDirection.DESC)], true);
                        else
                            this.target.applySorting([], true);
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
                    SortableColumnHeader.prototype.changeSortingOrder = function (order) {
                        this.order = order;
                        if (order === undefined)
                            this.element.innerHTML = "▵<br/>▿";
                        else {
                            if (order === TSF.Data.SortDirection.DESC)
                                this.element.innerHTML = "▵<br/>▾";
                            else
                                this.element.innerHTML = "▴<br/>▿";
                        }
                    };
                    SortableColumnHeader.prototype.sortChanged = function (sorts) {
                        if (sorts.length < 1)
                            this.changeSortingOrder();
                        else if (this.column.dataField === sorts[0].column)
                            this.changeSortingOrder(sorts[0].sortDirection);
                        else
                            this.changeSortingOrder();
                    };
                    return SortableColumnHeader;
                }(UI.TSControl));
                Extensions.SortableColumnHeader = SortableColumnHeader;
            })(Extensions = Grid.Extensions || (Grid.Extensions = {}));
        })(Grid = UI.Grid || (UI.Grid = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=SortableColumnHeader.js.map