/// <reference path="..\TSControl.ts" />
namespace TSF.UI.Grid {

    /** Possible types of selection methods for the grid.  */
    export enum SelectionType {
        NONE,SINGLE,MULTI
    }
    /**
     * Grid view used to display data in a grid format.  Includes functionality for sorting, column resizing,
     * selection, multi selection, ability to be hooked up to a pager or filter.
     */
    export class WunderGrid extends TSControl implements Data.Interfaces.IBindable, Data.Interfaces.IFilterable, Data.Interfaces.IPageable, Data.Interfaces.ISortable, Data.Interfaces.IMultiSelectable {

        /** internal hash of operations for filtering data */
        protected static OperationsHash = undefined;

        /** caches regex expressions so it doesn't have to compile it every time for filtering*/
        protected static regexHash = {};

        /** internal used to determine when to fire certain events */
        protected updating = false;

        /** determines if the columns have been changed since the last time they were drawn */
        protected columnsChanged = false;

        /** table header used when constructing the table */
        protected tBody = new TSControl(document.createElement('tbody'));

        /** table body used when constructing the table */
        protected tHead = new TSControl(document.createElement('thead'));
        protected headerRow = new TSControl(document.createElement('tr'));
        /** Enables client paging of the data on the grid */
        public paging = false;
        /** Page size for client paging */
        public pageSize = 10;
        /** local page number of the data if client paging is enabled */
        protected pageNum: number;

        /** Criteria to filter the local data set by */
        protected criteria: Data.Condition;

        /** internal data reference to manipulating data set on the client side */
        protected filteredData: Array<any> = [];

        /** Sort by list for local sorting */
        public sortBy: Array<Data.SortElement>;

        /** an observable state if intending to use with mvc style.  Contains data and selected data members */
        public state: States.SelectableState;
        /** local selected rows attribute */
        protected selectedRows: Array<WunderRow> = [];

        /** if the grid is in editing mode */
        protected editing = false;

        /** type of selection NONE,SINGLE,MULTI*/
        public selection: SelectionType;

        /** Fired when the selected row(s) change*/
        protected onSelectionChanged: Events.GenericEvent<WunderGrid, Array<WunderRow>>;
         /** Fired when the selected row(s) change*/
        public get OnSelectionChanged()
        {
            if (!this.onSelectionChanged)
                this.onSelectionChanged = new Events.GenericEvent<WunderGrid, Array<WunderRow>>();
            return this.onSelectionChanged;
        }
        public get SelectedValues():Array<any>
            {
            return this.state.selectedData;
        }

        /** used if you want the sorting to apply to a data source or another ISortable object  instead of the local data in the grid */
        protected sortTarget
        /** used if you want the sorting to apply to a data source or another ISortable object  instead of the local data in the grid */
        public set SortTarget(val: Data.Interfaces.ISortable)
        {
            this.sortTarget = val;
            if (this.enableSorting === undefined)
                this.enableSorting = true;
        }
        public get SortTarget(): Data.Interfaces.ISortable
        {
            if (!this.sortTarget)
                return this;
            else
                return this.sortTarget;
        }

        /** Enables sorting ont the columns if set to true.  Not applied if providing a custom IGenerateHeader column*/
        protected enableSorting

        public set EnableSorting(val: boolean)
        {
                
            this.enableSorting = val;
            if (this.filteredData)
                this.createHeaderRow();
            
        }
        public get EnableSorting(): boolean
        {
            if (this.enableSorting === undefined)
                return false;
            else 
                return this.enableSorting;
        }
        /** used to alert the pager when the page has changed */
        public onPageChange = new Data.PageChangeEvent();

        public onSortChanged = new Events.ValueEvent<Array<Data.SortElement>>();

        /* Gets fired on the creation of every row.  Usefull for visual formatting of the rows */
        public onRowCreated = new Events.ValueEvent<WunderRow>();

