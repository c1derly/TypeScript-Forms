namespace TSF.Data {
    /** How to join criteria or criteria groups*/
    export enum CriteriaJoin
    {
        And,Or
    }
    /** The type of comparison to do */
    export enum CriteriaComparator
    {
        Equal,
        NotEqual,
        GreaterThan,
        LessThan,
        GreaterThanOrEqual, 
        LessThanOrEqual,
        Like,
        NotLike,
        In,
        NotIn,
        IsNull,
        IsNotNull
        
    }
    /**
     * A class that represents an sql criteria
     */
    export class Criteria
    {
        /** how to join it with the previous criteria (And,Or)*/
        public join: CriteriaJoin;
        /* the name of the column you want to create a criteria for*/
        public column: string;
        /** the value to compare the column to */
        public value: Object;
        /** the type of comparison to be done */
        public comparator: CriteriaComparator;
        /**
         * Creates a new criteria with the specified constraint
         * @param column - the column to the compare the value to
         * @param value - the value to compare against the column
         * @param comparator - the type of comparison to do (Equals, Greater than etc)
         * @param join - how to join the criteria to the previous criteria
         */
        constructor(column: string, value: Object, comparator: CriteriaComparator = CriteriaComparator.Equal, join: CriteriaJoin = CriteriaJoin.And)
        {
            this.column = column;
            this.value = value;
            this.join = join;
            this.comparator = comparator;
        }
    }   

}