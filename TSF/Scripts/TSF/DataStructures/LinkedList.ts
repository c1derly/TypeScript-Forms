/*Data Structures*/
namespace TSF.DS {

    /**
     * Linked list structure
     */
    export class LinkList<T> {
        public root: Link<T>;
        public last: Link<T>;
        count = 0;
        /**
         * Pushes a value into the end list and returns the link references
         * @param value - value to add
         */
        public push(value: T): Link<T> {
            var link = new Link<T>();
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
        }
        /**
         * Adds element to the beggining of the list and returns a reference to the link
         * @param value - value to insert
         */
        public insertFirst(value: T): Link<T>
        {
            var link = new Link<T>();
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
        }
        /**
         * Inserts a value before a the specified link
         * @param value - value to insert
         * @param link - the link to insert the value before
         */
        public insertBeforeLink(value: T,link:Link<T>): Link<T>
        {
            var newLink = new Link<T>();
            link.val = value;
            link.previous.next = newLink;
            newLink.previous = link.previous;
            link.previous = newLink;
            newLink.next = link;
            return newLink;
        }

        /**
         * Inserts a value before a the first found value in the list
         * @param value - value to insert
         * @param valueToInsertBefore - the value to insert the value before
         */
        public insertBeforeValue(value: T, valueToInsertBefore: Link<T>): Link<T> {
            var link = this.first((x: T) => x === value);
            if (link)
                return this.insertBeforeLink(value, link);
            else
                throw new Base.Exception('Value not found in list');
        }



        /**
         * Inserts a value after a the specified link
         * @param value - value to insert
         * @param link - the link to insert the value before
         */
        public insertAfterLink(value: T, link: Link<T>): Link<T> {
            var newLink = new Link<T>();
            link.val = value;
            link.next.previous = newLink;
            newLink.next = link.next;
            link.next = newLink;
            newLink.previous = link;
            
            return newLink;
        }

        /**
         * Inserts a value after a the first found value in the list
         * @param value - value to insert
         * @param valueToInsertAfter - the value to insert the value after
         */
        public insertAfterValue(value: T, valueToInsertAfter: Link<T>): Link<T> {
            var link = this.first((x: T) => x === value);
            if (link)
                return this.insertBeforeLink(value, link);
            else
                throw new Base.Exception('Value not found in list');
        }


        /**
         * Filters the list  by the criteria specified by the method passed in
         * @param filterMethod - the method to use to filter
         */
        public filter(filterMethod:(val: T)=> boolean){
            var currentLink = this.root;
            let links = new Array<Link<T>>();
            while(currentLink !== undefined)
            {
                if (filterMethod(currentLink.val))
                {
                    links.push(currentLink);
                    currentLink = currentLink.next;
                }
            }
        }
        /**
         * Gets the firet element in the list that matches the provided criteria
         * @param filterMethod - the method to filter on
         */
        public first(filterMethod: (val: T) => boolean) {
            var currentLink = this.root;

            while (currentLink !== undefined) {
                if (filterMethod(currentLink.val)) {
                    return currentLink;
                }
            }
            return undefined;
        }
        /**
         * Removes the last element from the list and returns the value for it
         */
        public pop(): T {
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
        }
        /**
         *  Pushes a list of values into the linkList
         * @param values
         */
        public pushList(values: Array<T>) {
            var length = values.length;
            for (var i = 0; i < length; i++) {
                this.push(values[i]);
            }
        }
    }
    export class Link<T> {
        val: T;
        next: Link<T>;
        previous: Link<T>;
    }
}