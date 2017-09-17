var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="..\TSControl.ts" />
var TSF;
(function (TSF) {
    var UI;
    (function (UI) {
        var Grid;
        (function (Grid) {
            /** Possible types of selection methods for the grid.  */
            var SelectionType;
            (function (SelectionType) {
                SelectionType[SelectionType["NONE"] = 0] = "NONE";
                SelectionType[SelectionType["SINGLE"] = 1] = "SINGLE";
                SelectionType[SelectionType["MULTI"] = 2] = "MULTI";
            })(SelectionType = Grid.SelectionType || (Grid.SelectionType = {}));
            /**
             * Grid view used to display data in a grid format.  Includes functionality for sorting, column resizing,
             * selection, multi selection, ability to be hooked up to a pager or filter.
             */
            var WunderGrid = (function (_super) {
                __extends(WunderGrid, _super);
                /**
                 * A grid control used for displaying table data
                 * @param ele - the html element to use for the control
                 * @param logicalParent - the logical parent entity such as a controller.  Used internally.
                 */
                function WunderGrid(ele, logicalParent) {
                    var _this = _super.call(this, ele, logicalParent) || this;
                    /** internal used to determine when to fire certain events */
                    _this.updating = false;
                    /** determines if the columns have been changed since the last time they were drawn */
                    _this.columnsChanged = false;
                    /** table header used when constructing the table */
                    _this.tBody = new UI.TSControl(document.createElement('tbody'));
                    /** table body used when constructing the table */
                    _this.tHead = new UI.TSControl(document.createElement('thead'));
                    _this.headerRow = new UI.TSControl(document.createElement('tr'));
                    /** Enables client paging of the data on the grid */
                    _this.paging = false;
                    /** Page size for client paging */
                    _this.pageSize = 10;
                    /** internal data reference to manipulating data set on the client side */
                    _this.filteredData = [];
                    /** local selected rows attribute */
                    _this.selectedRows = [];
                    /** if the grid is in editing mode */
                    _this.editing = false;
                    /** used to alert the pager when the page has changed */
                    _this.onPageChange = new TSF.Data.PageChangeEvent();
                    _this.onSortChanged = new TSF.Events.ValueEvent();
                    /* Gets fired on the creation of every row.  Usefull for visual formatting of the rows */
                    _this.onRowCreated = new TSF.Events.ValueEvent();
                    _this.columnHeaders = [];
                    /** columns to display in the grid */
                    _this.columns = [];
                    /** auto generates the columns based on the objects used as input if set to true */
                    _this.autoGenerateColumns = true;
                    /* the rows of the grid */
                    _this.rows = [];
                    /*********************************************************************************************************************************************************************/
                    /* Region resizable columns */
                    /*********************************************************************************************************************************************************************/
                    _this.eventsRegistered = false;
                    if (ele === undefined)
                        _this.checkEmptyEle('table');
                    _this.Append(_this.tHead);
                    _this.tHead.Append(_this.headerRow);
                    _this.loadConfiguration('selection', 'dataSource', 'state', 'selectedRowClass', 'clientPaging', 'pageSize', 'ColumnsResizable', 'enableSorting', 'sortTarget');
                    _this.convertToInteger('pageSize', 10);
                    _this.convertToBoolean('clientPaging', false);
                    _this.convertToBoolean('ColumnsResizable', false);
                    _this.convertToBoolean('enableSorting', undefined);
                    if (_this.sortTarget) {
                        _this.SortTarget = _this.getRelativePath(_this.sortTarget);
                    }
                    if (_this.dataSource) {
                        var ds = _this.dataSource;
                        _this.dataSource = undefined;
                        _this.DataSource = _this.getRelativePath(ds);
                    }
                    if (_this.selection)
                        _this.selection = SelectionType[_this.selection.toUpperCase()];
                    if (_this.state)
                        _this.state = eval(_this.state);
                    else
                        _this.state = new UI.States.SelectableState();
                    _this.state.$observe(_this, function (state) { return _this.selectRowByData(state.selectedData); }, 'selectedData');
                    _this.state.$observe(_this, function (state) { return _this.refresh(); }, 'data');
                    return _this;
                }
                Object.defineProperty(WunderGrid.prototype, "OnSelectionChanged", {
                    /** Fired when the selected row(s) change*/
                    get: function () {
                        if (!this.onSelectionChanged)
                            this.onSelectionChanged = new TSF.Events.GenericEvent();
                        return this.onSelectionChanged;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WunderGrid.prototype, "SelectedValues", {
                    get: function () {
                        return this.state.selectedData;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WunderGrid.prototype, "SortTarget", {
                    get: function () {
                        if (!this.sortTarget)
                            return this;
                        else
                            return this.sortTarget;
                    },
                    /** used if you want the sorting to apply to a data source or another ISortable object  instead of the local data in the grid */
                    set: function (val) {
                        this.sortTarget = val;
                        if (this.enableSorting === undefined)
                            this.enableSorting = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WunderGrid.prototype, "EnableSorting", {
                    get: function () {
                        if (this.enableSorting === undefined)
                            return false;
                        else
                            return this.enableSorting;
                    },
                    set: function (val) {
                        this.enableSorting = val;
                        if (this.filteredData)
                            this.createHeaderRow();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WunderGrid.prototype, "Editing", {
                    /** Returns true if the table is in editing mode */
                    get: function () {
                        return this.editing;
                    },
                    /** Set the table to editing mode or remove it from editing mode */
                    set: function (ed) {
                        this.editing = ed;
                        var count = this.rows.length;
                        for (var i = 0; i < count; i++) {
                            var row = this.rows[i];
                            row.Editing = ed;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Edits a specific row
                 * @param row -row to edit
                 */
                WunderGrid.prototype.EditRow = function (row) {
                    row.Editing = true;
                };
                /**
                 * Stops editing a specific row
                 * @param row - row to stop editing
                 */
                WunderGrid.prototype.FinishEditRow = function (row) {
                    row.Editing = false;
                };
                Object.defineProperty(WunderGrid.prototype, "DataSource", {
                    /** The datasource for the object */
                    get: function () {
                        return this.dataSource;
                    },
                    /** The datasource for the object */
                    set: function (dataSource) {
                        if (this.dataSource) {
                            this.dataSource.onStartUpdate.remove(this.onStartUpdate, this);
                            this.dataSource.onEndUpdate.remove(this.onEndUpdate, this);
                        }
                        this.dataSource = dataSource;
                        if (this.dataSource) {
                            this.dataSource.onStartUpdate.add(this.onStartUpdate, this);
                            this.dataSource.onEndUpdate.add(this.onEndUpdate, this);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WunderGrid.prototype, "Columns", {
                    /** columns to display in the grid The getter is always returns a list of WunderColumn*/
                    get: function () {
                        return this.columns;
                    },
                    /** columns to display in the grid */
                    set: function (columns) {
                        this.columnHash = {};
                        if (columns) {
                            this.autoGenerateColumns = false;
                            var len = columns.length;
                            for (var i = 0; i < len; i++) {
                                var col = columns[i];
                                if (typeof (col) == "string")
                                    col = columns[i] = new Grid.WunderColumn(col);
                                this.columnHash[col.dataField] = col;
                            }
                        }
                        this.columns = columns;
                        this.columnsChanged = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WunderGrid.prototype, "AutoGenerateColumns", {
                    /** set wether or not to auto generate columns */
                    get: function () {
                        return this.autoGenerateColumns;
                    },
                    /** set wether or not to auto generate columns */
                    set: function (autoGenerateColumns) {
                        this.autoGenerateColumns = autoGenerateColumns;
                        this.columnsChanged = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WunderGrid.prototype, "Data", {
                    /** gets the data the grid is using for display purposes */
                    get: function () {
                        return this.state.data;
                    },
                    /** sets the data on the grid.  Causes a refresh of the data on the grid*/
                    set: function (data) {
                        if (this.updating) {
                            this.state.$setAttributeWithoutEvent('data', data);
                            this.filteredData = data;
                        }
                        else {
                            this.state.$setAttributeWithoutEvent('data', data);
                            this.filteredData = data;
                            this.refresh();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WunderGrid.prototype, "SelectedRows", {
                    /** The selected rows of the grid */
                    get: function () {
                        return this.selectedRows;
                    },
                    /** The selected rows of the grid */
                    set: function (rows) {
                        if (!rows)
                            rows = [];
                        this.selectRows(rows);
                    },
                    enumerable: true,
                    configurable: true
                });
                /*  selects rows on the grid */
                WunderGrid.prototype.selectRows = function (rows) {
                    var selClass = this.selectedRowClass;
                    if (!selClass)
                        selClass = 'selected';
                    if (!rows)
                        rows = [];
                    var selectedRows = this.selectedRows;
                    var len = selectedRows.length;
                    for (var i = 0; i < len; i++) {
                        selectedRows[i].jElement.removeClass(selClass);
                    }
                    len = rows.length;
                    var data = [];
                    for (var i = 0; i < len; i++) {
                        var row = rows[i];
                        row.jElement.addClass(selClass);
                        data[i] = row.Data;
                    }
                    this.selectedRows = rows;
                    this.state.$setAttributeWithoutEvent('selectedData', data);
                    this.onSelectionChanged.fire(this, rows);
                };
                Object.defineProperty(WunderGrid.prototype, "Rows", {
                    /** The rows of the grid */
                    get: function () {
                        return this.rows;
                    },
                    /** The rows of the grid */
                    set: function (val) {
                        var len = val.length;
                        this.tBody.emptyContent();
                        for (var i = 0; i < len; i++) {
                            this.tBody.Append(val[i]);
                        }
                        this.rows = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Allows you to select a row by dynamic criteria provided by a method you pass in.  If the method returns true
                 * for a given data input the row is selected.
                 * @param filter - The method to determine if a row is selected
                 */
                WunderGrid.prototype.selectRowByCriteria = function (filter) {
                    var rows = this.rows.filter(filter);
                    this.selectRows(rows);
                };
                /**
                 * Selects a row when the attribute specified for the data of that row equals the value provided
                 * @param attribute - attribute to use in the comparison
                 * @param value - value to use in the comparison
                 */
                WunderGrid.prototype.selectRowByAttribute = function (attribute, value) {
                    var rows = this.rows.filter(function (x) { return x.Data[attribute] == value; });
                    this.selectRows(rows);
                };
                /**
                 * Finds the row with the data object provided and selects it
                 * @param data - the data you want selected
                 */
                WunderGrid.prototype.selectRowByData = function (data) {
                    var rows;
                    if (Array.isArray(data)) {
                        rows = [];
                        var len = this.rows.length;
                        for (var i = 0; i < len; i++) {
                            var dat = data[i];
                            var res = this.rows.filter(function (x) { return x.Data == dat; });
                            if (res.length > 0)
                                rows.push(res[0]);
                        }
                    }
                    else {
                        rows = new Array(1);
                        rows[0] = data;
                    }
                    this.selectRows(rows);
                };
                /**
                 *  used if the data changes from the state observable
                 */
                WunderGrid.prototype.refresh = function () {
                    this.updating = true;
                    if (this.criteria)
                        this.applyFilter(this.criteria, false);
                    if (this.sortBy)
                        this.applySorting(this.sortBy, false);
                    if (this.paging)
                        this.changePage(1);
                    else
                        this.createBody(this.filteredData);
                    this.updating = false;
                };
                /** Binds data to the grid.  Causes the grid to re-draw the data in the grid and if the columns have changed the columns are re-drawn */
                WunderGrid.prototype.bind = function (data) {
                    this.updating = true;
                    this.Data = data;
                    this.filteredData = data;
                    if (this.criteria)
                        this.applyFilter(this.criteria, false);
                    if (this.sortBy)
                        this.applySorting(this.sortBy, false);
                    if (this.paging)
                        this.changePage(1);
                    else
                        this.createBody(this.filteredData);
                    this.updating = false;
                };
                /**
                 *  creates the body of the table
                 * @param data - data to make the body with
                 */
                WunderGrid.prototype.createBody = function (data) {
                    var _this = this;
                    try {
                        this.element.removeChild(this.tBody.element);
                    }
                    catch (e) {
                    }
                    this.updating = true;
                    var dataLen = data.length;
                    this.tBody.emptyContent();
                    if (this.columnsChanged)
                        this.createHeaderRow();
                    this.rows = new Array(dataLen);
                    for (var i = 0; i < dataLen; i++) {
                        var row = new Grid.WunderRow();
                        row.grid = this;
                        row.columns = this.columns;
                        row.Editing = this.editing;
                        row.Data = data[i];
                        row.OnClick.add(function (row) { return _this.handleSelection(row); }, this);
                        this.rows[i] = row;
                        this.tBody.Append(row);
                        this.onRowCreated.fire(row);
                    }
                    this.Append(this.tBody);
                };
                /**
                 * The row to handle selection for (handler for on click)
                 * @param row
                 */
                WunderGrid.prototype.handleSelection = function (row) {
                    switch (this.selection) {
                        case SelectionType.NONE:
                            return;
                        case SelectionType.SINGLE:
                            this.selectRows([row]);
                            break;
                        case SelectionType.MULTI:
                            var newSelection = this.selectedRows.filter(function (x) { return x !== row; });
                            if (newSelection.length === this.selectedRows.length)
                                newSelection.push(row);
                            this.selectRows(newSelection);
                            break;
                    }
                };
                /**
                 * Creates the header rows in the grid
                 */
                WunderGrid.prototype.createHeaderRow = function () {
                    var _this = this;
                    try {
                        this.tHead.element.removeChild(this.headerRow.element);
                    }
                    catch (e) {
                    }
                    this.headerRow.emptyContent();
                    var headers = this.columnHeaders = [];
                    if (this.autoGenerateColumns && this.Data.length > 0) {
                        if (this.Data && this.Data.length > 0) {
                            this.columns = [];
                            var ele = this.Data[0];
                            for (var att in ele) {
                                if (ele.hasOwnProperty(att)) {
                                    this.columns.push(new Grid.WunderColumn(att));
                                }
                            }
                            this.columnsChanged = false;
                        }
                    }
                    var colLength = this.columns.length;
                    if (colLength > 0) {
                        for (var i = 0; i < colLength; i++) {
                            var col = this.columns[i];
                            if (col.customHeader) {
                                var header = col.customHeader.generateHeader(col, this);
                                headers[i] = header;
                                this.headerRow.Append(header);
                            }
                            else {
                                if (this.EnableSorting) {
                                    var sorter = new Grid.Extensions.SortableColumnHeader();
                                    var header = sorter.generateHeader(col, this.SortTarget);
                                    if (this.sortBy && this.sortBy.length > 0)
                                        sorter.sortChanged(this.sortBy);
                                    headers[i] = header;
                                    this.headerRow.Append(header);
                                }
                                else {
                                    var header = new Grid.WunderColumnHeader();
                                    var textEle = new UI.TSControl(document.createElement('span'));
                                    textEle.Text = col.displayText;
                                    header.Append(textEle);
                                    //header.Text = col.displayText;
                                    headers[i] = header;
                                    this.headerRow.Append(header);
                                }
                            }
                        }
                        this.columnsChanged = false;
                    }
                    this.tHead.Append(this.headerRow);
                    setTimeout(function () {
                        if (_this.ColumnsResizable) {
                            _this.addResizers();
                            _this.handleInitialWidthsForResizer();
                        }
                    }, 1);
                };
                /**
                 * displays the loading message when connected to an async data source
                 */
                WunderGrid.prototype.onStartUpdate = function () {
                    if (this.rows.length === 0) {
                        this.rows.push(new Grid.WunderRow());
                        this.tBody.Append(this.rows[0]);
                    }
                    try {
                        this.element.removeChild(this.tBody.element);
                    }
                    catch (e) {
                    }
                    var len = this.rows.length;
                    for (var i = 1; i < len; i++) {
                        this.rows[i].Style.visibility = 'hidden';
                    }
                    var span = this.rows[0].cells.length;
                    if (span === 0)
                        span = this.columns.length;
                    if (span === 0)
                        span = 1;
                    var row = this.rows[0];
                    row.emptyContent();
                    var td = $(document.createElement('td'));
                    td.attr('colspan', span);
                    td.text('Loading...');
                    row.jElement.append(td);
                    this.Append(this.tBody);
                };
                /**
                 * Listener for an async data source that updates the data on the grid
                 * @param data
                 */
                WunderGrid.prototype.onEndUpdate = function (data) {
                    this.bind(data);
                };
                Object.defineProperty(WunderGrid.prototype, "ColumnsResizable", {
                    /** True means columns can be resized False means they can't */
                    get: function () {
                        return this.columnsResizable;
                    },
                    /** True means columns can be resized False means they can't */
                    set: function (val) {
                        var _this = this;
                        this.columnsResizable = val;
                        var rows = this.rows;
                        var len = rows.length;
                        if (val) {
                            this.columnsChanged = true;
                            this.handleInitialWidthsForResizer();
                        }
                        if (this.Columns.length > 0)
                            this.createHeaderRow();
                        if (!this.eventsRegistered) {
                            $(window).mouseup(function () { return _this.context.selectedResizer = undefined; });
                            $(window).mousemove(function (event) { return _this.mouseMove(event); });
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                WunderGrid.prototype.addResizers = function () {
                    var len = this.columnHeaders.length;
                    var prevHead;
                    var prevResizer;
                    for (var i = 0; i < len; i++) {
                        var header = this.columnHeaders[i];
                        var ele = void 0;
                        var resizer = void 0;
                        if (prevHead) {
                            ele = document.createElement('div');
                            ele.innerHTML = '&nbsp;';
                            resizer = new Grid.Resizer(ele, this, prevHead, true, 6, i - 1);
                            header.Append(resizer);
                            resizer.prevResizer = prevResizer;
                        }
                        ele = document.createElement('div');
                        ele.innerHTML = '&nbsp;';
                        prevResizer = new Grid.Resizer(ele, this, header, false, 6, i);
                        header.Append(prevResizer);
                        prevHead = header;
                    }
                };
                /**
                 * Handles setting initial width for header rows
                 */
                WunderGrid.prototype.handleInitialWidthsForResizer = function () {
                    if (this.filteredData.length > 0 && this.tHead.element.children.length > 0) {
                        var len = this.tHead.element.children.length;
                        this.Style.width = (this.element.clientWidth + (10 * len)) + 'px';
                        for (var i = 0; i < len; i++) {
                            var header = this.tHead.element.children[i];
                            if (!header.style.width)
                                header.style.width = (header.clientWidth + 10) + 'px';
                        }
                    }
                };
                WunderGrid.prototype.mouseMove = function (event) {
                    var resizer = this.context.selectedResizer;
                    if (resizer)
                        resizer.onMouseMove(event);
                };
                /*********************************************************************************************************************************************************************/
                /* Region local sorting filtering and paging*/
                /*********************************************************************************************************************************************************************/
                /**
               * Changes the page number of the grids local data
               * @param pageNum - the page to change to.
               */
                WunderGrid.prototype.changePage = function (pageNum, refresh) {
                    if (refresh === void 0) { refresh = true; }
                    if (this.paging) {
                        this.pageNum = pageNum - 1;
                        var startIndex = this.pageNum * this.pageSize;
                        var newData = this.filteredData.slice(startIndex, startIndex + this.pageSize);
                        if (refresh)
                            this.localRefresh(newData);
                        var maxPages = 0;
                        if (this.Data != undefined
                            && this.pageSize !== undefined) {
                            maxPages = Math.ceil(this.Data.length / this.pageSize);
                        }
                        this.onPageChange.fire(this.pageNum + 1, maxPages);
                    }
                };
                /**
                * Changes the sort column being used for the local sorting
                * @param sortBy - Sort by fields to sort on
                * @param refresh - determines if a data refresh should occur when the method is called.
                */
                WunderGrid.prototype.applySorting = function (sortBy, refresh) {
                    this.sortBy = sortBy;
                    if (this.filteredData) {
                        var len_1 = sortBy.length;
                        this.filteredData = this.filteredData.sort(function (a, b) {
                            for (var i = 0; i < len_1; i++) {
                                var sort = sortBy[i];
                                var col = sort.column;
                                var valA = a[col];
                                var valB = b[col];
                                if (valA < valB) {
                                    if (sort.sortDirection == TSF.Data.SortDirection.ASC)
                                        return -1;
                                    else
                                        return 1;
                                }
                                else if (valA > valB) {
                                    if (sort.sortDirection == TSF.Data.SortDirection.ASC)
                                        return 1;
                                    else
                                        return -1;
                                }
                                if ((valA === undefined || valA === null) && (valB !== undefined && valB !== null)) {
                                    if (sort.sortDirection == TSF.Data.SortDirection.ASC)
                                        return -1;
                                    else
                                        return 1;
                                }
                                if ((valB === undefined || valB === null) && (valA !== undefined && valA !== null)) {
                                    if (sort.sortDirection == TSF.Data.SortDirection.ASC)
                                        return 1;
                                    else
                                        return -1;
                                }
                            }
                            return 0;
                        });
                        if (refresh && this.paging)
                            this.changePage(1, true);
                        else if (refresh)
                            this.localRefresh(this.filteredData);
                        this.onSortChanged.fire(this.sortBy);
                    }
                };
                /**
                 *  Gets the current sorted column.
                 */
                WunderGrid.prototype.getSort = function () {
                    return this.sortBy;
                };
                /**
                * Apply filter to local client side data. Type sensitive.
                * Cannot compare string to numbers and like statements can only be used on string columns.
                * @param filters - Filters to apply to the data
                * @param refresh - determines if a data refresh should occur when the method is called.
                */
                WunderGrid.prototype.applyFilter = function (filters, refresh) {
                    if (refresh === void 0) { refresh = true; }
                    if (this.criteria != filters)
                        this.pageNum = 0;
                    this.criteria = filters;
                    if (refresh) {
                        this.filteredData = TSF.Data.Filtering.filterOnCondition(this.Data, this.criteria, this.columnHash);
                    }
                    this.pageNum = 0;
                    if (refresh && this.paging)
                        this.changePage(1, true);
                    else if (refresh)
                        this.localRefresh(this.filteredData);
                };
                WunderGrid.prototype.localRefresh = function (data) {
                    this.updating = true;
                    if (this.columnsChanged)
                        this.createHeaderRow();
                    this.createBody(data);
                    this.updating = false;
                };
                return WunderGrid;
            }(UI.TSControl));
            /** internal hash of operations for filtering data */
            WunderGrid.OperationsHash = undefined;
            /** caches regex expressions so it doesn't have to compile it every time for filtering*/
            WunderGrid.regexHash = {};
            Grid.WunderGrid = WunderGrid;
        })(Grid = UI.Grid || (UI.Grid = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=WunderGrid.js.map