        public columnHeaders: Array<WunderColumnHeader> = [];
        /** Returns true if the table is in editing mode */
        get Editing(): boolean {
            return this.editing;
        }
        /** Set the table to editing mode or remove it from editing mode */
        set Editing(ed: boolean) {
            this.editing = ed;
            var count = this.rows.length;
            for (var i = 0; i < count; i++) {
                var row = this.rows[i];
                row.Editing = ed;

            }
        }
        /**
         * Edits a specific row
         * @param row -row to edit
         */
        EditRow(row: WunderRow) {
            row.Editing = true;
        }
        /**
         * Stops editing a specific row
         * @param row - row to stop editing
         */
        FinishEditRow(row: WunderRow) {
            row.Editing = false;
        }

        /** The datasource for the object */
        protected dataSource: Data.Interfaces.IAsyncDataSource;
        /** The datasource for the object */
        public get DataSource(): Data.Interfaces.IAsyncDataSource {
            return this.dataSource;
        }
        /** The datasource for the object */
        public set DataSource(dataSource: Data.Interfaces.IAsyncDataSource)
        {
            if (this.dataSource)
            {
                this.dataSource.onStartUpdate.remove(this.onStartUpdate, this);
                this.dataSource.onEndUpdate.remove(this.onEndUpdate, this);
            }
            this.dataSource = dataSource;
            if (this.dataSource) { 
                this.dataSource.onStartUpdate.add(this.onStartUpdate, this);
                this.dataSource.onEndUpdate.add(this.onEndUpdate, this);
            }
        }
        /** used for efficiency purposes to get the configuration for a column based on the name */
        protected columnHash
        /** columns to display in the grid */
        protected columns: Array<WunderColumn> = [];
        /** columns to display in the grid The getter is always returns a list of WunderColumn*/
        public get Columns(): Array<string | WunderColumn> {
            return this.columns;
        }
        /** columns to display in the grid */
        public set Columns(columns: Array<string | WunderColumn>) {
            
            this.columnHash = {};
            if (columns)
            {
                this.autoGenerateColumns = false;
                var len = columns.length;
                for (let i = 0; i < len; i++)
                {
                    var col = columns[i];
                    
                    if (typeof (col) == "string")
                        col = columns[i] = new WunderColumn(col);
                    col.ColumnNumber = i;
                    this.columnHash[col.dataField] = col;
                }
            }
            this.columns = <Array<WunderColumn>> columns;
            this.columnsChanged = true;
        }
        /** columns to display in the grid */
        public selectedRowClass: string;
        /** set wether or not to auto generate columns */
        public get AutoGenerateColumns() {
            return this.autoGenerateColumns;
        }
        /** set wether or not to auto generate columns */
        public set AutoGenerateColumns(autoGenerateColumns: boolean) {
            this.autoGenerateColumns = autoGenerateColumns;
            this.columnsChanged = true;
        }
        /** auto generates the columns based on the objects used as input if set to true */
        protected autoGenerateColumns = true;
        /* the rows of the grid */
        protected rows: Array<WunderRow> = [];

        /** gets the data the grid is using for display purposes */
        public get Data() {
            return this.state.data;
        }

        /** sets the data on the grid.  Causes a refresh of the data on the grid*/
        public set Data(data: Array<any>) {
            if (this.updating) {
                this.state.$setAttributeWithoutEvent('data', data);
                this.filteredData = data;
            }
            else {
                this.state.$setAttributeWithoutEvent('data', data);
                this.filteredData = data;
                this.refresh();
                
            }
        }

        /** The selected rows of the grid */
        public get SelectedRows(): Array<WunderRow> {
            return this.selectedRows;
        }

