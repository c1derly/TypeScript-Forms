/// <reference path="..\TSControl.ts" />
namespace TSF.UI.Grid {
    /**
     * Object that represents a cell in the wundergrid.  Has a reference to the underlying cell
     */
    export class WunderCell extends TSControl {
        
        /** the column used to make the specific cell*/
        column: WunderColumn;
        /** the row the cell belongs to */
        row: WunderRow;
        textElement: TSControl;
        constructor(id: string);
        constructor(ele: HTMLTableCellElement);
        constructor();
        constructor(ele?, logicalParent?: UI.LogicalControl) {
            super(ele, logicalParent);
            this.checkEmptyEle('td');
            this.textElement = new TSControl(document.createElement('span'));
            this.Append(this.textElement);
        }

        public set Text(val: string)
        {
            this.textElement.Text = val;
        }
        public get Text(): string
        {
            return this.textElement.Text;
        }
    }
}