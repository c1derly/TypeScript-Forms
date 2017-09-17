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
         * Class that represents a Textbox.
         */
        var TextBox = (function (_super) {
            __extends(TextBox, _super);
            /**
             * A TextBox control that can be used in the html markup or just constructed plainly in javacsript
             * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
             * @param logicalParent - the logical parent entity such as a controller.  Used internally.
             */
            function TextBox(ele, logicalParent) {
                var _this = _super.call(this, ele, logicalParent) || this;
                if (ele === undefined) {
                    _this.checkEmptyEle('input');
                }
                _this.element.setAttribute('type', 'text');
                return _this;
            }
            Object.defineProperty(TextBox.prototype, "OnTextChange", {
                /** The on text change event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
                get: function () {
                    var _this = this;
                    if (!this.onTextChange) {
                        this.onTextChange = new TSF.Events.UIEvent();
                        this.element.onchange = function () { return _this.onTextChange.fire(_this, _this.args); };
                    }
                    return this.onTextChange;
                },
                enumerable: true,
                configurable: true
            });
            return TextBox;
        }(UI.TSControl));
        UI.TextBox = TextBox;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=TextBox.js.map