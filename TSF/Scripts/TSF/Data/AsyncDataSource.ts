/// <reference path="..\Data\DataSource.ts" />

namespace TSF.Data {
    /**An asynchronous datasource.s**/
    export class AsyncDataSource extends DataSource implements Interfaces.IAsyncDataSource {
        /**Event is fired when the data is successfully updated**/
        onEndUpdate = new Events.ValueEvent<any>();
        
        /**Event fired right before making remote calls**/
        onStartUpdate = new Events.EmptyEvent();
        protected updateDS(ds: any) {
            this.onDataUpdated.fire(ds);
            this.onEndUpdate.fire(ds);
            this.onDSRefresh();

        }
        /**if either count or success callback fails**/
        protected failureCallback(exception: Base.Exception): any {
            this.onEndUpdate.fire(null);
            this.onError.fire(exception);
        }

        /**Refreshes the data in the datasource with the current page number and filters**/
        public async refresh()
        {
            this.onStartUpdate.fire();
            super.refresh();
            
        }
    }
}