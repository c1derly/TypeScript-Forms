namespace TSF.Data {
    /** sort direction of a query */
    export enum SortDirection {
        ASC,DESC
    }
    /**
     * The sort element of a query.
     */
    export class SortElement {
        /** the column to sort by */
        public column:string ;
        /** the sort direction */
        public sortDirection: SortDirection;
        /**
         * The sort element of a query.  
         * @param column - the column to sort by 
         * @param sortDirection - the direction to sort by (optional.  Sorts by Ascending by default).
         */
        constructor(column: string, sortDirection: SortDirection = SortDirection.ASC)
        {
            this.column = column;
            this.sortDirection = sortDirection;
        }
    }
}