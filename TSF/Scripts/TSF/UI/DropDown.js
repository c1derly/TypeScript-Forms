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
      * Drop down control
      */
        var DropDown = (function (_super) {
            __extends(DropDown, _super);
            /**
             * Drop down control
             * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
             * @param logicalParent - the logical parent entity such as a controller.  Used internally.
             */
            function DropDown(ele, logicalParent) {
                var _this = _super.call(this, ele, logicalParent) || this;
                /** Event fired when the selected item list has changed */
                _this.onSelectionChanged = new TSF.Events.GenericEvent();
                /** list of drop down items in the control */
                _this.items = [];
                /** the data source for the control */
                _this.dataSource = undefined;
                _this.checkEmptyEle('select');
                _this.loadConfiguration('dataSource', 'TextKey', 'ValueKey');
                var onchanged = _this.jElement.attr('onchange');
                if (onchanged !== null && onchanged !== undefined) {
                    _this.OnSelectionChanged.add(function (sender, args) { eval(onchanged); }, _this);
                }
                if (_this.TextKey === undefined) {
                    _this.TextKey = "text";
                }
                if (_this.ValueKey === undefined) {
                    _this.ValueKey = "value";
                }
                if (_this.dataSource)
                    _this.DataSource = _this.getRelativePath(_this.dataSource);
                var initialData = null;
                if ($("option", _this.jElement).length > 0) {
                    initialData = new Array();
                    var extractItemData = function (index, elem) {
                        var item = new Object();
                        item[_this.TextKey] = $(elem).text();
                        item[_this.ValueKey] = $(elem).val();
                        initialData.push(item);
                    };
                    $("option", _this.jElement).each(extractItemData);
                }
                _this.jElement.empty();
                var me = _this;
                _this.element.onchange = function () { return _this.changeIndex(); };
                if (initialData !== null) {
                    _this.bind(initialData);
                }
                return _this;
            }
            Object.defineProperty(DropDown.prototype, "SelectedIndex", {
                /** Selected index of the drop down -1 if none */
                get: function () {
                    return this.element.selectedIndex;
                },
                set: function (val) {
                    this.element.selectedIndex = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DropDown.prototype, "OnSelectionChanged", {
                /** The on OnSelection Changed event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
                get: function () {
                    return this.onSelectionChanged;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DropDown.prototype, "Items", {
                /** gets the items in the drop down*/
                get: function () {
                    return this.items;
                },
                /** Sets the items on the drop down */
                set: function (val) {
                    this.emptyContent();
                    if (val) {
                        var len = val.length;
                        for (var i = 0; i < len; i++) {
                            var item = val[i];
                            this.Append(item);
                        }
                    }
                    this.items = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DropDown.prototype, "SelectedItem", {
                /** gets the selected dropdownitems of the control */
                get: function () {
                    return this.items[this.SelectedIndex];
                },
                /** sets the selected dropdownitems of the control.  This does change the UI Selection */
                set: function (val) {
                    val.element.selected = true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DropDown.prototype, "SelectedValue", {
                /** gets the selected value of the control */
                get: function () {
                    if (this.SelectedIndex !== -1)
                        return this.items[this.SelectedIndex].data;
                    else
                        return undefined;
                },
                /** sets the list of the selected value of the control.  This does change the UI Selection */
                set: function (value) {
                    if (value === undefined) {
                        this.SelectedIndex = -1;
                        return;
                    }
                    if (this.items !== undefined && this.items !== null) {
                        var length = this.items.length;
                        var index = -1;
                        for (var i = 0; i < length; i++) {
                            if (this.items[i].data == value) {
                                index = i;
                                break;
                            }
                        }
                        if (index != -1)
                            this.SelectedIndex = index;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DropDown.prototype, "DataSource", {
                /** Gets the data source of the object */
                get: function () {
                    return this.dataSource;
                },
                /** Sets te data source for the object */
                set: function (value) {
                    if (this.dataSource !== undefined && this.dataSource !== null && typeof this.dataSource !== 'string') {
                        this.dataSource.onDataUpdated.remove(this.bind, this);
                    }
                    this.dataSource = value;
                    if (this.dataSource != null) {
                        this.dataSource.onDataUpdated.add(this.bind, this);
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
     * Binds the data to the control given the TextKey and ValueKey to map the data
     * @param data - data to bind to the control
     */
            DropDown.prototype.bind = function (data) {
                this.jElement.empty();
                for (var i = 0; i < data.length; i++) {
                    var dat = data[i];
                    var item;
                    if (typeof dat == 'string')
                        item = new UI.DropDownItem(dat, dat);
                    else {
                        if (this.ValueKey === 'valueOf')
                            item = new UI.DropDownItem(dat[this.TextKey], dat);
                        else
                            item = new UI.DropDownItem(dat[this.TextKey], dat[this.ValueKey]);
                    }
                    this.items.push(item);
                    item.index = i;
                    item.jElement.attr('idx', i);
                    var me = this;
                    this.Append(item);
                }
                this.SelectedIndex = -1;
            };
            /**
     * Gets underlying data to the drop down items if there is any.
     */
            DropDown.prototype.getData = function () {
                return this.items.map(function (d) { return d.data; });
            };
            /**
            * Handeles selection change.  Internal.
            */
            DropDown.prototype.changeIndex = function () {
                if (this.items && this.items.length > 0)
                    this.onSelectionChanged.fire(this, this.items[this.SelectedIndex]);
            };
            return DropDown;
        }(UI.TSControl));
        UI.DropDown = DropDown;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=DropDown.js.map