/// <reference path=".\TSControl.ts" />
namespace TSF.UI {

    /**
     * Class that represents a Textbox.
     */
    export class TextBox extends TSControl {

        /** html element of the control*/
        public element: HTMLInputElement;
        protected onTextChange: Events.UIEvent;
        /** The on text change event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
        public get OnTextChange(): Events.UIEvent {
            if (!this.onTextChange) {
                this.onTextChange = new Events.UIEvent();
                this.element.onchange = () => this.onTextChange.fire(this, this.args);
            }
            return this.onTextChange;
        }

        /**
         * A TextBox control that can be used in the html markup or just constructed plainly in javacsript
         * @param id - the id of the control to bind the elemnt to
         */
        constructor(id: string);
        /**
         * A TextBox control that can be used in the html markup or just constructed plainly in javacsript
         * @param ele - html element to bind the control to
         */
        constructor(ele: HTMLElement);
        /**
         * A TextBox control that can be used in the html markup or just constructed plainly in javacsript
         */
        constructor();
        /**
         * A TextBox control that can be used in the html markup or just constructed plainly in javacsript
         * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
         * @param logicalParent - the logical parent entity such as a controller.  Used internally.
         */
        constructor(ele?, logicalParent?: UI.LogicalControl) {
            super(ele, logicalParent);
            if (ele === undefined) {
                this.checkEmptyEle('input');
            }
            this.element.setAttribute('type', 'text');
            var onchanged = <any>this.jElement.attr('onchange');
            if (onchanged !== null && onchanged !== undefined) {
                this.OnTextChange.add(function (sender, args) { eval(onchanged) }, (logicalParent === undefined) ? this : logicalParent);
            }
        }
    }
}

