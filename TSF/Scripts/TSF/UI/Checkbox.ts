/// <reference path=".\TSControl.ts" />
namespace TSF.UI {

    /**
     * Class that represents a checkbox and on as check change events etc.  Also implements the ability to do indeterminate checkboxes
     */
    export class Checkbox extends TSControl {
        /** sets if the checkbox should be allowed to be in an indeterminate state*/
        protected indeterminate = false;
        protected indetermRegistered = false;
        public set Indeterminate(val: boolean)
        {
            this.indeterminate = val;
            if (val === true && !this.element.hasAttribute("checked") && !this.beenChecked) {
                (<any>this.element).indeterminate = true;
            }
            
      
        }
        public get Indeterminate(): boolean
        {
            return this.indeterminate;
        }
        /** keeps track of if the checkbox has been checked yet */
        protected beenChecked = false;

        /** determines if the checkbox is checked */
        public get Checked(): boolean {
            if (this.indeterminate === true && this.beenChecked === false && !this.element.hasAttribute("checked"))
                return undefined;
            else
                return (<HTMLInputElement>this.element).checked
        }
        /** sets the the checked value on the checkbox */
        public set Checked(val: boolean) {
            this.beenChecked = true;
            (<HTMLInputElement>this.element).checked = val;
            if (val !== undefined)
                (<any>this.element).indeterminate = false;
        }

        protected onCheckedChanged: Events.CheckedChangedEvent;
        public get OnCheckedChanged(): Events.CheckedChangedEvent {
            if (this.onCheckedChanged === undefined) {
                this.onCheckedChanged = new Events.CheckedChangedEvent();
                this.element.onchange = () => this.onCheckedChanged.fire(this, this.args);
            }
            return this.onCheckedChanged;
        }
        protected handleCheckedChanged(sender: Checkbox, checked: boolean, args: any) {
            this.beenChecked = true;
        }
        /**
         * A Checkbox control that can be used in the html markup or just constructed plainly in javacsript
         * @param id - the id of the control to bind the elemnt to
         */
        constructor(id: string);
        /**
         * A Checkbox control that can be used in the html markup or just constructed plainly in javacsript
         * @param ele - html element to bind the control to
         */
        constructor(ele: HTMLElement);
        /**
         * A Checkbox control that can be used in the html markup or just constructed plainly in javacsript
         */
        constructor();
        /**
         * A Checkbox control that can be used in the html markup or just constructed plainly in javacsript
         * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
         * @param logicalParent - the logical parent entity such as a controller.  Used internally.
         */
        constructor(ele?, logicalParent?: UI.LogicalControl) {
            super(ele, logicalParent);
            if (ele === undefined) {
                this.checkEmptyEle('input');
                this.element.setAttribute('type', 'checkbox');
            }
            this.loadConfiguration('args', 'indeterminate');
            this.convertToBoolean('indeterminate', false);
            this.OnCheckedChanged.add(this.handleCheckedChanged, this);
            var changeEvent = this.jElement.attr('onchange');
            if (changeEvent !== null && changeEvent !== undefined) {
                this.OnCheckedChanged.add(function (sender, checked, args) { eval(changeEvent) }, (logicalParent === undefined) ? this : logicalParent);
            }
        }
    }
}

