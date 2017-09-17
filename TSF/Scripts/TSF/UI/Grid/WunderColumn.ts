/// <reference path="..\Column.ts" />
namespace TSF.UI.Grid {


    /**
     *  Used to specify columns for the wunder grid.
     */
    export class WunderColumn extends Column{


        /** determines if the particular column is editable.  Default = true */
        public editable: boolean = true;

        /** Width of the column.  Autosized if not set */
        public width: string;



        /** reference http://blog.stevenlevithan.com/archives/date-time-format for more information */
        public dateFormat = '';
        /** generate custom content for a cell */
        public customCell: IGenerateCell;
        /** method to generate your own headers */
        public customHeader: IGenerateColumn;

        /** method to generate custom editable cells when the grid is in editing */
        public customEditCell: IGenerateCell;
        /**
         * Used to specify columns for the wunder grid.
         * @param dataField - attribute of the object to bind the the cell for the given column
         * @param headerText - Header text to display in the table header for the given column
         * @param dataType - Data type of the column.  Only important if you are using a DateTime or you are allowing editing to your grid.
        The date format is applied if it is a date time.  During editing booleans are given checkboxes and values are validated
        Against their respective data type before being accepted
         * @param dateFormat - reference http://blog.stevenlevithan.com/archives/date-time-format for more information
         * @param generateCell - generate custom content for a cell
         */
        constructor(dataField: string, displayText?: string, dataType?: ColumnType, width?: string, dateFormat?: string, editable?: boolean, customCell?: IGenerateCell, customEditCell?: IGenerateCell, customHeader?: IGenerateColumn)
        {
            super(dataField, displayText, dataType);
            this.editable = editable;
  
    
            this.dateFormat = dateFormat;
            this.customCell = customCell;
            this.customHeader = customHeader;
            this.customEditCell = customEditCell;
            this.width = width;
        }

    }
}