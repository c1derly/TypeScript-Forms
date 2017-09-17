/// <reference path=".\TSControl.ts" />
namespace TSF.UI {
    /**
  * Drop down control
  */
    export class MultiSelect extends TSControl implements Data.Interfaces.IBindableWithKeys, Data.Interfaces.IMultiSelectable {
        /** list of selected indicies */
        protected selectedIndicies: Array<number> = [];
        /** attribute of the objects being bound to the control to use for the display text */
        public TextKey: string;
        /** attribute of the objects being bound to the control to use for the value */
        public ValueKey: string;

        /** Event fired when the selected item list has changed */
        protected onSelectionChanged= new Events.GenericEvent<MultiSelect, Array<DropDownItem>>() ;
        /** The on OnSelection Changed event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
        public get OnSelectionChanged(): Events.UIEvent {
            return this.onSelectionChanged;
        }

        /** html element of the control */
        public element: HTMLSelectElement;

        /** internal use only for not firing extra events */
        protected updatingSelected = false;
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
            super(ele, logicalParent);
            if (this.Attributes['multiple'] === undefined)
                this.element.setAttribute('multiple', '');
            this.checkEmptyEle('select');
            this.loadConfiguration('dataSource', 'TextKey', 'ValueKey');

            var onchanged= <any>this.jElement.attr('onchange');
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
            var i = 0;
            if ($("option", this.jElement).length > 0) {
                initialData = new Array<Object>();
                var extractItemData = (index, elem) => {
                    let ele = $(elem);

                    var item = new DropDownItem(ele.text(), ele.val(), elem);
                    this.items.push(item);
                    if (elem.selected)
                        this.selectedIndicies.push(i);

                    item.index = i;
                    item.jElement.attr('idx', i);
                    i++;
                };
                $("option", this.jElement).each(extractItemData);
            }


            var me = this;
            this.element.onchange = () => this.changeSelection();


        }
        /** gets the list of selected values of the control */
        public get SelectedValues(): Array<any> {

            let items = this.SelectedItems;
            return items.map((x) => x.data);
        }
        /** sets the list of selected values of the control.  This does change the UI Selection */
        public set SelectedValues(value: Array<any>) {
            this.updatingSelected = true;
            this.selectedIndicies = [];
            if (value !== undefined && this.items !== undefined && this.items !== null) {
                var length = this.items.length;
                for (var i = 0; i < length; i++) {
                    let item = this.items[i];
                    let len = value.length;
                    let found = false;
                    for (let j = 0; j < len; j++) {
                        if (item.data == value[j]) {
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        item.element.selected = true;
                        this.selectedIndicies.push(i);
                    }
                    else
                        item.element.selected = false;

                }

            }
            this.updatingSelected = false;
            this.onSelectionChanged.fire(this, this.SelectedItems);
        }

        /** list of drop down items in the control */
        protected items: Array<DropDownItem> = [];
        /** Sets the items on the drop down */
        public set Items(val: Array<DropDownItem>) {
            this.selectedIndicies = [];
            this.emptyContent();
            if (val) {
                let len = val.length;
                for (let i = 0; i < len; i++) {
                    let item = val[i];
                    this.Append(item);
                    if (item.element.selected)
                        this.selectedIndicies.push(i);
                }
            }
            this.items = val;
        }
        /** gets the items in the drop down*/
        public get Items(): Array<DropDownItem> {
            return this.items;
        }

        /** gets the selected dropdownitems of the control */
        public get SelectedItems(): Array<DropDownItem> {
            return this.selectedIndicies.map((x) => this.items[x]);
        }
        /** sets the selected dropdownitems of the control.  This does change the UI Selection */
        public set SelectedItems(val: Array<DropDownItem>) {
            this.updatingSelected = true;
            this.selectedIndicies = [];
            this.element.selectedIndex = -1;
            if (val) {
                var length = val.length;

                for (var i = 0; i < length; i++) {
                    let item = val[i];

                    item.element.selected = true;
                    this.selectedIndicies.push(item.element.index);


                }
            }

            this.selectedIndicies.sort();
            this.updatingSelected = false;
            this.onSelectionChanged.fire(this, val);
        }

        /** the data source for the control */
        protected dataSource: Data.Interfaces.IDataSource = undefined;
        /** Gets the data source of the object */
        get DataSource(): Data.Interfaces.IDataSource {
            return this.dataSource;
        }
        /** Sets te data source for the object */
        set DataSource(value: Data.Interfaces.IDataSource) {
            if (this.dataSource !== undefined && this.dataSource !== null && typeof this.dataSource !== 'string') {
                this.dataSource.onDataUpdated.remove(this.bind, this);
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

            this.items = [];
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
            this.element.selectedIndex = -1;
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
        protected changeSelection() {
            if (!this.updatingSelected) {
                this.selectedIndicies = this.getSelectedIndicies();

                this.OnSelectionChanged.fire(this, this.SelectedItems);
            }
        }
        /**
         * gets the selected indexes internal
         */
        protected getSelectedIndicies() {
            if (this.element.selectedOptions === undefined)
                return this.getSelectedDropDownsIE();
            var selected = this.element.selectedOptions;
            let len = selected.length;
            var selectedIndicies = [];
            for (let i = 0; i < len; i++) {
                selectedIndicies.push((<HTMLOptionElement>selected[i]).index);
            }
            return selectedIndicies;
        }
        /**
         * handles gets indexes in a different way for ie because it doesn't support selectedOptions
         */
        protected getSelectedDropDownsIE() {
            let len = this.items.length;
            var indicies = [];
            for (let i = 0; i < len; i++) {
                if (this.items[0].element.selected)
                    indicies.push(i);
            }
            return indicies;
        }
    }

}