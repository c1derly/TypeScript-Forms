/// <reference path=".\TSControl.ts" />
namespace TSF.UI {
    export enum ButtonType {
        button,
        submit,
        reset,
        undefined
    }
    /**
     * Class that represents a button.
     */
    export class Button extends TSControl {

        public get Type(): ButtonType {
            var attr = this.element.getAttribute('type');
            if (attr === undefined || attr === null)
                return ButtonType.undefined;
            else
                return ButtonType[attr.toLocaleLowerCase()];
        }
        public set Type(type: ButtonType) {
            this.element.setAttribute('type',ButtonType[type]);
        }
        /**
         * A Button control that can be used in the html markup or just constructed plainly in javacsript
         * @param id - the id of the control to bind the elemnt to
         */
        constructor(id: string);
        /**
         * A Button control that can be used in the html markup or just constructed plainly in javacsript
         * @param ele - html element to bind the control to
         */
        constructor(ele: HTMLButtonElement);
        /**
         * A Button control that can be used in the html markup or just constructed plainly in javacsript
         */
        constructor();
        /**
         * A Button control that can be used in the html markup or just constructed plainly in javacsript
         * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
         * @param logicalParent - the logical parent entity such as a controller.  Used internally.
         */
        constructor(ele?, logicalParent?: UI.LogicalControl) {
            super(ele, logicalParent);
            this.checkEmptyEle('button');
        }
    }
}

