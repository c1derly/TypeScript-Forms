var TSF;
(function (TSF) {
    var Data;
    (function (Data) {
        /**
         * Contains data related to a remote call including criteria, which columns to pull back, sort order and server side paging options.
         */
        var Query = (function () {
            function Query() {
                /** columns to retreive */
                this.columns = new Array();
            }
            return Query;
        }());
        Data.Query = Query;
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=Query.js.map