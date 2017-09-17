/// <reference path="..\Events\EventHandler.ts" />
namespace TSF.Data {
    /**
     * An event fired when a data source has its page changed
     */
    export class PageChangeEvent extends Events.EventHandler<(pageNum: number, maxRecords?: number) => void>
    {
        /**
         * Fires the page change event
         * @param pageNum - the page being changed to
         * @param maxRecords - the max number of records available to make pages from
         */
        public fire(pageNum: number, maxRecords?: number): void {
            super.fire(pageNum ,maxRecords);
        }
    }
} 