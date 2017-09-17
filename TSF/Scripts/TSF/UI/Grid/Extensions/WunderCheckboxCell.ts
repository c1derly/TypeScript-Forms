/// <reference path="BaseEditableCell.ts" />
namespace TSF.UI.Grid.Extensions  {
    /**
     *  Used by the wundergrid when no editable cell method is provided by the column to generate an editable checkbox cell
     */
    export class WunderCheckboxCell extends BaseEditableCell implements IGenerateCell {

        /** generates the cell */
        generateCell(value: any, column: WunderColumn, row: WunderRow, grid: WunderGrid): WunderCell {
            var cell = new WunderCell();
            var cbx = new Checkbox();
            cbx.Indeterminate = true;
            cbx.context.row = row;
            cbx.context.col = column;
            cbx.OnCheckedChanged.add(() => this.changeValue(cbx, cbx.Checked), this);
            if (value !== null && value !== undefined)
                cbx.Checked = value;
            cell.Append(cbx);
            return cell;
        }
    }
}