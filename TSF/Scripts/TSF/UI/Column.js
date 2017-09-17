var TSF;
(function (TSF) {
    var UI;
    (function (UI) {
        var ColumnType;
        (function (ColumnType) {
            ColumnType[ColumnType["String"] = 0] = "String";
            ColumnType[ColumnType["Boolean"] = 1] = "Boolean";
            ColumnType[ColumnType["DateTime"] = 2] = "DateTime";
            ColumnType[ColumnType["Integer"] = 3] = "Integer";
            ColumnType[ColumnType["Float"] = 4] = "Float";
        })(ColumnType = UI.ColumnType || (UI.ColumnType = {}));
        /**
         *  Used to specify columns for the wunder grid.
         */
        var Column = (function () {
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
            function Column(dataField, displayField, dataType) {
                /** Data type of the column.  Only important if you are using a DateTime or you are allowing editing to your grid.
                The date format is applied if it is a date time.  During editing booleans are given checkboxes and values are validated
                Against their respective data type before being accepted */
                this.dataType = ColumnType.String;
                this.dataField = dataField;
                if (!displayField)
                    this.displayText = dataField;
                else
                    this.displayText = displayField;
                this.dataType = dataType;
            }
            return Column;
        }());
        UI.Column = Column;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=Column.js.map