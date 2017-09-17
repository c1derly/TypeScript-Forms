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
         * Class that represents a checkbox and on as check change events etc.  Also implements the ability to do indeterminate checkboxes
         */
        var Checkbox = (function (_super) {
            __extends(Checkbox, _super);
            /**
             * A Checkbox control that can be used in the html markup or just constructed plainly in javacsript
             * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
             * @param logicalParent - the logical parent entity such as a controller.  Used internally.
             */
            function Checkbox(ele, logicalParent) {
                var _this = _super.call(this, ele, logicalParent) || this;
                /** sets if the checkbox should be allowed to be in an indeterminate state*/
                _this.indeterminate = false;
                _this.indetermRegistered = false;
                /** keeps track of if the checkbox has been checked yet */
                _this.beenChecked = false;
                if (ele === undefined) {
                    _this.checkEmptyEle('input');
                    _this.element.setAttribute('type', 'checkbox');
                }
                _this.loadConfiguration('args', 'indeterminate');
                _this.convertToBoolean('indeterminate', false);
                _this.OnCheckedChanged.add(_this.handleCheckedChanged, _this);
                var changeEvent = _this.jElement.attr('onchange');
                if (changeEvent !== null && changeEvent !== undefined) {
                    _this.OnCheckedChanged.add(function (sender, checked, args) { eval(changeEvent); }, _this);
                }
                return _this;
            }
            Object.defineProperty(Checkbox.prototype, "Indeterminate", {
                get: function () {
                    return this.indeterminate;
                },
                set: function (val) {
                    this.indeterminate = val;
                    if (val === true && !this.element.hasAttribute("checked") && !this.beenChecked) {
                        this.element.indeterminate = true;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Checkbox.prototype, "Checked", {
                /** determines if the checkbox is checked */
                get: function () {
                    if (this.indeterminate === true && this.beenChecked === false && !this.element.hasAttribute("checked"))
                        return undefined;
                    else
                        return this.element.checked;
                },
                /** sets the the checked value on the checkbox */
                set: function (val) {
                    this.beenChecked = true;
                    this.element.checked = val;
                    if (val !== undefined)
                        this.element.indeterminate = false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Checkbox.prototype, "OnCheckedChanged", {
                get: function () {
                    var _this = this;
                    if (this.onCheckedChanged === undefined) {
                        this.onCheckedChanged = new TSF.Events.CheckedChangedEvent();
                        this.element.onchange = function () { return _this.onCheckedChanged.fire(_this, _this.args); };
                    }
                    return this.onCheckedChanged;
                },
                enumerable: true,
                configurable: true
            });
            Checkbox.prototype.handleCheckedChanged = function (sender, checked, args) {
                this.beenChecked = true;
            };
            return Checkbox;
        }(UI.TSControl));
        UI.Checkbox = Checkbox;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=Checkbox.js.map