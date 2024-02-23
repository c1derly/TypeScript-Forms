/// <reference path="..\TSControl.ts" />

/// <reference path="Extensions\WunderTextCell.ts" />
/// <reference path="Extensions\WunderCheckboxCell.ts" />
namespace TSF.UI.Grid {
    export class WunderRow extends TSControl{

        protected static editableTextCellGenerator = new Extensions.WunderTextCell();
        protected static editableCheckCellGenerator = new Extensions.WunderCheckboxCell();
        
 
        /** grid that the row is attached too */
        public grid: WunderGrid;
        /** cells of the row */
        public cells: Array<WunderCell> = [];
        /** columns on the grid to create the row.  Must be set before the data */
        columns: Array<WunderColumn>;
        /** if the row is in editing mode */
        protected editing: boolean;
        public get Editing(): boolean {
            return this.editing;
        }
        public set Editing(editing: boolean) {
            this.editing = editing; 
            this.emptyContent();
            if (this.data)
                this.createCells();
        }



        protected data;
        public get Data(): any {
            return this.data;
        }
        public set Data(data:any) {
            this.data = data;
            this.createCells();
        }
        /**
         * Creates the cells in the row based off of the columns.  the columns have to be set first before the data is set for this method to work.
         */
        protected createCells()
        {
            var data = this.data;
            if (data) {
                var len = this.columns.length;
                
                this.cells = new Array<WunderCell>(len);
                var cells = this.cells;
                for (let i = 0; i < len; i++) {
                    var column = this.columns[i];
 

                    var val = this.data;
                    val = eval('val.' + column.dataField.replace(/[;\r\n]*/g, ''));
                    if (column.dataType === ColumnType.DateTime) {
                        var format;
                        if (!column.dateFormat)
                            format = "MM/dd/yyyy HH:mm:ss";
                        else
                            format = column.dateFormat;
                        val = Utilities.DateFormatter.formatDate(new Date(val), format);
                    }

                    var cell: WunderCell;
                    if (this.editing === true)
                    {
                        if (column.customEditCell)
                            cell = column.customEditCell.generateCell(val, column, this, this.grid);
                        else
                        {
                            if (column.dataType === ColumnType.Boolean)
                                cell = WunderRow.editableCheckCellGenerator.generateCell(val, column, this, this.grid);
                            else
                                cell = WunderRow.editableTextCellGenerator.generateCell(val, column, this, this.grid);
                        }
                    }
                    else if (column.customCell)
                        cell = column.customCell.generateCell(val, column, this, this.grid);
                    else {
                        cell = new WunderCell();
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
        }
        /**
         * Table row used in the wunder grid.
         * @param id - id of the element to be used
         * @param logicalParent - internal use only
         */
        constructor(id: string, logicalParent?: UI.LogicalControl);
        /**
         * Table row used in the wunder grid.
         * @param ele - element to be used
         * @param logicalParent - internal use only
         */
        constructor(ele: HTMLElement, logicalParent?: UI.LogicalControl);
        constructor();
        constructor(ele?, logicalParent?: UI.LogicalControl) {
            super(ele, logicalParent);
            this.checkEmptyEle('tr');
      
        }
    }
}