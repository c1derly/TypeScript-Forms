/// <reference path=".\LogicalControl.ts" />
namespace TSF.UI {
    export class TSControl extends LogicalControl {
        public context: any = {};
        args: any;
        protected static eventList = {};

        protected onClick: Events.UIEvent;
        /** The on click event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
        public get OnClick(): Events.UIEvent {
            if (this.onClick === undefined) {
                this.onClick = new Events.UIEvent();
                this.element.onclick = () => this.onClick.fire(this, this.args);
            }
            return this.onClick;
        }

        protected onDoubleClick: Events.UIEvent;
        /** The on double click event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
        public get OnDoubleClick(): Events.UIEvent {
            if (this.onDoubleClick === undefined) {
                this.onDoubleClick = new Events.UIEvent();
                this.element.ondblclick = () => this.onDoubleClick.fire(this, this.args);
            }
            return this.onDoubleClick;
        }

        /**
         * A Base control that can be used in the html markup or just constructed plainly in javacsript
         * @param id - the id of the control to bind the elemnt to
         */
        constructor(id: string);
        /**
         * A Base control that can be used in the html markup or just constructed plainly in javacsript
         * @param ele - html element to bind the control to
         * @param logicalParent - the logical parent of the control used for relative expressions (for internal user)
         */
        constructor(ele: HTMLElement | JQuery, logicalParent?: UI.LogicalControl);
        /**
         * A Base control that can be used in the html markup or just constructed plainly in javacsript
         */
        constructor();

        /**
         * A Base control that can be used in the html markup or just constructed plainly in javacsript
         * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
         * @param logicalParent - the logical parent entity such as a controller.  Used internally.
         */
        constructor(ele?, logicalParent?: UI.LogicalControl) {
            super(ele, logicalParent);
            if (ele !== undefined) {
                var clickEvent = this.jElement.attr('onclick');
                if (clickEvent !== null && clickEvent !== undefined) {
                    this.OnClick.add(function (sender, args) { eval(clickEvent) }, (logicalParent === undefined) ? this : logicalParent);
                }
                var doubleClickEvent = this.jElement.attr('ondblclick');
                if (doubleClickEvent !== null && doubleClickEvent !== undefined) {
                    this.OnDoubleClick.add(function (sender, args) { eval(doubleClickEvent) }, (logicalParent === undefined) ? this : logicalParent);
                }
                this.loadConfiguration('args');
            }
        }
        /**
         * Appends a control to the child elements of the current control
         * @param control - the control to append
         */
        public Append(control: TSControl) {
            this.jElement.append(control.jElement);
        }
        /**
         * Insert control before the provided control in the html
         * @param control - the control to insert this object before
         */
        public InsertBefore(control: TSControl) {
            this.jElement.insertBefore(control.jElement);
        }
        /**
         * Insert control after the provided control in the html
         * @param control - the control to insert this object after
         */
        public InsertAfter(control: TSControl) {
            this.jElement.insertAfter(control.jElement);
        }
        /**
         * clears all of the child html elements from the control
         */
        public emptyContent() {
            this.jElement.empty();
        }
        /** returns the tag name of the element*/
        public get TagName(): string {
            return this.element.tagName;
        }
        /** returns the class name of the element */
        public get Class(): string {
            return this.element.className;
        }
        /** Sets the class name of the element */
        public set Class(val: string) {
            this.element.className = val;
        }
        /** The attributes of the element */
        public get Attributes(): NamedNodeMap {
            return this.element.attributes;
        }
        /** the style of the element */
        public get Style(): CSSStyleDeclaration {
            return this.element.style;
        }
        /** Text of the html element */
        public get Text(): string {
            return this.jElement.text();
        }
        /** Text of the html element */
        public set Text(val: string) {
            this.jElement.text(val);
        }
        /** Value of the html element */
        public get Value(): string {
            return this.jElement.val();
        }
        /** Value of the html element */
        public set Value(val: string) {
            this.jElement.val(val);
        }

        protected disabled: boolean;
        /** Get or set the disabled status of the element */
        public get Disabled(): boolean {
            return this.disabled;
        }
        /** Get or set the disabled status of the element */
        public set Disabled(value: boolean) {
            if (value !== this.disabled) {
                if (value === false) {
                    this.disabled = false;
                    this.jElement.removeAttr('disabled');
                } else {
                    this.disabled = true;
                    this.jElement.attr('disabled', 'disabled');
                }
            }
        }
        protected previousDisplay: string;
        /**
         * Hides the control (display:none)
         */
        public hide() {
            this.previousDisplay = this.element.style.display;
            this.jElement.hide();
        }
        /**
         * Shows the control.  Sets the previous display type if hide was used previously
         */
        public show() {
            if (!this.previousDisplay && this.previousDisplay.toUpperCase() !== "NONE")
                this.element.style.display = this.previousDisplay;
            else
                this.jElement.show();
        }
        /**
         * load html content into the body construct any controls used specified in the markup.  This can be used to refer to
         * this object in the var attribute in this method.
         * @param data - html data to load into the control
         */
        protected loadHtml(data: string) {
            if (data !== undefined) {
                if (this.jElement === undefined) {
                    this.jElement = $(data);
                    this.element = this.jElement[0];
                    Base.TSBase.constructControls.apply(this, [this.element]);
                }
                else {
                    this.jElement.append($(data));
                    var children = this.element.children;
                    var len = children.length;
                    for (let i = 0; i < len; i++)
                        Base.TSBase.constructControls.apply(this, [children[i]]);
                }
            }
        }


    }

}