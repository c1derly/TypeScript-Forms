var TSUI;
(function (TSUI) {
    var UI;
    (function (UI) {
        var TSControl = (function () {
            function TSControl(ele) {
                var _this = this;
                this.context = {};
                this.onClick = new TSUI.Events.UIEvent();
                if (ele === undefined)
                    return;
                if (typeof ele == 'string') {
                    this.jElement = $('#' + ele);
                    this.element = this.jElement[0];
                }
                else {
                    this.element = ele;
                    this.jElement = $(ele);
                }
                this.jElement.click(function () { return _this.onClick.fire(_this, _this.args); });
            }
            Object.defineProperty(TSControl.prototype, "TagName", {
                get: function () {
                    return this.element.tagName;
                },
                set: function (val) {
                    this.element.tagName = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TSControl.prototype, "Class", {
                get: function () {
                    return this.element.className;
                },
                set: function (val) {
                    this.element.className = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TSControl.prototype, "Attributes", {
                get: function () {
                    return this.element.attributes;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TSControl.prototype, "Style", {
                get: function () {
                    return this.element.style;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TSControl.prototype, "Text", {
                get: function () {
                    return this.jElement.text();
                },
                set: function (val) {
                    this.jElement.text(val);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TSControl.prototype, "Value", {
                get: function () {
                    return this.jElement.val();
                },
                set: function (val) {
                    this.jElement.val(val);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TSControl.prototype, "Disabled", {
                get: function () {
                    return this.disabled;
                },
                set: function (value) {
                    if (value !== this.disabled) {
                        if (value === true) {
                            this.disabled = true;
                            this.jElement.removeAttr('disabled');
                        }
                        else {
                            this.disabled = false;
                            this.jElement.attr('disabled', 'disabled');
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            return TSControl;
        }());
        UI.TSControl = TSControl;
    })(UI = TSUI.UI || (TSUI.UI = {}));
})(TSUI || (TSUI = {}));
