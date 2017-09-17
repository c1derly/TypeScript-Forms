var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="..\..\Data\AbstractClasses\AObservable.ts" />
var TSF;
(function (TSF) {
    var UI;
    (function (UI) {
        var States;
        (function (States) {
            /**
             * Observable state of the grid if needed for architecture
             */
            var SelectableState = (function (_super) {
                __extends(SelectableState, _super);
                function SelectableState() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /** selected data in the grid */
                    _this.selectedData = [];
                    /** the data being displayed in the grid*/
                    _this.data = [];
                    return _this;
                }
                return SelectableState;
            }(TSF.Data.AbstractClasses.AObservable));
            States.SelectableState = SelectableState;
        })(States = UI.States || (UI.States = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=SelectableState.js.map