        /** The selected rows of the grid */
        public set SelectedRows(rows: Array<WunderRow>) {
            if (!rows)
                rows = [];
            this.selectRows(rows);
        }
        /*  selects rows on the grid */
        protected selectRows(rows: Array<WunderRow>) {
            var selClass = this.selectedRowClass;
            if (!selClass)
                selClass = 'selected';
            if (!rows)
                rows = [];
            var selectedRows = this.selectedRows;
            let len = selectedRows.length
            for (let i = 0; i < len; i++) {
                selectedRows[i].jElement.removeClass(selClass);
            }
            len = rows.length;
            var data = [];
            for (let i = 0; i < len; i++) {
                var row = rows[i];
                row.jElement.addClass(selClass);
                data[i] = row.Data;
            }
            this.selectedRows = rows;
            this.state.$setAttributeWithoutEvent('selectedData', data);
            this.onSelectionChanged.fire(this, rows);
        }
        /** The rows of the grid */
        public set Rows(val: Array<WunderRow>) {
            var len = val.length;
            this.tBody.emptyContent();
            for (let i = 0; i < len; i++) {
                this.tBody.Append(val[i]);
            }
            this.rows = val;
        }
        /** The rows of the grid */
        public get Rows() {
            return this.rows;
        }
        /**
         * Allows you to select a row by dynamic criteria provided by a method you pass in.  If the method returns true
         * for a given data input the row is selected.
         * @param filter - The method to determine if a row is selected
         */
        public selectRowByCriteria(filter: (data: any) => boolean) {
            var rows = this.rows.filter(filter);
            this.selectRows(rows);
        }
        /**
         * Selects a row when the attribute specified for the data of that row equals the value provided
         * @param attribute - attribute to use in the comparison
         * @param value - value to use in the comparison
         */
        public selectRowByAttribute(attribute: string, value: any) {
            var rows = this.rows.filter((x) => x.Data[attribute] == value)
            this.selectRows(rows);
        }
        /**
         * Finds the row with the data object provided and selects it
         * @param data - the data you want selected
         */
        public selectRowByData(data: Array<any> | any) {

            var rows;
            if (Array.isArray(data)) {
                rows = [];
                let len = this.rows.length;
                for (let i = 0; i < len; i++) {
                    var dat = data[i];
                    var res = this.rows.filter((x) => x.Data == dat)
                    if (res.length > 0)
                        rows.push(res[0]);
                }
            }
            else {
                rows = new Array(1);
                rows[0] = data;
            }
            this.selectRows(rows);

        }


        /**
         * A grid control used for displaying table data
         * @param id - the id of the html element to bind the control to
         */
        constructor(id: string);
        /**
         * A grid control used for displaying table data
         * @param ele - the html element to bind the control to
         */
        constructor(ele: HTMLTableElement);
        /**
         * A grid control used for displaying table data
         */
        constructor();
        /**
         * A grid control used for displaying table data
         * @param ele - the html element to use for the control
         * @param logicalParent - the logical parent entity such as a controller.  Used internally.
         */
        constructor(ele?, logicalParent?: UI.LogicalControl) {
            super(ele,logicalParent);
            if (ele === undefined)
                this.checkEmptyEle('table');
            this.Append(this.tHead);
            this.tHead.Append(this.headerRow);
            this.loadConfiguration('selection', 'dataSource', 'state', 'selectedRowClass', 'clientPaging', 'pageSize','ColumnsResizable','enableSorting','sortTarget');
            this.convertToInteger('pageSize', 10);
            this.convertToBoolean('clientPaging', false);
            this.convertToBoolean('ColumnsResizable', false);
            this.convertToBoolean('enableSorting', undefined);

            if (this.sortTarget) {
                this.SortTarget = this.getRelativePath(this.sortTarget);
            }
            if (this.dataSource) { 
                var ds = <any>this.dataSource;
                this.dataSource = undefined;
                this.DataSource = this.getRelativePath(ds);
            }
            if (this.selection)
                this.selection = <any>SelectionType[(<any>this.selection).toUpperCase()];
            if (this.state)
                this.state = eval(<any>this.state);
            else
                this.state = new UI.States.SelectableState();
            this.state.$observe(this, (state) => this.selectRowByData(state.selectedData), 'selectedData');
            this.state.$observe(this, (state: any) => this.refresh(), 'data');
            

        }
        /**
         *  used if the data changes from the state observable
         */
        refresh()
        {
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
        }
        /** Binds data to the grid.  Causes the grid to re-draw the data in the grid and if the columns have changed the columns are re-drawn */
        public bind(data: Array<any>) {
            this.updating = true;
            this.Data = data;

            this.filteredData = data;
            if (this.criteria)
                this.applyFilter(this.criteria,false);
            if (this.sortBy)
                this.applySorting(this.sortBy, false);
            if (this.paging)
                this.changePage(1);
            else
                this.createBody(this.filteredData);
            
            this.updating = false;

        }
        /**
         *  creates the body of the table
         * @param data - data to make the body with
         */
        protected createBody(data: Array<any>)
        {
            try {
                this.element.removeChild(this.tBody.element);
            }
            catch (e)
            {

            }
            this.updating = true;
            var dataLen = data.length;
            this.tBody.emptyContent();
            if (this.columnsChanged)
                this.createHeaderRow();
            this.rows = new Array<WunderRow>(dataLen);
            for (let i = 0; i < dataLen; i++) {
                var row = new WunderRow();
                
                row.grid = this;
                row.columns = this.columns;
                row.Editing = this.editing;
                row.RowNumber = i;
                row.Data = data[i];
                row.OnClick.add((row) => this.handleSelection(<WunderRow>row), this);
                this.rows[i] = row;
                this.tBody.Append(row);
                this.onRowCreated.fire(row);
            }
            
            this.Append(this.tBody);
        }
        /**
         * The row to handle selection for (handler for on click)
         * @param row
         */
        protected handleSelection(row: WunderRow)
        {
            switch (this.selection) {
                case SelectionType.NONE:
                    return;
                case SelectionType.SINGLE:
                    this.selectRows([row]);
                    break;
                case SelectionType.MULTI:
                    var newSelection = this.selectedRows.filter((x) => x !== row);
                    if (newSelection.length === this.selectedRows.length)
                        newSelection.push(row);
                    this.selectRows(newSelection);
                    break;
            }
        }
        /**
         * Creates the header rows in the grid
         */
        protected createHeaderRow() {
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
                    for (let att in ele) {
                        if (ele.hasOwnProperty(att)) {
                            (<any>this.columns).push(new WunderColumn(att));
                        }
                    }
                    this.columnsChanged = false;
                }
            }

