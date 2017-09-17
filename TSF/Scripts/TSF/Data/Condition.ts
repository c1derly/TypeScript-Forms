
/// <reference path=".\Criteria.ts" />
namespace TSF.Data {

    /**
     * A class used to hold criteria for an sql call
     */
    export class Condition{
        /** Used to hold a group of criteria that would be enclosed in a parathensis */
        public criteriaGroup = new Array<CriteriaGroup>()
        /** used to hold a list of criteria */
        public criteria = new Array<Criteria>();
        /**
         * Creates a new condition with an optional starting criteria
         * @param column - the column name to compare
         * @param value - the value to compare the parameter name against
         * @param comparator - the type of comparison to be done.
         */
        constructor(column?: string, value?: Object, comparator: CriteriaComparator = CriteriaComparator.Equal) {
            if (column) {
                this.criteria.push(new Criteria(column, value, comparator))
            }

        }


    }
}