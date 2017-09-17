
namespace TSF.UI {

    export enum ColumnType {
        String, Boolean, DateTime, Integer, Float
    }
    /**
     *  Used to specify columns for the wunder grid.
     */
    export class Column {
        /** Text to display for the column */
        public displayText: string;

  
         /** attribute of the object to bind the the cell for the given column */
        public  dataField: string;
       
        /** Data type of the column.  Only important if you are using a DateTime or you are allowing editing to your grid.
        The date format is applied if it is a date time.  During editing booleans are given checkboxes and values are validated
        Against their respective data type before being accepted */
        public dataType = ColumnType.String;
    
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
        constructor(dataField: string, displayField?: string, dataType?: ColumnType) {

            this.dataField = dataField;
            if (!displayField)
                this.displayText = dataField;
            else
                this.displayText = displayField;
            this.dataType = dataType;
        }

    }
}