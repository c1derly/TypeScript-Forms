var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path=".\TSControl.ts" />
var TSF;
(function (TSF) {
    var UI;
    (function (UI) {
        /**
             * Drop down item used in the drop down control which contains display and selected data info.
             */
        var DropDownItem = (function (_super) {
            __extends(DropDownItem, _super);
            function DropDownItem(text, value, element) {
                var _this = _super.call(this, element) || this;
                _this.checkEmptyEle('option');
                if (value !== undefined && value != null)
                    _this.jElement.val(value.toString());
                _this.Text = text;
                _this.data = value;
                return _this;
            }
            return DropDownItem;
        }(UI.TSControl));
        UI.DropDownItem = DropDownItem;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=DropDownItem.js.map