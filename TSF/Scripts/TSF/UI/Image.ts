/// <reference path=".\TSControl.ts" />
namespace TSF.UI {
    /**
     *  An image control for displaying images on a page
     */
    export class Image extends TSControl {
        element: HTMLImageElement;
        /**
         * A Image control that can be used in the html markup or just constructed plainly in javacsript
         * @param id - the id of the control to bind the elemnt to
         */
        constructor(id: string);
        /**
         * A Image control that can be used in the html markup or just constructed plainly in javacsript
         * @param ele - html element to bind the control to
         */
        constructor(ele: HTMLElement);
        /**
         * A Image control that can be used in the html markup or just constructed plainly in javacsript
         */
        constructor();
        /**
         * A Image control that can be used in the html markup or just constructed plainly in javacsript
         * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
         * @param logicalParent - the logical parent entity such as a controller.  Used internally.
         */
        constructor(ele?, logicalParent?: UI.LogicalControl) {
            super(ele, logicalParent);
            if (ele === undefined) {
                this.checkEmptyEle('img');
            }
        }
        /** url source for the image */
        set Src(value: string) {
            if (value === null || value === undefined)
                value = "";
            this.jElement.attr("src", value);
        }
        get Src(): string {
            return this.jElement.attr("src");
        }
    }
}