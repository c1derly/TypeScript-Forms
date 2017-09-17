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
         *  An image control for displaying images on a page
         */
        var Image = (function (_super) {
            __extends(Image, _super);
            /**
             * A Image control that can be used in the html markup or just constructed plainly in javacsript
             * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
             * @param logicalParent - the logical parent entity such as a controller.  Used internally.
             */
            function Image(ele, logicalParent) {
                var _this = _super.call(this, ele, logicalParent) || this;
                if (ele === undefined) {
                    _this.checkEmptyEle('img');
                }
                return _this;
            }
            Object.defineProperty(Image.prototype, "Src", {
                get: function () {
                    return this.jElement.attr("src");
                },
                /** url source for the image */
                set: function (value) {
                    if (value === null || value === undefined)
                        value = "";
                    this.jElement.attr("src", value);
                },
                enumerable: true,
                configurable: true
            });
            return Image;
        }(UI.TSControl));
        UI.Image = Image;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=Image.js.map