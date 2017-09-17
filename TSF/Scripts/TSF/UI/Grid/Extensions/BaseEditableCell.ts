
namespace TSF.UI.Grid.Extensions {
    export class BaseEditableCell {

        changeValue(sender: UI.TSControl, value: Object) {
            var row: WunderRow = sender.context.row
            var col: WunderColumn = sender.context.col;
            var val = row.Data;
            val = eval('val.' + col.dataField.replace(/[;\r\n]*/g, '') + ' = value;' );
        }
    }
    
}