/// <reference path="BaseEditableCell.ts" />
namespace TSF.UI.Grid.Extensions  {
    
    
    export class WunderTextCell extends BaseEditableCell implements IGenerateCell {


        generateCell(value: any, column: WunderColumn, row: WunderRow, grid: WunderGrid): WunderCell{
            var cell = new WunderCell();
            var txt = new TextBox();
            txt.element.style.width = "95%"
            txt.context.row = row;
            txt.context.col = column;
            txt.OnTextChange.add(() => this.changeValue(txt, txt.Value), this);  
            if (value !== null && value !== undefined)
                txt.Value = value.toString();
            cell.Append(txt);
            return cell;
        }
    }
}