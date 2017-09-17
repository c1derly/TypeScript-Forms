namespace TSF.Data {
    /**
     * Contains data related to a remote call including criteria, which columns to pull back, sort order and server side paging options.
     */
    export class Query {
        /** columns to retreive */
        public columns = new Array<string>();
        /** Conditions to apply to the query */
        public condition: Condition;
        /** for server side paging the record to start from*/
        public startRecord: number;
        /** the number of records to return*/
        public returnCount: number;
        /** the columns to sort by */
        public sortBy: Array<SortElement> | string;
    }
}