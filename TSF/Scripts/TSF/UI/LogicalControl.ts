namespace TSF.UI {
    export class LogicalControl {
        /** this is the parent element in the html markup.  That means if an object such as a text box is 
assigned to a controller the controller would be the parent. This is defined by the var attribute in the html and
will not change when the element is moved around in the html or moved to a different controller unless manually
changed.*/
        public logicalParent: LogicalControl;
        /** html element of the control*/
        public element: HTMLElement;
        /** jquery element of the control */
        public jElement: JQuery;
        /**
         * Internal constructor used by the base framework
         * @param ele - element to bind to the control
         * @param logicalParent - the logical parent of the control used for relative expressions - (for internal use)
         */
        constructor(ele: HTMLElement | JQuery, logicalParent?: UI.LogicalControl);
        /**
         * A logical control that can be used in the html markup or just constructed plainly in javacsript
         * @param id - the id of the control to bind the elemnt to
         */
        constructor(id: string);
        /**
         * A logical control that can be used in the html markup or just constructed plainly in javacsript
         * @param ele - html element to bind the control to
         * @param logicalParent - the logical parent of the control used for relative expressions (for internal use)
         */
        constructor(ele: HTMLElement, logicalParent?: UI.LogicalControl);
        /**
         * A logical control that can be used in the html markup or just constructed plainly in javacsript
         */
        constructor();
        /**
         * A logical control that can be used in the html markup or just constructed plainly in javacsript
         * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
         * @param logicalParent - the logical parent entity such as a controller.  Used internally.
         */
        constructor(ele?, logicalParent?: LogicalControl) {
            this.logicalParent = logicalParent;
            Base.TSBase.onInit.add(this.TSInit, this);
            if (ele === undefined) 
                    return;
            if (typeof ele == 'string') {
                this.jElement = $('#' + ele);
                this.element = this.jElement[0];
            }
            else {
                this.jElement = $(ele);
                this.element = this.jElement[0];
                
            }

        }
        public TSInit()
        {

        }
        /**
         * Loads html attributes into attributes of the class.  Case sensitive.  For example if you
         * have an attribute such as selectionEnabled.  You would need a string attribute in your class named that exact name
         * The attribute on the html is not case sensitive and the value of that attribute would be loaded into the object attribute.
         * Takes an arbitrary number of attributes to load.
         * @param attributes - the list of attributes to load
         */
        public loadConfiguration(...attributes) {
            var len = attributes.length;
            for (let i = 0; i < len; i++) {
                let att = attributes[i];
                this[att] = this.element.getAttribute(att);
                if (this[att] === null)
                    this[att] = undefined;
            }
        }
        /**
         * checks to see if the element passed in is undefined and if it is create a new element to use
         * for the object of the specified type i.e. button
         * @param type - the type of html control to create if one was not passed in
         */
        protected checkEmptyEle(type: string) {
            if (this.element === undefined) {
                this.element = document.createElement(type);
                this.jElement = $(this.element);
            }
        }
        /**
         *  converts a specific object member to a boolean.  Used for converting configurations that
         * that come in as strings.
         * @param attribute - attribute to convert to boolean
         * @param defaultVal - the default value to use if its not defined.
         */
        protected convertToBoolean(attribute: string, defaultVal?: boolean) {
            var res: string = this[attribute];
            if (res === null || res === undefined) {
                if (defaultVal !== undefined)
                    this[attribute] = defaultVal;
                else
                    this[attribute] = undefined;

            }
            else {
                res = res.toUpperCase();
                if (res === "TRUE")
                    this[attribute] = true;
                else if (res === "FALSE") {
                    this[attribute] = false;
                }
                else {
                    if (defaultVal !== undefined)
                        this[attribute] = defaultVal;
                    else
                        this[attribute] = undefined;
                }
            }
        }
        /**
         *  converts a specific object member to a float.  Used for converting configurations that
         * that come in as strings.
         * @param attribute - attribute to convert to float
         * @param defaultVal - the default value to use if its not defined.
         */
        protected convertToFloat(attribute: string, defaultVal?: number) {
            var res = parseFloat(this[attribute]);
            if (isNaN(res)) {
                if (defaultVal !== undefined)
                    this[attribute] = defaultVal;
                else
                    this[attribute] = undefined;

            }
            else {
                this[attribute] = res;
            }
        }
        /**
         *  converts a specific object member to a integer.  Used for converting configurations that
         * that come in as strings.
         * @param attribute - attribute to convert to integer
         * @param defaultVal - the default value to use if its not defined.
         */
        protected convertToInteger(attribute: string, defaultVal?: number) {
            var res = parseInt(this[attribute]);
            if (isNaN(res)) {
                if (defaultVal !== undefined)
                    this[attribute] = defaultVal;
                else
                    this[attribute] = undefined;

            }
            else {
                this[attribute] = res;
            }
        }
        /**
         * Gets a value from an object using the logicalParent and a string to get a value.  The format is.
         * one period for every level up followed by the member ie.  ..DataSource would retreive
         * logicalParent.logicalparent.DataSource.  This is used for parsing attributes in html elements
         * that are intended to have relative paths such as the data source of a grid
         * @param path - string path to the value to retreive
         */
        public getRelativePath(path: string): any
        {
            var pth = path.trim();
            var splitPath = pth.split(/[\.]/g);
            var len = splitPath.length;
            len = len - 1;
            let currentNode:LogicalControl = this;
            if (len === 0)
                return window[pth];
            for (var i = 0; i < len; i++){
                if (!currentNode && splitPath[i] !== '')
                    break;
                currentNode = currentNode.logicalParent;
            }
            if (currentNode) {
                var temp = splitPath.slice(i, splitPath.length);
                if (temp.length === 0)
                    return currentNode;
                else
                    return currentNode[temp.join('')];
            }
        }
       
    }
}