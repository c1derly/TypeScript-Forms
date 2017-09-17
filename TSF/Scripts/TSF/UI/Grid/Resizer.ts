/// <reference path="..\TSControl.ts" />
namespace TSF.UI.Grid {
    /**
     * Used to resize grid columns in the wunder grid
     */
    export class Resizer extends TSControl{
        /** grid the resizer belongs to */
        grid: WunderGrid;
        /** cell the resizer belongs to */
        headerCell: WunderColumnHeader;
        /** width of the resizer */
        width: number;
        /** current x position of the mouse since the last mouse move event */
        currentMousePageX: number;

        currentColumnWidth: number;
        currentGridWidth: number;
        currentClientWidth: number;
        currentResizerLeft: number;
        left: boolean;
        prevResizer: Resizer;
        index: number;

        /**
         * Used to resize grid columns in the wunder grid
         * @param element - element to use as the resizer
         * @param grid - the grid being resized
         * @param cell - header cell to be resized 
         * @param width
         */
        constructor(element: HTMLDivElement, grid: WunderGrid, cell: WunderColumnHeader, left: boolean, width: number, index: number)
        {
            super(element);
            this.index = index;
            this.grid = grid;
            this.headerCell = cell;
            this.width = width;
            var me = this;
            let style = this.Style;
            style.cursor = 'col-resize';
            this.left = left;
            //if (float === 'left')
            //    style.margin = '0px 0px 0px -2px';
            //else
            //    style.margin = '0px -2px 0px 0px';
            this.Style.position = 'absolute';
            cell.Style.position = 'relative';


            this.rePosition();

            this.Style.top = '0px';
            style.width = width + 'px';
            style.height = '100%';
            style.display = 'inline-block';
            //style.cssFloat = float;
            this.jElement.mouseup(() => this.grid.context.selectedResizer = undefined);
            this.jElement.mousedown(function (event) {
                me.mouseDown(event);
            });
            this.OnDoubleClick.add(this.doubleClick, this);
            
        }
        rePosition()
        {

            let padding = 0;
            setTimeout(() => {
                if (this.headerCell.element.style.paddingRight)
                    padding = parseInt(this.headerCell.element.style.paddingRight);

                if (!this.left)
                    this.Style.left = (this.headerCell.element.clientWidth - (this.width - 1) - padding) + 'px';
                else
                    this.Style.left = '-1px';
            }, 18);
        }
        /**
         *  handles a double click on a column sizer
         * @param sender - sizer
         * @param args - none
         */
        doubleClick(sender, args)
        {
            let maxWidth = 0;
            var nodes = this.headerCell.element.childNodes;
            let len = nodes.length;
            let backupStyle = this.headerCell.Style.whiteSpace;
            if (!backupStyle)
                backupStyle = 'normal';
            this.headerCell.Style.whiteSpace = 'pre';
            let headWidth = parseInt(this.headerCell.Style.width.replace('px', ''));
            var cellPadding = parseInt(this.headerCell.jElement.css('padding-left').replace('px', '')) + parseInt(this.headerCell.jElement.css('padding-right').replace('px', ''));
            for (let i = 0; i < len; i++)
            {
                maxWidth += (<any>nodes[i]).offsetWidth;
            }
            maxWidth += cellPadding;
            this.headerCell.Style.whiteSpace = backupStyle;
            len = this.grid.Rows.length;

            for (let i = 0; i < len; i++)
            {
                let cell = this.grid.Rows[i].cells[this.index];
                let nodes = cell.element.childNodes;
                let cellLen = cell.element.childNodes.length;
                let width = 0;
                let backupStyle = cell.Style.whiteSpace;
                if (!backupStyle)
                    backupStyle = 'normal';
                cell.Style.whiteSpace = 'pre';

                for (let j = 0; j < cellLen; j++)
                {
                    width += (<any>nodes[j]).offsetWidth;
                }
                width += cellPadding;
                cell.Style.whiteSpace = backupStyle;
                if (width > maxWidth)
                    maxWidth = width;
            }


            this.headerCell.Style.width = maxWidth + 'px';
            let gridWidth = parseInt(this.grid.Style.width.replace('px', ''));
            this.grid.Style.width = (gridWidth + (maxWidth - headWidth)) + 'px';
            this.rePosition();
            if (this.prevResizer)
                this.prevResizer.rePosition();
 
        }
        /**
         * handles mouse down on the control to start the resizing process 
         * @param event
         */
        mouseDown(event) {
            this.grid.context.selectedResizer = this;
            this.currentColumnWidth = parseInt(this.headerCell.Style.width.replace('px', ''));
            this.currentGridWidth = parseInt(this.grid.Style.width.replace('px', ''));
            this.currentMousePageX = event.pageX;
            this.grid.context.selectedColumn = this;
            this.currentClientWidth = this.headerCell.element.clientWidth;
            if (this.left && this.prevResizer)
                this.currentResizerLeft = parseFloat(this.prevResizer.Style.left.replace('px', ''))
            else
                this.currentResizerLeft = parseFloat( this.Style.left.replace('px', ''))

        }

        /**
         * Handles mouse move events while a column is being resized
         * @param event
         */
        onMouseMove(event)
        {
            let width = this.width;
            let diff = event.pageX - this.currentMousePageX;
            let gridStyle = this.grid.Style;
            let cellStyle = this.headerCell.Style;
            let backup = cellStyle.width;
            let clientWidth = this.headerCell.element.clientWidth;
            //let gridWidth: any = gridStyle.width.replace('px', '');
            cellStyle.width = (this.currentColumnWidth + diff) + 'px';
    


            if (clientWidth === this.headerCell.element.clientWidth)
                cellStyle.width = backup;
            else {
                gridStyle.width = (this.currentGridWidth + diff) + 'px';
                if (this.left)
                {
                    if (this.prevResizer)
                        this.prevResizer.Style.left = (this.currentResizerLeft + this.headerCell.element.clientWidth - this.currentClientWidth) + 'px';
                }
                else
                    this.Style.left = (this.currentResizerLeft + this.headerCell.element.clientWidth - this.currentClientWidth) + 'px';
            }
            
            if (window.getSelection) {
                if (window.getSelection().empty) {  // Chrome
                    window.getSelection().empty();
                } else if (window.getSelection().removeAllRanges) {  // Firefox
                    window.getSelection().removeAllRanges();
                }
            } else if ((<any>document).selection) {  // IE?
                (<any>document).selection.empty();
            }
        }
    }
}