/// <reference path=".\TSControl.ts" />
namespace TSF.UI {
    /**
     * Label button control 
     */
    export class Label extends TSControl {

        
        public get For()
        {
            return this.jElement.attr('for');
        }

        public set For(value:string)
        {
            this.jElement.attr('for',value);
        }
 


        /**
         * A Label control that can be used in the html markup or just constructed plainly in javacsript
         * @param id - the id of the control to bind the elemnt to
         */
        constructor(id: string);
        /**
         * A RadioButton control that can be used in the html markup or just constructed plainly in javacsript
         * @param ele - html element to bind the control to
         */
        constructor(ele: HTMLElement);
        /**
         * A RadioButton control that can be used in the html markup or just constructed plainly in javacsript
         */
        constructor();
        /**
         * A Label control that can be used in the html markup or just constructed plainly in javacsript
         * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
         * @param logicalParent - the logical parent entity such as a controller.  Used internally.
         */
        constructor(ele?, logicalParent?: UI.LogicalControl) {
            super(ele, logicalParent);
            if (ele === undefined) {
                this.checkEmptyEle('label');
                
            }
            
            (<any>this.element).TSControl = this;
        }


    }
}