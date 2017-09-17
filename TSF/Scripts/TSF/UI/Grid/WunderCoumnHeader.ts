/// <reference path="..\TSControl.ts" />
namespace TSF.UI.Grid {
    /**
     * Object that represents a cell in the wundergrid.  Has a reference to the underlying cell
     */
    export class WunderColumnHeader extends TSControl {
        /** the column used to make the specific cell*/
        column: WunderColumn;
        /** the row the cell belongs to */
        row: WunderRow;
        constructor(id: string);
        constructor(ele: HTMLTableColElement);
        constructor();
        constructor(ele?, logicalParent?: UI.LogicalControl) {
            super(ele, logicalParent);
            this.checkEmptyEle('th');
            
        }
    }
}