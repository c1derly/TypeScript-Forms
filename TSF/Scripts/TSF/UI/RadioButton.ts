/// <reference path=".\TSControl.ts" />
namespace TSF.UI {
    /**
     * Radio button control 
     */
    export class RadioButton extends TSControl {
        protected value: any;
        /** Value for the radio button.  If set this way it can be an object as well as a string */
        public set Value(val: any)
        {
            this.value = val;
        }
        public get Value()
        {
            if (this.value)
                return this.value;
            else
                return this.element.value;
        }
        label:Label;
        /**
         * gets the label object of the radio button
         */
        public get Label(): Label
        {
            if(!this.label)
                this.findLabel()
            return this.label;
        }
        /**
         * sets the label object to the radio button
         */
        public set Label(value:Label)
        {
            this.label = value;
        }
        /**
         * gets the label text of the radio button
         */
        public get LabelText()
        {
            if(!this.label)
                this.findLabel()
            if(!this.label)
                return undefined;
            else
                return this.label.Text;
        }
        /**
         * sets the label text of the radio button
         */
        public set LabelText(value:string)
        {
            if(!this.label)
                this.findLabel()
            if(this.label)
                this.label.Text = value;
        }

        protected findLabel()
        {
            var jLabel = $("label[for='"+this.element.id+"']")
            if(jLabel.length > 0)
            {
                var label:any = jLabel[0];
                if(label.TSControl)
                    this.label = label.TSControl;
                else
                    this.label = new Label(label);
            }
        }
        /** html element of the control*/
        public element: HTMLInputElement;
        /** internal selection change event*/
        protected onSelectionChanged: Events.UIEvent;
        /** The on change event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
        public get OnSelectionChanged(): Events.UIEvent {
            if (!this.onSelectionChanged) {
                this.onSelectionChanged = new Events.UIEvent();
                this.element.onchange = () => this.onSelectionChanged.fire(this, this.args);
            }
            return this.onSelectionChanged;
        }


        /**
         * A RadioButton control that can be used in the html markup or just constructed plainly in javacsript
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
         * A RadioButton control that can be used in the html markup or just constructed plainly in javacsript
         * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
         * @param logicalParent - the logical parent entity such as a controller.  Used internally.
         */
        constructor(ele?, logicalParent?: UI.LogicalControl) {
            super(ele, logicalParent);
            if (ele === undefined) {
                this.checkEmptyEle('input');
                
            }
            this.element.setAttribute('type', 'radio');
            
            (<any>this.element).TSControl = this;

        }
        /** Gets or Sets the selected value for the group of radio buttons */
        public get SelectedValue():any
        {
            let selectedItem = this.SelectedItem;
            if (selectedItem === undefined)
                return undefined; 
            if ((<any>selectedItem).Value !== undefined)
                return (<any>selectedItem).Value;
        }

        /** Gets the selected value of the radio button group */
        public set SelectedValue(val: any)
        {
            let ctrls = <NodeListOf<HTMLInputElement>>document.getElementsByName(this.Name);
            let len = ctrls.length;
            for (let i = 0; i < len; i++) {
                let ctrl = ctrls[i];

                if ((<any>ctrl).TSControl !== undefined) {
                    let tsCtrl = <RadioButton>(<any>ctrl).TSControl;
                    if (tsCtrl.Value === val) {
                        tsCtrl.Checked = true;
                    }
                }
                else if (ctrl.value === val) {
                    ctrl.checked = true;
                }

            }
   
        }

        /**selects the specific control */
        public set Checked(val: boolean)
        {
            this.element.checked = val;
        }
        /**returns true if the control is selected */
        public get Checked(): boolean
        {
            return this.element.checked;
        }

        /** name (group) of the radio button */
        public get Name(): string {
            return this.element.name;
        }
        public set Name(val: string)
        {
            this.element.name = val;
        }

        /** returns the ts control if one exists for the selected item otherwise just the html element */
        public get SelectedItem(): HTMLInputElement | RadioButton
        {
            let ctrls = <NodeListOf<HTMLInputElement>>document.getElementsByName(this.Name);
            let len = ctrls.length;
            for (let i = 0; i < len; i++)
            {
                let ctrl = ctrls[i];
                if (ctrl.checked) {
                    if ((<any>ctrl).TSControl !== undefined)
                        return (<any>ctrl).TSControl;
                    else
                        return ctrl;
                }
            }
            return undefined;
        }


    }
}