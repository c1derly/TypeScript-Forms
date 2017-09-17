/*Data Structures*/
var TSF;
(function (TSF) {
    var DS;
    (function (DS) {
        /**
         * Linked list structure
         */
        var LinkList = (function () {
            function LinkList() {
                this.count = 0;
            }
            /**
             * Pushes a value into the end list and returns the link references
             * @param value - value to add
             */
            LinkList.prototype.push = function (value) {
                var link = new Link();
                link.val = value;
                if (this.last === undefined) {
                    this.last = link;
                    this.root = link;
                }
                else {
                    link.previous = this.last;
                    this.last.next = link;
                    this.last = link;
                }
                this.count++;
                return link;
            };
            /**
             * Adds element to the beggining of the list and returns a reference to the link
             * @param value - value to insert
             */
            LinkList.prototype.insertFirst = function (value) {
                var link = new Link();
                link.val = value;
                if (this.last === undefined) {
                    this.last = link;
                    this.root = link;
                }
                else {
                    var temp = this.root;
                    this.root = link;
                    link.next = temp;
                    temp.previous = link;
                }
                this.count++;
                return link;
            };
            /**
             * Inserts a value before a the specified link
             * @param value - value to insert
             * @param link - the link to insert the value before
             */
            LinkList.prototype.insertBeforeLink = function (value, link) {
                var newLink = new Link();
                link.val = value;
                link.previous.next = newLink;
                newLink.previous = link.previous;
                link.previous = newLink;
                newLink.next = link;
                return newLink;
            };
            /**
             * Inserts a value before a the first found value in the list
             * @param value - value to insert
             * @param valueToInsertBefore - the value to insert the value before
             */
            LinkList.prototype.insertBeforeValue = function (value, valueToInsertBefore) {
                var link = this.first(function (x) { return x === value; });
                if (link)
                    return this.insertBeforeLink(value, link);
                else
                    throw new TSF.Base.Exception('Value not found in list');
            };
            /**
             * Inserts a value after a the specified link
             * @param value - value to insert
             * @param link - the link to insert the value before
             */
            LinkList.prototype.insertAfterLink = function (value, link) {
                var newLink = new Link();
                link.val = value;
                link.next.previous = newLink;
                newLink.next = link.next;
                link.next = newLink;
                newLink.previous = link;
                return newLink;
            };
            /**
             * Inserts a value after a the first found value in the list
             * @param value - value to insert
             * @param valueToInsertAfter - the value to insert the value after
             */
            LinkList.prototype.insertAfterValue = function (value, valueToInsertAfter) {
                var link = this.first(function (x) { return x === value; });
                if (link)
                    return this.insertBeforeLink(value, link);
                else
                    throw new TSF.Base.Exception('Value not found in list');
            };
            /**
             * Filters the list  by the criteria specified by the method passed in
             * @param filterMethod - the method to use to filter
             */
            LinkList.prototype.filter = function (filterMethod) {
                var currentLink = this.root;
                var links = new Array();
                while (currentLink !== undefined) {
                    if (filterMethod(currentLink.val)) {
                        links.push(currentLink);
                        currentLink = currentLink.next;
                    }
                }
            };
            /**
             * Gets the firet element in the list that matches the provided criteria
             * @param filterMethod - the method to filter on
             */
            LinkList.prototype.first = function (filterMethod) {
                var currentLink = this.root;
                while (currentLink !== undefined) {
                    if (filterMethod(currentLink.val)) {
                        return currentLink;
                    }
                }
                return undefined;
            };
            /**
             * Removes the last element from the list and returns the value for it
             */
            LinkList.prototype.pop = function () {
                if (this.last != undefined) {
                    var temp = this.last;
                    if (this.last.previous !== undefined) {
                        this.last.previous.next = undefined;
                        this.last = this.last.previous;
                        return temp.val;
                    }
                    else {
                        this.last = undefined;
                        this.root = undefined;
                    }
                    this.count--;
                }
            };
            /**
             *  Pushes a list of values into the linkList
             * @param values
             */
            LinkList.prototype.pushList = function (values) {
                var length = values.length;
                for (var i = 0; i < length; i++) {
                    this.push(values[i]);
                }
            };
            return LinkList;
        }());
        DS.LinkList = LinkList;
        var Link = (function () {
            function Link() {
            }
            return Link;
        }());
        DS.Link = Link;
    })(DS = TSF.DS || (TSF.DS = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=LinkedList.js.map