            var colLength = this.columns.length;
            if (colLength > 0) {
                for (let i = 0; i < colLength; i++) {
                    var col = this.columns[i];
                    if (col.customHeader) {
                        var header = col.customHeader.generateHeader(col, this);
                        headers[i] = header;
                        this.headerRow.Append(header);
                    }
                    else {
                        if (this.EnableSorting) {
                            var sorter = new Extensions.SortableColumnHeader();
                            var header = sorter.generateHeader(col, this.SortTarget);
                            if (this.sortBy && this.sortBy.length > 0)
                                sorter.sortChanged(this.sortBy);
       
                            headers[i] = header;
                            this.headerRow.Append(header);
                        }
                        else {
                            var header = new WunderColumnHeader();
                            let textEle = new TSControl(document.createElement('span'));
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
            setTimeout(() => {
                if (this.ColumnsResizable) {
                    this.addResizers();
                    this.handleInitialWidthsForResizer();

                }
            }, 1);
        }
        
       
        /**
         * displays the loading message when connected to an async data source
         */
        protected onStartUpdate()
        {
            if (this.rows.length === 0) {
                this.rows.push(new WunderRow());
                this.tBody.Append(this.rows[0]);
            }
            try{
                this.element.removeChild(this.tBody.element);
            }
            catch (e) {

            }
            var len = this.rows.length;
            for (let i = 1; i < len; i++) {
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
        }
        /**
         * Listener for an async data source that updates the data on the grid
         * @param data
         */
        protected onEndUpdate(data)
        {
            this.bind(data);
        }


         /*********************************************************************************************************************************************************************/
        /* Region resizable columns */
        /*********************************************************************************************************************************************************************/

        protected eventsRegistered = false;
        /** internal boolean keeping track of if the columns are resizable */
        protected columnsResizable: boolean;

        /** True means columns can be resized False means they can't */
        public get ColumnsResizable(): boolean {
            return this.columnsResizable;
        }

        /** True means columns can be resized False means they can't */
        public set ColumnsResizable(val: boolean) {
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
                $(window).mouseup(() => this.context.selectedResizer = undefined);
                $(window).mousemove((event) => this.mouseMove(event));
            }
        }

        addResizers() {
            var len = this.columnHeaders.length;
            let prevHead: WunderColumnHeader;
            let prevResizer;
            for (let i = 0; i < len; i++) {
                let header = this.columnHeaders[i];
                let ele: HTMLDivElement;
                let resizer: Resizer;
                if (prevHead) {
                    ele = document.createElement('div');
                    ele.innerHTML = '&nbsp;';
                    resizer = new Resizer(ele, this, prevHead, true, 6,i - 1);
                    header.Append(resizer);
                    resizer.prevResizer = prevResizer
                }
                ele = document.createElement('div');
                ele.innerHTML = '&nbsp;';
                prevResizer = new Resizer(ele, this, header, false, 6,i);
                header.Append(prevResizer);

                prevHead = header;

            }
        }
        /**
         * Handles setting initial width for header rows
         */
        protected handleInitialWidthsForResizer()
        {
            if (this.filteredData.length > 0 && this.tHead.element.children.length > 0) {
                
                let len = this.tHead.element.children.length;
                this.Style.width = (this.element.clientWidth + (10 * len)) + 'px';
                for (let i = 0; i < len; i++) {
                    let header: HTMLTableHeaderCellElement = <HTMLTableHeaderCellElement>this.tHead.element.children[i];
                    if (!header.style.width)
                        header.style.width = (header.clientWidth + 10) + 'px';
                }
            }
        }
        protected mouseMove(event)
        {
            var resizer: Resizer = this.context.selectedResizer;
            if (resizer)
                resizer.onMouseMove(event);
        }

        

       

        /*********************************************************************************************************************************************************************/
        /* Region local sorting filtering and paging*/
        /*********************************************************************************************************************************************************************/


        /**
       * Changes the page number of the grids local data
       * @param pageNum - the page to change to.
       */
        public changePage(pageNum: number, refresh: boolean = true) {
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
        }

        /**
        * Changes the sort column being used for the local sorting
        * @param sortBy - Sort by fields to sort on
        * @param refresh - determines if a data refresh should occur when the method is called.
        */
        public applySorting(sortBy: Array<Data.SortElement>, refresh?: boolean) {
            this.sortBy = sortBy;
            if (this.filteredData) {
                let len = sortBy.length;
                this.filteredData = this.filteredData.sort(function (a, b) {
                    for (let i = 0; i < len; i++) {
                        let sort = sortBy[i];
                        let col = sort.column;
                        let valA = a[col];
                        let valB = b[col];

                        if (valA < valB) {
                            if (sort.sortDirection == Data.SortDirection.ASC)
                                return -1;
                            else
                                return 1;
                        }
                        else if (valA > valB) {
                            if (sort.sortDirection == Data.SortDirection.ASC)
                                return 1;
                            else
                                return -1;
                        }

                        if ((valA === undefined || valA === null) && (valB !== undefined && valB !== null)) {
                            if (sort.sortDirection == Data.SortDirection.ASC)
                                return -1;
                            else
                                return 1;
                        }
                        if ((valB === undefined || valB === null) && (valA !== undefined && valA !== null)) {
                            if (sort.sortDirection == Data.SortDirection.ASC)
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
        }
        /**
         *  Gets the current sorted column.
         */
        public getSort(): Array<Data.SortElement> {
            return this.sortBy;
        }
        /**
        * Apply filter to local client side data. Type sensitive.
        * Cannot compare string to numbers and like statements can only be used on string columns.
        * @param filters - Filters to apply to the data
        * @param refresh - determines if a data refresh should occur when the method is called.
        */
        public applyFilter(filters: Data.Condition, refresh: boolean = true) {
            if (this.criteria != filters)
                this.pageNum = 0;
            this.criteria = filters;
            if (refresh) {
                this.filteredData = Data.Filtering.filterOnCondition(this.Data, this.criteria, this.columnHash);
            }

            this.pageNum = 0;
            if (refresh && this.paging)
                this.changePage(1, true);
            else if (refresh)
                this.localRefresh(this.filteredData);
        }
        
        protected localRefresh(data) {
            this.updating = true;
            if (this.columnsChanged)
                this.createHeaderRow();
            this.createBody(data);
            this.updating = false;
        }
    }
}