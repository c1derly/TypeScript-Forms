/// <reference path=".\TSControl.ts" />
namespace TSF.UI {
       /**
     * Drop down control
     */
    export class DropDown extends TSControl implements Data.Interfaces.IBindableWithKeys, Data.Interfaces.ISelectable {
        public set SelectedIndex(val:number) {
            this.element.selectedIndex = val;
        }
        /** Selected index of the drop down -1 if none */
        public get SelectedIndex()
        {
            return this.element.selectedIndex;
        }
        /** attribute of the objects being bound to the control to use for the display text */
        public TextKey: string;
        /** attribute of the objects being bound to the control to use for the value */
        public ValueKey: string;
        /** Event fired when the selected item list has changed */
        protected onSelectionChanged = new Events.GenericEvent<DropDown, DropDownItem>();
        /** The on OnSelection Changed event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
        public get OnSelectionChanged(): Events.GenericEvent<DropDown, DropDownItem> {
            return this.onSelectionChanged;
        }
        /** html element of the control */
        public element: HTMLSelectElement;

        /** list of drop down items in the control */
        protected items: Array<DropDownItem> = [];
        /** Sets the items on the drop down */
        public set Items(val: Array<DropDownItem>) {
            this.emptyContent();
            if (val) {
                let len = val.length;
                for (let i = 0; i < len; i++) {
                    let item = val[i];
                    this.Append(item);
                    
                }
            }
            this.items = val;
        }
        /** gets the items in the drop down*/
        public get Items(): Array<DropDownItem> {
            return this.items;
        }

        /** gets the selected dropdownitems of the control */
        public get SelectedItem(): DropDownItem {
            return this.items[this.SelectedIndex];
        }
        /** sets the selected dropdownitems of the control.  This does change the UI Selection */
        public set SelectedItem(val: DropDownItem) {
            val.element.selected = true;

        }
        /**
         * Drop down control 
         * @param id - the id of the control to bind the elemnt to
         */
        constructor(id: string);
        /**
         * Drop down control
         * @param ele - html element to bind the control to
         * @param logicalParent - the logical parent of the control used for relative expressions (for internal user)
         */
        constructor(ele: HTMLElement, logicalParent?: UI.LogicalControl);
        /**
         * A Base control that can be used in the html markup or just constructed plainly in javacsript
         */
        constructor();

        /**
         * Drop down control
         * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
         * @param logicalParent - the logical parent entity such as a controller.  Used internally.
         */
        constructor(ele?, logicalParent?: UI.LogicalControl) {
            super(ele,logicalParent);
            this.checkEmptyEle('select');
            this.loadConfiguration('dataSource', 'TextKey', 'ValueKey');

            var onchanged = <any>this.jElement.attr('onchange');
            if (onchanged !== null && onchanged !== undefined) {
                this.OnSelectionChanged.add(function (sender, args) { eval(onchanged) }, (logicalParent === undefined) ? this : logicalParent);
            }
            if (this.TextKey === undefined) {
                this.TextKey = "text";
            }
            if (this.ValueKey === undefined) {
                this.ValueKey = "value";
            }
            if (this.dataSource)
                this.DataSource = this.getRelativePath(<any>this.dataSource);
            var initialData = null;
            if ($("option", this.jElement).length > 0) {
                initialData = new Array<Object>();
                var extractItemData = (index, elem) => {
                    var item = new Object();
                    item[this.TextKey] = $(elem).text();
                    item[this.ValueKey] = $(elem).val();
                    initialData.push(item);
                };
                $("option", this.jElement).each(extractItemData);
            }
            this.jElement.empty();

            var me = this;
            this.element.onchange = () => this.changeIndex();

            if (initialData !== null) {
                this.bind(initialData);
            }
        }
             /** gets the selected value of the control */
        get SelectedValue(): any {
            if (this.SelectedIndex !== -1)
                return this.items[this.SelectedIndex].data;
            else
                return undefined;
        }
        /** sets the list of the selected value of the control.  This does change the UI Selection */
        set SelectedValue(value) {
            if (value === undefined) {
                this.SelectedIndex = -1
                return;
            }
            if (this.items !== undefined && this.items !== null) {
                var length = this.items.length;
                var index = -1;
                for (var i = 0; i < length; i++) {
                    if (this.items[i].data == value) {
                        index = i;
                        break;
                    }
                }
                if (index != -1)
                    this.SelectedIndex = index;
            }
            
        }
        /** the data source for the control */
        protected dataSource: Data.Interfaces.IDataSource = undefined;
        /** Gets the data source of the object */
        public get DataSource(): Data.Interfaces.IDataSource {
            return this.dataSource;
        }
        /** Sets te data source for the object */
        public set DataSource(value: Data.Interfaces.IDataSource) {
            if (this.dataSource !== undefined && this.dataSource !== null && typeof this.dataSource !== 'string') {
                this.dataSource.onDataUpdated.remove(this.bind,this);
            }
            this.dataSource = value;
            if (this.dataSource != null) {
                this.dataSource.onDataUpdated.add(this.bind, this);
            }
        }
                /**
         * Binds the data to the control given the TextKey and ValueKey to map the data
         * @param data - data to bind to the control
         */
        public bind(data: Array<any>) {

            this.jElement.empty();

            for (var i = 0; i < data.length; i++) {
                var dat = data[i];
                var item: DropDownItem;
                if (typeof dat == 'string')
                    item = new DropDownItem(<string>dat, <string>dat);
                else {
                    if (this.ValueKey === 'valueOf')
                        item = new DropDownItem(dat[this.TextKey], dat);
                    else
                        item = new DropDownItem(dat[this.TextKey], dat[this.ValueKey]);
                }
                this.items.push(item);

                item.index = i;
                item.jElement.attr('idx', i);

                var me = this;
                this.Append(item);
            }
            this.SelectedIndex = -1;
        }
                /**
         * Gets underlying data to the drop down items if there is any.
         */
        public getData(): Array<Object> {
            return this.items.map((d) => d.data);
        }
         /**
         * Handeles selection change.  Internal.
         */
        protected changeIndex() {

            if (this.items && this.items.length > 0)
                this.onSelectionChanged.fire(this, this.items[this.SelectedIndex]);
        }


    }
    
}