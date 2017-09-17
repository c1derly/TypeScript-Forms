var TSF;
(function (TSF) {
    var Data;
    (function (Data) {
        /** How to join criteria or criteria groups*/
        var CriteriaJoin;
        (function (CriteriaJoin) {
            CriteriaJoin[CriteriaJoin["And"] = 0] = "And";
            CriteriaJoin[CriteriaJoin["Or"] = 1] = "Or";
        })(CriteriaJoin = Data.CriteriaJoin || (Data.CriteriaJoin = {}));
        /** The type of comparison to do */
        var CriteriaComparator;
        (function (CriteriaComparator) {
            CriteriaComparator[CriteriaComparator["Equal"] = 0] = "Equal";
            CriteriaComparator[CriteriaComparator["NotEqual"] = 1] = "NotEqual";
            CriteriaComparator[CriteriaComparator["GreaterThan"] = 2] = "GreaterThan";
            CriteriaComparator[CriteriaComparator["LessThan"] = 3] = "LessThan";
            CriteriaComparator[CriteriaComparator["GreaterThanOrEqual"] = 4] = "GreaterThanOrEqual";
            CriteriaComparator[CriteriaComparator["LessThanOrEqual"] = 5] = "LessThanOrEqual";
            CriteriaComparator[CriteriaComparator["Like"] = 6] = "Like";
            CriteriaComparator[CriteriaComparator["NotLike"] = 7] = "NotLike";
            CriteriaComparator[CriteriaComparator["In"] = 8] = "In";
            CriteriaComparator[CriteriaComparator["NotIn"] = 9] = "NotIn";
            CriteriaComparator[CriteriaComparator["IsNull"] = 10] = "IsNull";
            CriteriaComparator[CriteriaComparator["IsNotNull"] = 11] = "IsNotNull";
        })(CriteriaComparator = Data.CriteriaComparator || (Data.CriteriaComparator = {}));
        /**
         * A class that represents an sql criteria
         */
        var Criteria = (function () {
            /**
             * Creates a new criteria with the specified constraint
             * @param column - the column to the compare the value to
             * @param value - the value to compare against the column
             * @param comparator - the type of comparison to do (Equals, Greater than etc)
             * @param join - how to join the criteria to the previous criteria
             */
            function Criteria(column, value, comparator, join) {
                if (comparator === void 0) { comparator = CriteriaComparator.Equal; }
                if (join === void 0) { join = CriteriaJoin.And; }
                this.column = column;
                this.value = value;
                this.join = join;
                this.comparator = comparator;
            }
            return Criteria;
        }());
        Data.Criteria = Criteria;
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=Criteria.js.map