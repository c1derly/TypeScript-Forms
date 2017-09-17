/// <reference path="..\..\TSControl.ts" />
namespace TSF.UI.Grid.Extensions {

    /**
     *  Used by the wundergrid when no custom header method is provided by the column to generate anthe header
     */
    export class SortableColumnHeader extends TSControl implements IGenerateColumn {


        column: Column;
        target: Data.Interfaces.ISortable;
        order: Data.SortDirection;
        constructor() {
            super(document.createElement('div'));
            this.OnClick.add(this.click, this);
        }
        /** generates the cell */
        generateHeader(column: Column, target: Data.Interfaces.ISortable): WunderColumnHeader {

            this.column = column;
            this.target = target;
            var header = new WunderColumnHeader();
            var textEle = new TSControl(document.createElement('span'));
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
            this.Class = 'wgSorter'
            setTimeout(() => {
                var paddingTop = parseInt(header.jElement.css('padding-top').replace('px', ''));
                var paddingBottom = parseInt(header.jElement.css('padding-bottom').replace('px', ''));

                var elePadTop = parseInt(this.jElement.css('padding-top').replace('px', ''));
                var elePadBottom = parseInt(this.jElement.css('padding-bottom').replace('px', ''));
                this.Style.marginTop = (((header.element.clientHeight - paddingTop - paddingBottom) / 2) - ((this.element.clientHeight - elePadTop - elePadBottom) / 2)) + 'px';
            }, 1);
            target.onSortChanged.add(this.sortChanged, this);

            return header;
        }
        click(sender, args) {
            if (this.order === undefined)
                this.target.applySorting([new Data.SortElement(this.column.dataField, Data.SortDirection.ASC)], true);
            else if (this.order === Data.SortDirection.ASC)
                this.target.applySorting([new Data.SortElement(this.column.dataField, Data.SortDirection.DESC)], true);
            else
                this.target.applySorting([], true);

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
        changeSortingOrder(order?: Data.SortDirection) {
            this.order = order;
            if (order === undefined)
                this.element.innerHTML = "▵<br/>▿";
            else {
                if (order === Data.SortDirection.DESC)
                    this.element.innerHTML = "▵<br/>▾";
                else
                    this.element.innerHTML = "▴<br/>▿";

            }
        }

        sortChanged(sorts: Array<Data.SortElement>) {
            if (sorts.length < 1)
                this.changeSortingOrder();
            else if (this.column.dataField === sorts[0].column)
                this.changeSortingOrder(sorts[0].sortDirection);
            else
                this.changeSortingOrder();
        }
    }
}