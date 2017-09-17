var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="..\TSF\UI\LogicalControl.ts" />
var TSF;
(function (TSF) {
    var TestController = (function (_super) {
        __extends(TestController, _super);
        function TestController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TestController.prototype.TSInit = function () {
            //this.grid.AutoGenerateColumns = true;
            this.grid.Columns = ['col1', 'col2', new TSF.UI.Grid.WunderColumn('col3', 'col3', TSF.UI.ColumnType.Boolean), new TSF.UI.Grid.WunderColumn('timestamp', 'Time Stamp', TSF.UI.ColumnType.DateTime)];
            //(<TSF.UI.Grid.WunderColumn>this.grid.Columns[0]).customHeader = new UI.Grid.Extensions.SortableColumnHeader();
            //this.dsTestTable.onDataUpdated.add(this.test, this);
            this.grid.applySorting([new TSF.Data.SortElement('col1', TSF.Data.SortDirection.DESC)], false);
            this.dsTestTable.refresh();
            //setTimeout(() => this.grid.changePage(2), 5000);
            var condition = new TSF.Data.Condition('col1', 5, TSF.Data.CriteriaComparator.Equal);
            radOrange.Value = { 'color': 'red' };
            //setTimeout(() => this.grid.applyFilter(condition), 3000);
            //setTimeout(() => this.grid.Editing = true,10000);
        };
        return TestController;
    }(TSF.UI.LogicalControl));
    TSF.TestController = TestController;
})(TSF || (TSF = {}));
//# sourceMappingURL=TestController.js.map