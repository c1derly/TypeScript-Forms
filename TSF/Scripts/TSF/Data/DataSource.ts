/// <reference path="..\UI\LogicalControl.ts" />
/// <reference path=".\Criteria.ts" />
namespace TSF.Data {
    /**An asynchronous datasource.s**/
    export class DataSource extends TSF.UI.LogicalControl implements Interfaces.IDataSource, Interfaces.IFilterable, Interfaces.IPageable{

        /**The data associated with the data source upon successful retrieval**/
        data: any;
        /**The number of records to return per page**/
        pageSize: number;

        /**the current page number  not to be set directly.**/
        pageNum: number = 0;

        /**gets set automatically if count method is provided**/
        maxRecords: number;

        /**setting for if you want the datasource to fire start and end events (usually loading bar)**/
        fireStartEndEvents: boolean;

        /**The columns to sort on**/
        public sortBy: Array<SortElement>;

        /** default Sort by is used for the sort by if the sort by is not set or has 0 elements */
        public defaultSortBy: Array<SortElement>;

        /** Url to the remote method to call for the data source*/
        dataUrl: string;

        /** Url to the remote method to call for the data source */
        countUrl: string;

        /** Criteria to filter the remote data set by */
        protected criteria: Condition;

        /** criteria currently set on data source */
        public get Criteria(): Condition
        {
            return this.criteria;
        }

        /**Event is fired when the data is successfully updated**/
        public onDataUpdated = new Events.ValueEvent<any>();

        public onError = new Events.ValueEvent<Base.Exception>();

        /**Is fired when the page changed in the datasource (used by pagers in case something resets the data source and also provides max pages to display)**/
        public onPageChange = new PageChangeEvent();

        public onSortChanged = new Events.ValueEvent<Array<Data.SortElement>>();

        /**An datasource for use with filters and pagers.
        @dataUrl - The url to for the ajax call to retrieve the data to display
        @countUrl - the url to the record count method for the datasource.  Optional if server side paging is desired.
        @pageSize - the number of records per page to display to the user
       
        **/
        constructor(id: string);
        constructor(ele: HTMLElement);
        constructor(ele: HTMLElement, logicalParent?: UI.LogicalControl);
        constructor(ele, logicalParent?: UI.LogicalControl) {
            super(ele, logicalParent);
            this.loadConfiguration('dataUrl', 'countUrl', 'pageSize', 'clientPaging', 'fireStartEndEvents');
            this.convertToInteger('pageSize', 0);
            this.convertToBoolean('clientPaging', false);
            this.convertToBoolean('fireStartEndEvents', false);
            
        }


        /**Calls the data retrieval method.**/
        public async callDataMethod() {

            if (this.pageSize === undefined)
                this.pageSize = this.maxRecords;

            var startIndex = this.pageNum * this.pageSize;
            var recordCount: number;

            if (this.maxRecords < startIndex + this.pageSize)
                recordCount = this.maxRecords - startIndex;
            else
                recordCount = this.pageSize;
            var query = new Query();
            query.condition = this.criteria;
            query.startRecord = startIndex;
            query.returnCount = recordCount;
            if (this.sortBy && this.sortBy.length > 0)
                query.sortBy = this.sortBy;
            else
                query.sortBy = this.defaultSortBy;

            new Remote.RemoteCall(this.dataUrl, query).advancedOptions(Remote.RequestType.POST, this.fireStartEndEvents).call().then((data) => {
                    this.data = data;
                    this.updateDS(this.data);
                }).catch((ex) => {
                    console.error(ex);
                    this.onError.fire(ex);
                });

         
     
        }


        /* fire the updated data source method and determines the max pages etc */
        protected updateDS(ds: any) {
            this.onDataUpdated.fire(ds);
            this.onDSRefresh();

        }

        protected onDSRefresh() {
            var maxPages = 0;
            if (this.maxRecords != undefined
                && this.pageSize !== undefined) {
                maxPages = Math.ceil(this.maxRecords / this.pageSize);
            }
            this.onPageChange.fire(this.pageNum + 1, maxPages);
        }


        /**Refreshes the data in the datasource with the current page number and filters**/
        public async refresh() {
            
            if (this.countUrl !== undefined
                && this.countUrl !== null) {
                var query = new Query();
                query.condition = this.criteria;
                if (this.sortBy && this.sortBy.length > 0)
                    query.sortBy = this.sortBy;
                else
                    query.sortBy = this.defaultSortBy;
                this.maxRecords = <number>await new Remote.RemoteCall(this.countUrl, query).advancedOptions(Remote.RequestType.POST, this.fireStartEndEvents).call();
                this.callDataMethod();
            }
            else {
                this.callDataMethod();
            }
        }

        /**
         * Applies filters to the data source (resets page to 0);
         * @param filters - Filters to apply to the data source
         * @param refresh - determines if a data refresh should occur when the method is called.
         */
        public applyFilter(filters: Condition, refresh: boolean = true) {
            if (this.criteria != filters )
                this.pageNum = 0;
            this.criteria = filters;
            if (refresh) {
                    this.refresh();
            }
        }


        
        /**
         * Changes the sort column being used for the datasource for the server side sorting
         * @param sortBy - Sort by fields to sort on
         * @param refresh - determines if a data refresh should occur when the method is called.
         */
        public applySorting(sortBy: Array<SortElement>, refresh?: boolean) {
            this.sortBy = sortBy;
            this.pageNum = 0;
            

            if (refresh === undefined || refresh === true)
                this.refresh();
            this.onSortChanged.fire(this.sortBy);

        }


        /**
         * Changes the page number of the data source
         * @param pageNum - the page to change to.
         */
        public changePage(pageNum: number) {
            this.pageNum = pageNum - 1;

            this.refresh();

        }
    }
    

}