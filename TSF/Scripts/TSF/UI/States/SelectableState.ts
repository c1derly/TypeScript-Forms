/// <reference path="..\..\Data\AbstractClasses\AObservable.ts" />
namespace TSF.UI.States {
    /**
     * Observable state of the grid if needed for architecture
     */
    export class SelectableState extends Data.AbstractClasses.AObservable<SelectableState> {
        /** selected data in the grid */
        selectedData: Array<any> = [];
        /** the data being displayed in the grid*/
        data: Array<any> = [];
    }
}