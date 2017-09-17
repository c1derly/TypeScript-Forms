var TSF;
(function (TSF) {
    var Data;
    (function (Data) {
        /**
         * Holds a group of criteria to be enclosed in paranthesis
         */
        var CriteriaGroup = (function () {
            /**
             * how to join the group onto the previous criteria.
             * @param join
             */
            function CriteriaGroup(join) {
                if (join === void 0) { join = Data.CriteriaJoin.And; }
                /** the list of criteria for the group*/
                this.criteria = new Array();
                /** sub groups of the groups*/
                this.groups = new Array();
                this.join = join;
            }
            return CriteriaGroup;
        }());
        Data.CriteriaGroup = CriteriaGroup;
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=CriteriaGroup.js.map