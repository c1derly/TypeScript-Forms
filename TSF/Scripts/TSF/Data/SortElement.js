var TSF;
(function (TSF) {
    var Data;
    (function (Data) {
        /** sort direction of a query */
        var SortDirection;
        (function (SortDirection) {
            SortDirection[SortDirection["ASC"] = 0] = "ASC";
            SortDirection[SortDirection["DESC"] = 1] = "DESC";
        })(SortDirection = Data.SortDirection || (Data.SortDirection = {}));
        /**
         * The sort element of a query.
         */
        var SortElement = (function () {
            /**
             * The sort element of a query.
             * @param column - the column to sort by
             * @param sortDirection - the direction to sort by (optional.  Sorts by Ascending by default).
             */
            function SortElement(column, sortDirection) {
                if (sortDirection === void 0) { sortDirection = SortDirection.ASC; }
                this.column = column;
                this.sortDirection = sortDirection;
            }
            return SortElement;
        }());
        Data.SortElement = SortElement;
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=SortElement.js.map