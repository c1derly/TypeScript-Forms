/// <reference path="..\TSF\UI\LogicalControl.ts" />
namespace TSF
{
    declare var radOrange: UI.RadioButton;
    export class TestController extends UI.LogicalControl
    {
        grid: UI.Grid.WunderGrid
        dsTestTable: Data.AsyncDataSource
        message = "here is a message to see if the context works";
        public methodToFire(message: string)
        {
            alert(message);
        }
        TSInit()
        {
            
  
            //this.grid.AutoGenerateColumns = true;
            this.grid.Columns = ['col1', 'col2', new UI.Grid.WunderColumn('col3', 'col3', UI.ColumnType.Boolean), new UI.Grid.WunderColumn('timestamp', 'Time Stamp', UI.ColumnType.DateTime)];
            //(<TSF.UI.Grid.WunderColumn>this.grid.Columns[0]).customHeader = new UI.Grid.Extensions.SortableColumnHeader();
            //this.dsTestTable.onDataUpdated.add(this.test, this);

            this.grid.applySorting([new Data.SortElement('col1', Data.SortDirection.DESC)], false);
            this.dsTestTable.refresh();
        
            //setTimeout(() => this.grid.changePage(2), 5000);
            var condition = new Data.Condition('col1', 5, Data.CriteriaComparator.Equal);
            
            radOrange.Value = { 'color': 'red' };
            //setTimeout(() => this.grid.applyFilter(condition), 3000);
            //setTimeout(() => this.grid.Editing = true,10000);
            
        }
    }
} 