/// <reference path=".\TSControl.ts" />
namespace TSF.UI {
    /**
         * Drop down item used in the drop down control which contains display and selected data info.
         */
    export class DropDownItem extends TSControl {

        public data: any;
        index: number;
        /**the JQuery wrapped DOM row object**/
        public element: HTMLOptionElement;
        constructor(text: string, value: any, element?: HTMLOptionElement) {
            super(element);
            this.checkEmptyEle('option');
            if (value !== undefined && value != null)
                this.jElement.val(value.toString());
            this.Text = text;
            this.data = value;
        }
    }
}