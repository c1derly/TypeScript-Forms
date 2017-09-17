var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="..\Base\Exception.ts" />
var TSF;
(function (TSF) {
    var Remote;
    (function (Remote) {
        /**
         *  Standard exception with additional detail from a remote call
         */
        var RemoteException = (function (_super) {
            __extends(RemoteException, _super);
            function RemoteException(message) {
                return _super.call(this, message) || this;
            }
            return RemoteException;
        }(TSF.Base.Exception));
        Remote.RemoteException = RemoteException;
    })(Remote = TSF.Remote || (TSF.Remote = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=RemoteException.js.map