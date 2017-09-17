var TSF;
(function (TSF) {
    var Base;
    (function (Base) {
        /**
         * Standard exception for error handeling
         */
        var Exception = (function () {
            /**
             * Exception used for throwing
             * @param message The message for the exception
             */
            function Exception(ExceptionMessage) {
                this.ExceptionMessage = ExceptionMessage;
            }
            return Exception;
        }());
        Base.Exception = Exception;
    })(Base = TSF.Base || (TSF.Base = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=Exception.js.map