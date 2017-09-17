var TSF;
(function (TSF) {
    var UI;
    (function (UI) {
        var Grid;
        (function (Grid) {
            var Extensions;
            (function (Extensions) {
                var BaseEditableCell = (function () {
                    function BaseEditableCell() {
                    }
                    BaseEditableCell.prototype.changeValue = function (sender, value) {
                        var row = sender.context.row;
                        var col = sender.context.col;
                        var val = row.Data;
                        val = eval('val.' + col.dataField.replace(/[;\r\n]*/g, '') + ' = value;');
                    };
                    return BaseEditableCell;
                }());
                Extensions.BaseEditableCell = BaseEditableCell;
            })(Extensions = Grid.Extensions || (Grid.Extensions = {}));
        })(Grid = UI.Grid || (UI.Grid = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=BaseEditableCell.js.map