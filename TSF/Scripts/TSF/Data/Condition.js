/// <reference path=".\Criteria.ts" />
var TSF;
(function (TSF) {
    var Data;
    (function (Data) {
        /**
         * A class used to hold criteria for an sql call
         */
        var Condition = (function () {
            /**
             * Creates a new condition with an optional starting criteria
             * @param column - the column name to compare
             * @param value - the value to compare the parameter name against
             * @param comparator - the type of comparison to be done.
             */
            function Condition(column, value, comparator) {
                if (comparator === void 0) { comparator = Data.CriteriaComparator.Equal; }
                /** Used to hold a group of criteria that would be enclosed in a parathensis */
                this.criteriaGroup = new Array();
                /** used to hold a list of criteria */
                this.criteria = new Array();
                if (column) {
                    this.criteria.push(new Data.Criteria(column, value, comparator));
                }
            }
            return Condition;
        }());
        Data.Condition = Condition;
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=Condition.js.map