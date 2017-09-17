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
         * Radio button control
         */
        var RadioButton = (function (_super) {
            __extends(RadioButton, _super);
            /**
             * A RadioButton control that can be used in the html markup or just constructed plainly in javacsript
             * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
             * @param logicalParent - the logical parent entity such as a controller.  Used internally.
             */
            function RadioButton(ele, logicalParent) {
                var _this = _super.call(this, ele, logicalParent) || this;
                if (ele === undefined) {
                    _this.checkEmptyEle('input');
                }
                _this.element.setAttribute('type', 'radio');
                _this.element.TSControl = _this;
                return _this;
            }
            Object.defineProperty(RadioButton.prototype, "Value", {
                get: function () {
                    if (this.value)
                        return this.value;
                    else
                        return this.element.value;
                },
                /** Value for the radio button.  If set this way it can be an object as well as a string */
                set: function (val) {
                    this.value = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RadioButton.prototype, "OnSelectionChanged", {
                /** The on change event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
                get: function () {
                    var _this = this;
                    if (!this.onSelectionChanged) {
                        this.onSelectionChanged = new TSF.Events.UIEvent();
                        this.element.onchange = function () { return _this.onSelectionChanged.fire(_this, _this.args); };
                    }
                    return this.onSelectionChanged;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RadioButton.prototype, "SelectedValue", {
                /** Gets or Sets the selected value for the group of radio buttons */
                get: function () {
                    var selectedItem = this.SelectedItem;
                    if (selectedItem === undefined)
                        return undefined;
                    if (selectedItem.Value !== undefined)
                        return selectedItem.Value;
                },
                /** Gets the selected value of the radio button group */
                set: function (val) {
                    var ctrls = document.getElementsByName(this.Name);
                    var len = ctrls.length;
                    for (var i = 0; i < len; i++) {
                        var ctrl = ctrls[i];
                        if (ctrl.TSControl !== undefined) {
                            var tsCtrl = ctrl.TSControl;
                            if (tsCtrl.Value === val) {
                                tsCtrl.Checked = true;
                            }
                        }
                        else if (ctrl.value === val) {
                            ctrl.checked = true;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RadioButton.prototype, "Checked", {
                /**returns true if the control is selected */
                get: function () {
                    return this.element.checked;
                },
                /**selects the specific control */
                set: function (val) {
                    this.element.checked = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RadioButton.prototype, "Name", {
                /** name (group) of the radio button */
                get: function () {
                    return this.element.name;
                },
                set: function (val) {
                    this.element.name = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RadioButton.prototype, "SelectedItem", {
                /** returns the ts control if one exists for the selected item otherwise just the html element */
                get: function () {
                    var ctrls = document.getElementsByName(this.Name);
                    var len = ctrls.length;
                    for (var i = 0; i < len; i++) {
                        var ctrl = ctrls[i];
                        if (ctrl.checked) {
                            if (ctrl.TSControl !== undefined)
                                return ctrl.TSControl;
                            else
                                return ctrl;
                        }
                    }
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });
            return RadioButton;
        }(UI.TSControl));
        UI.RadioButton = RadioButton;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=RadioButton.js.map