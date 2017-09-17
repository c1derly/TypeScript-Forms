namespace TSF.Data {
    /**
     * Holds a group of criteria to be enclosed in paranthesis 
     */
    export class CriteriaGroup {


        /** how to join the group onto the previous criteria or groups */
        public join: CriteriaJoin;
        /** the list of criteria for the group*/
        public criteria = new Array<Criteria>();
        /** sub groups of the groups*/
        public groups = new Array<CriteriaGroup>();
        /**
         * how to join the group onto the previous criteria.
         * @param join
         */
        constructor( join: CriteriaJoin = CriteriaJoin.And) {
            this.join = join;
 
        }
    }   
}