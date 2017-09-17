var TSF;
(function (TSF) {
    var DS;
    (function (DS) {
        /**
         *  Used to interface with the .Net tuple
         */
        var Tuple = (function () {
            function Tuple(Item1, Item2, Item3, Item4, Item5, Item6, Item7) {
                this.Item1 = Item1;
                this.Item2 = Item2;
                this.Item3 = Item3;
                this.Item4 = Item4;
                this.Item5 = Item5;
                this.Item6 = Item6;
                this.Item7 = Item7;
            }
            return Tuple;
        }());
        DS.Tuple = Tuple;
    })(DS = TSF.DS || (TSF.DS = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=Tuple.js.map