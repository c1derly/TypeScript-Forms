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
        var ButtonType;
        (function (ButtonType) {
            ButtonType[ButtonType["button"] = 0] = "button";
            ButtonType[ButtonType["submit"] = 1] = "submit";
            ButtonType[ButtonType["reset"] = 2] = "reset";
            ButtonType[ButtonType["undefined"] = 3] = "undefined";
        })(ButtonType = UI.ButtonType || (UI.ButtonType = {}));
        /**
         * Class that represents a button.
         */
        var Button = (function (_super) {
            __extends(Button, _super);
            /**
             * A Button control that can be used in the html markup or just constructed plainly in javacsript
             * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
             * @param logicalParent - the logical parent entity such as a controller.  Used internally.
             */
            function Button(ele, logicalParent) {
                var _this = _super.call(this, ele, logicalParent) || this;
                _this.checkEmptyEle('button');
                return _this;
            }
            Object.defineProperty(Button.prototype, "Type", {
                get: function () {
                    var attr = this.element.getAttribute('type');
                    if (attr === undefined || attr === null)
                        return ButtonType.undefined;
                    else
                        return ButtonType[attr.toLocaleLowerCase()];
                },
                set: function (type) {
                    this.element.setAttribute('type', ButtonType[type]);
                },
                enumerable: true,
                configurable: true
            });
            return Button;
        }(UI.TSControl));
        UI.Button = Button;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=Button.js.map