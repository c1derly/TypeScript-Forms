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
        var MultiSelect = (function (_super) {
            __extends(MultiSelect, _super);
            /**
             * Drop down control
             * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
             * @param logicalParent - the logical parent entity such as a controller.  Used internally.
             */
            function MultiSelect(ele, logicalParent) {
                var _this = _super.call(this, ele, logicalParent) || this;
                /** list of selected indicies */
                _this.selectedIndicies = [];
                /** Event fired when the selected item list has changed */
                _this.onSelectionChanged = new TSF.Events.GenericEvent();
                /** internal use only for not firing extra events */
                _this.updatingSelected = false;
                /** list of drop down items in the control */
                _this.items = [];
                /** the data source for the control */
                _this.dataSource = undefined;
                if (_this.Attributes['multiple'] === undefined)
                    _this.element.setAttribute('multiple', '');
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
                var i = 0;
                if ($("option", _this.jElement).length > 0) {
                    initialData = new Array();
                    var extractItemData = function (index, elem) {
                        var ele = $(elem);
                        var item = new UI.DropDownItem(ele.text(), ele.val(), elem);
                        _this.items.push(item);
                        if (elem.selected)
                            _this.selectedIndicies.push(i);
                        item.index = i;
                        item.jElement.attr('idx', i);
                        i++;
                    };
                    $("option", _this.jElement).each(extractItemData);
                }
                var me = _this;
                _this.element.onchange = function () { return _this.changeSelection(); };
                return _this;
            }
            Object.defineProperty(MultiSelect.prototype, "OnSelectionChanged", {
                /** The on OnSelection Changed event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
                get: function () {
                    return this.onSelectionChanged;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MultiSelect.prototype, "SelectedValues", {
                /** gets the list of selected values of the control */
                get: function () {
                    var items = this.SelectedItems;
                    return items.map(function (x) { return x.data; });
                },
                /** sets the list of selected values of the control.  This does change the UI Selection */
                set: function (value) {
                    this.updatingSelected = true;
                    this.selectedIndicies = [];
                    if (value !== undefined && this.items !== undefined && this.items !== null) {
                        var length = this.items.length;
                        for (var i = 0; i < length; i++) {
                            var item = this.items[i];
                            var len = value.length;
                            var found = false;
                            for (var j = 0; j < len; j++) {
                                if (item.data == value[j]) {
                                    found = true;
                                    break;
                                }
                            }
                            if (found) {
                                item.element.selected = true;
                                this.selectedIndicies.push(i);
                            }
                            else
                                item.element.selected = false;
                        }
                    }
                    this.updatingSelected = false;
                    this.onSelectionChanged.fire(this, this.SelectedItems);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MultiSelect.prototype, "Items", {
                /** gets the items in the drop down*/
                get: function () {
                    return this.items;
                },
                /** Sets the items on the drop down */
                set: function (val) {
                    this.selectedIndicies = [];
                    this.emptyContent();
                    if (val) {
                        var len = val.length;
                        for (var i = 0; i < len; i++) {
                            var item = val[i];
                            this.Append(item);
                            if (item.element.selected)
                                this.selectedIndicies.push(i);
                        }
                    }
                    this.items = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MultiSelect.prototype, "SelectedItems", {
                /** gets the selected dropdownitems of the control */
                get: function () {
                    var _this = this;
                    return this.selectedIndicies.map(function (x) { return _this.items[x]; });
                },
                /** sets the selected dropdownitems of the control.  This does change the UI Selection */
                set: function (val) {
                    this.updatingSelected = true;
                    this.selectedIndicies = [];
                    this.element.selectedIndex = -1;
                    if (val) {
                        var length = val.length;
                        for (var i = 0; i < length; i++) {
                            var item = val[i];
                            item.element.selected = true;
                            this.selectedIndicies.push(item.element.index);
                        }
                    }
                    this.selectedIndicies.sort();
                    this.updatingSelected = false;
                    this.onSelectionChanged.fire(this, val);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MultiSelect.prototype, "DataSource", {
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
            MultiSelect.prototype.bind = function (data) {
                this.items = [];
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
                this.element.selectedIndex = -1;
            };
            /**
             * Gets underlying data to the drop down items if there is any.
             */
            MultiSelect.prototype.getData = function () {
                return this.items.map(function (d) { return d.data; });
            };
            /**
             * Handeles selection change.  Internal.
             */
            MultiSelect.prototype.changeSelection = function () {
                if (!this.updatingSelected) {
                    this.selectedIndicies = this.getSelectedIndicies();
                    this.OnSelectionChanged.fire(this, this.SelectedItems);
                }
            };
            /**
             * gets the selected indexes internal
             */
            MultiSelect.prototype.getSelectedIndicies = function () {
                if (this.element.selectedOptions === undefined)
                    return this.getSelectedDropDownsIE();
                var selected = this.element.selectedOptions;
                var len = selected.length;
                var selectedIndicies = [];
                for (var i = 0; i < len; i++) {
                    selectedIndicies.push(selected[i].index);
                }
                return selectedIndicies;
            };
            /**
             * handles gets indexes in a different way for ie because it doesn't support selectedOptions
             */
            MultiSelect.prototype.getSelectedDropDownsIE = function () {
                var len = this.items.length;
                var indicies = [];
                for (var i = 0; i < len; i++) {
                    if (this.items[0].element.selected)
                        indicies.push(i);
                }
                return indicies;
            };
            return MultiSelect;
        }(UI.TSControl));
        UI.MultiSelect = MultiSelect;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=MultiSelect.js.map