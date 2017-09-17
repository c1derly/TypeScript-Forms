var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path=".\LogicalControl.ts" />
var TSF;
(function (TSF) {
    var UI;
    (function (UI) {
        var TSControl = (function (_super) {
            __extends(TSControl, _super);
            /**
             * A Base control that can be used in the html markup or just constructed plainly in javacsript
             * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
             * @param logicalParent - the logical parent entity such as a controller.  Used internally.
             */
            function TSControl(ele, logicalParent) {
                var _this = _super.call(this, ele, logicalParent) || this;
                _this.context = {};
                if (ele !== undefined) {
                    var clickEvent = _this.jElement.attr('onclick');
                    if (clickEvent !== null && clickEvent !== undefined) {
                        _this.OnClick.add(function (sender, args) { eval(clickEvent); }, _this);
                    }
                    var doubleClickEvent = _this.jElement.attr('ondblclick');
                    if (doubleClickEvent !== null && doubleClickEvent !== undefined) {
                        _this.OnDoubleClick.add(function (sender, args) { eval(doubleClickEvent); }, _this);
                    }
                    _this.loadConfiguration('args');
                }
                return _this;
            }
            Object.defineProperty(TSControl.prototype, "OnClick", {
                /** The on click event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
                get: function () {
                    var _this = this;
                    if (this.onClick === undefined) {
                        this.onClick = new TSF.Events.UIEvent();
                        this.element.onclick = function () { return _this.onClick.fire(_this, _this.args); };
                    }
                    return this.onClick;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TSControl.prototype, "OnDoubleClick", {
                /** The on double click event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
                get: function () {
                    var _this = this;
                    if (this.onDoubleClick === undefined) {
                        this.onDoubleClick = new TSF.Events.UIEvent();
                        this.element.ondblclick = function () { return _this.onDoubleClick.fire(_this, _this.args); };
                    }
                    return this.onDoubleClick;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Appends a control to the child elements of the current control
             * @param control - the control to append
             */
            TSControl.prototype.Append = function (control) {
                this.jElement.append(control.jElement);
            };
            /**
             * Insert control before the provided control in the html
             * @param control - the control to insert this object before
             */
            TSControl.prototype.InsertBefore = function (control) {
                this.jElement.insertBefore(control.jElement);
            };
            /**
             * Insert control after the provided control in the html
             * @param control - the control to insert this object after
             */
            TSControl.prototype.InsertAfter = function (control) {
                this.jElement.insertAfter(control.jElement);
            };
            /**
             * clears all of the child html elements from the control
             */
            TSControl.prototype.emptyContent = function () {
                this.jElement.empty();
            };
            Object.defineProperty(TSControl.prototype, "TagName", {
                /** returns the tag name of the element*/
                get: function () {
                    return this.element.tagName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TSControl.prototype, "Class", {
                /** returns the class name of the element */
                get: function () {
                    return this.element.className;
                },
                /** Sets the class name of the element */
                set: function (val) {
                    this.element.className = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TSControl.prototype, "Attributes", {
                /** The attributes of the element */
                get: function () {
                    return this.element.attributes;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TSControl.prototype, "Style", {
                /** the style of the element */
                get: function () {
                    return this.element.style;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TSControl.prototype, "Text", {
                /** Text of the html element */
                get: function () {
                    return this.jElement.text();
                },
                /** Text of the html element */
                set: function (val) {
                    this.jElement.text(val);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TSControl.prototype, "Value", {
                /** Value of the html element */
                get: function () {
                    return this.jElement.val();
                },
                /** Value of the html element */
                set: function (val) {
                    this.jElement.val(val);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TSControl.prototype, "Disabled", {
                /** Get or set the disabled status of the element */
                get: function () {
                    return this.disabled;
                },
                /** Get or set the disabled status of the element */
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
            /**
             * Hides the control (display:none)
             */
            TSControl.prototype.hide = function () {
                this.previousDisplay = this.element.style.display;
                this.jElement.hide();
            };
            /**
             * Shows the control.  Sets the previous display type if hide was used previously
             */
            TSControl.prototype.show = function () {
                if (!this.previousDisplay && this.previousDisplay.toUpperCase() !== "NONE")
                    this.element.style.display = this.previousDisplay;
                else
                    this.jElement.show();
            };
            /**
             * load html content into the body construct any controls used specified in the markup.  This can be used to refer to
             * this object in the var attribute in this method.
             * @param data - html data to load into the control
             */
            TSControl.prototype.loadHtml = function (data) {
                if (data !== undefined) {
                    if (this.jElement === undefined) {
                        this.jElement = $(data);
                        this.element = this.jElement[0];
                        TSF.Base.TSBase.constructControls.apply(this, [this.element]);
                    }
                    else {
                        this.jElement.append($(data));
                        var children = this.element.children;
                        var len = children.length;
                        for (var i = 0; i < len; i++)
                            TSF.Base.TSBase.constructControls.apply(this, [children[i]]);
                    }
                }
            };
            return TSControl;
        }(UI.LogicalControl));
        TSControl.eventList = {};
        UI.TSControl = TSControl;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=TSControl.js.map