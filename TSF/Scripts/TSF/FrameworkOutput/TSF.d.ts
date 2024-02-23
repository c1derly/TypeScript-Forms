declare namespace TSF.Base {
    /**
     * Standard exception for error handeling
     */
    class Exception {
        /**
         * Exception used for throwing
         * @param message The message for the exception
         */
        constructor(ExceptionMessage?: string);
        /** Message for the exception (where the actual exception message is put from a serialized c# exception */
        ExceptionMessage: string;
        ExceptionType: string;
        StackTrace: string;
        Message: string;
        Parameters: any;
        InnerException: Exception;
    }
}
declare namespace TSF.Events {
    /**
     * Generic event handeler
     */
    class EventHandler<Func extends Function> {
        /** array of subscribers */
        protected events: Array<DS.Tuple>;
        /**
         * Adds a listener to the event object
         * @param method - method to call when the event is triggered
         * @param callBackObject - object to be used as the this when firing the event
         */
        add(method: Func, callBackObject: Object): void;
        /**
         * Removes a subscription from the event object
         * @param method - method to unsubscribe
         * @param callBackObject - object that was listening that wants to unsubscribe
         */
        remove(method: Func, callBackObject: Object): void;
        /**
         * Clears all events from the event handeler
         */
        clearEvents(): void;
        /**
         * Fires the event
         * @param args - the arguments to pass to the listening method.
         */
        fire(...args: any[]): void;
    }
}
declare namespace TSF.Events {
    /**
     * Event handeler with no input arguments
     */
    class EmptyEvent extends EventHandler<() => void> {
        fire(): void;
    }
}
declare namespace TSF.Remote {
    /**
     *  Standard exception with additional detail from a remote call
     */
    class RemoteException extends Base.Exception {
        constructor(message?: any);
        /** The return object from jquery for the remote call that had an exception*/
        jQueryXHR: JQueryXHR;
        /** The status returned from the call*/
        TextStatus: string;
        /** The url for the call that failed*/
        url: string;
        ErrorThrown: string;
    }
}
declare namespace TSF.Remote {
    /** request type for remote calls */
    enum RequestType {
        POST = 0,
        GET = 1,
        PUT = 2,
        DELETE = 3,
        TRACE = 4,
        CONNECT = 5
    }
    /**
     * Used to make remote calls a little bit easier by providing a fluent style remote call as well as an inline method.
     * This provides a prototype so you know which parameters are expected.  It also parses out the exception from the remote server if one is sent.
     */
    class RemoteCall<T> {
        /** Fires when a remote call has been fired and there currently isn't another remote call in progress that has fire events set to true */
        static OnStart: Events.EmptyEvent;
        /** Fired when all remote calls are finished.  This means that if more then one call is made before the previous one has finished
        then all remote calls have to finish before the OnStop event is fired if all methods are marked with fire events.  */
        static OnStop: Events.EmptyEvent;
        /** keeps track of the current number of remote calls being done through this class */
        static currentCallCount: number;
        /** url to make the remote call too */
        url: string;
        /** The type of request to make (POST, GET, PUT, DELETE, TRACE, CONNECT) */
        requestType: RequestType;
        /** Any data you wish to send to the server */
        data: any;
        /** Content type of the request (example: application/json)*/
        contentType: string;
        /** Datatype of the call.  */
        dataType: string;
        /** Header information to send to the server.  Each member and value of the object becomes a header element and its value*/
        reqHeaders: {};
        /** Denotes that start and end events should consider this remote call when determining when to fire */
        fireEvents: boolean;
        /**
         * Creates a command to send to the server using fluent style.
         * @param url The url to request
         * @param data The data to send to the server
         */
        constructor(url: string, data?: any);
        /**
         * Sets advanced options for the remote command
         * @param requestType The type of request to make (POST, GET, PUT, DELETE, TRACE, CONNECT)
         * @param fireEvents Denotes that start and end events should consider this remote call when determining when to fire
         * @param contentType Content type of the request (example: application/json)
         * @param dataType Datatype of the call.
         */
        advancedOptions(requestType?: RequestType, fireEvents?: boolean, contentType?: string, dataType?: string): this;
        /**
         * Adds header information to the remote call
         * @param headers - an object whose attributes will be used as headers
         */
        headers(headers: Object): this;
        /**
         * Calls a remote method and returns a promise that can be used with async await.
         */
        call(): Promise<T>;
        /**
         * And inline remote call that can be called statically
         * @param url - The url to make the remote call to
         * @param data - The data to use as input
         * @param requestType - (optional) request type such as POST,GET etc
         * @param fireEvents - Option to fire start and end events to the remote call.  Usually used to dispalying loading signs
         * @param reqHeaders - Additional headers to add to request
         * @param contentType - content type default is application/json
         * @param dataType - the data type of the call.
         */
        static callInline<T>(url: string, data?: any, requestType?: RequestType, fireEvents?: boolean, reqHeaders?: Object, contentType?: string, dataType?: string): Promise<T>;
        /**
         * Creates an exception based on the response of a call
         * @param XMLHttpRequest - the response from the remote call
         * @param textStatus - the status of the call
         * @param errorThrown - the errorthrown of the call
         * @param url - the url requested from the call
         */
        static constructException(XMLHttpRequest: any, textStatus: any, errorThrown: any, url?: string): RemoteException;
    }
}
declare namespace TSF.Base {
    /**
     * Base functionality for TSF that constructs the elements based on the html attributes.
     */
    class TSBase {
        static onInit: Events.EmptyEvent;
        static defaultTypes: any;
        /**
         * Goes through the HTML and constructs the controls marked in the html
         * @param element
         */
        static constructControls(element: HTMLElement): void;
        /**
        * Not intended for use outside of framework.  Used to handle relative paths in the var element of
        * html elements.
        * @param path - path to assign this control to.
        */
        static getRelativeObjects(path: string, parentNode: UI.LogicalControl): {
            parent: any;
            att: string;
        };
    }
}
declare var module: any;
declare namespace TSF.UI {
    class LogicalControl {
        /** this is the parent element in the html markup.  That means if an object such as a text box is
assigned to a controller the controller would be the parent. This is defined by the var attribute in the html and
will not change when the element is moved around in the html or moved to a different controller unless manually
changed.*/
        logicalParent: LogicalControl;
        /** html element of the control*/
        element: HTMLElement;
        /** jquery element of the control */
        jElement: JQuery;
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
        TSInit(): void;
        /**
         * Loads html attributes into attributes of the class.  Case sensitive.  For example if you
         * have an attribute such as selectionEnabled.  You would need a string attribute in your class named that exact name
         * The attribute on the html is not case sensitive and the value of that attribute would be loaded into the object attribute.
         * Takes an arbitrary number of attributes to load.
         * @param attributes - the list of attributes to load
         */
        loadConfiguration(...attributes: any[]): void;
        /**
         * checks to see if the element passed in is undefined and if it is create a new element to use
         * for the object of the specified type i.e. button
         * @param type - the type of html control to create if one was not passed in
         */
        protected checkEmptyEle(type: string): void;
        /**
         *  converts a specific object member to a boolean.  Used for converting configurations that
         * that come in as strings.
         * @param attribute - attribute to convert to boolean
         * @param defaultVal - the default value to use if its not defined.
         */
        protected convertToBoolean(attribute: string, defaultVal?: boolean): void;
        /**
         *  converts a specific object member to a float.  Used for converting configurations that
         * that come in as strings.
         * @param attribute - attribute to convert to float
         * @param defaultVal - the default value to use if its not defined.
         */
        protected convertToFloat(attribute: string, defaultVal?: number): void;
        /**
         *  converts a specific object member to a integer.  Used for converting configurations that
         * that come in as strings.
         * @param attribute - attribute to convert to integer
         * @param defaultVal - the default value to use if its not defined.
         */
        protected convertToInteger(attribute: string, defaultVal?: number): void;
        /**
         * Gets a value from an object using the logicalParent and a string to get a value.  The format is.
         * one period for every level up followed by the member ie.  ..DataSource would retreive
         * logicalParent.logicalparent.DataSource.  This is used for parsing attributes in html elements
         * that are intended to have relative paths such as the data source of a grid
         * @param path - string path to the value to retreive
         */
        getRelativePath(path: string): any;
    }
}
declare namespace TSF.Data {
    /** How to join criteria or criteria groups*/
    enum CriteriaJoin {
        And = 0,
        Or = 1
    }
    /** The type of comparison to do */
    enum CriteriaComparator {
        Equal = 0,
        NotEqual = 1,
        GreaterThan = 2,
        LessThan = 3,
        GreaterThanOrEqual = 4,
        LessThanOrEqual = 5,
        Like = 6,
        NotLike = 7,
        In = 8,
        NotIn = 9,
        IsNull = 10,
        IsNotNull = 11
    }
    /**
     * A class that represents an sql criteria
     */
    class Criteria {
        /** how to join it with the previous criteria (And,Or)*/
        join: CriteriaJoin;
        column: string;
        /** the value to compare the column to */
        value: Object;
        /** the type of comparison to be done */
        comparator: CriteriaComparator;
        /**
         * Creates a new criteria with the specified constraint
         * @param column - the column to the compare the value to
         * @param value - the value to compare against the column
         * @param comparator - the type of comparison to do (Equals, Greater than etc)
         * @param join - how to join the criteria to the previous criteria
         */
        constructor(column: string, value: Object, comparator?: CriteriaComparator, join?: CriteriaJoin);
    }
}
declare namespace TSF.Data {
    /**An asynchronous datasource.s**/
    class DataSource extends TSF.UI.LogicalControl implements Interfaces.IDataSource, Interfaces.IFilterable, Interfaces.IPageable {
        /**The data associated with the data source upon successful retrieval**/
        data: any;
        /**The number of records to return per page**/
        pageSize: number;
        /**the current page number  not to be set directly.**/
        pageNum: number;
        /**gets set automatically if count method is provided**/
        maxRecords: number;
        /**setting for if you want the datasource to fire start and end events (usually loading bar)**/
        fireStartEndEvents: boolean;
        /**The columns to sort on**/
        sortBy: Array<SortElement>;
        /** default Sort by is used for the sort by if the sort by is not set or has 0 elements */
        defaultSortBy: Array<SortElement>;
        /** Url to the remote method to call for the data source*/
        dataUrl: string;
        /** Url to the remote method to call for the data source */
        countUrl: string;
        /** Criteria to filter the remote data set by */
        protected criteria: Condition;
        /** criteria currently set on data source */
        get Criteria(): Condition;
        /**Event is fired when the data is successfully updated**/
        onDataUpdated: Events.ValueEvent<any>;
        onError: Events.ValueEvent<Base.Exception>;
        /**Is fired when the page changed in the datasource (used by pagers in case something resets the data source and also provides max pages to display)**/
        onPageChange: PageChangeEvent;
        onSortChanged: Events.ValueEvent<SortElement[]>;
        /**An datasource for use with filters and pagers.
        @dataUrl - The url to for the ajax call to retrieve the data to display
        @countUrl - the url to the record count method for the datasource.  Optional if server side paging is desired.
        @pageSize - the number of records per page to display to the user
       
        **/
        constructor(id: string);
        constructor(ele: HTMLElement);
        constructor(ele: HTMLElement, logicalParent?: UI.LogicalControl);
        /**Calls the data retrieval method.**/
        callDataMethod(): Promise<void>;
        protected updateDS(ds: any): void;
        protected onDSRefresh(): void;
        /**Refreshes the data in the datasource with the current page number and filters**/
        refresh(): Promise<void>;
        /**
         * Applies filters to the data source (resets page to 0);
         * @param filters - Filters to apply to the data source
         * @param refresh - determines if a data refresh should occur when the method is called.
         */
        applyFilter(filters: Condition, refresh?: boolean): void;
        /**
         * Changes the sort column being used for the datasource for the server side sorting
         * @param sortBy - Sort by fields to sort on
         * @param refresh - determines if a data refresh should occur when the method is called.
         */
        applySorting(sortBy: Array<SortElement>, refresh?: boolean): void;
        /**
         * Changes the page number of the data source
         * @param pageNum - the page to change to.
         */
        changePage(pageNum: number): void;
    }
}
declare namespace TSF.Data {
    /**An asynchronous datasource.s**/
    class AsyncDataSource extends DataSource implements Interfaces.IAsyncDataSource {
        /**Event is fired when the data is successfully updated**/
        onEndUpdate: Events.ValueEvent<any>;
        /**Event fired right before making remote calls**/
        onStartUpdate: Events.EmptyEvent;
        protected updateDS(ds: any): void;
        /**if either count or success callback fails**/
        protected failureCallback(exception: Base.Exception): any;
        /**Refreshes the data in the datasource with the current page number and filters**/
        refresh(): Promise<void>;
    }
}
declare namespace TSF.Data {
    /**
     * A class used to hold criteria for an sql call
     */
    class Condition {
        /** Used to hold a group of criteria that would be enclosed in a parathensis */
        criteriaGroup: CriteriaGroup[];
        /** used to hold a list of criteria */
        criteria: Criteria[];
        /**
         * Creates a new condition with an optional starting criteria
         * @param column - the column name to compare
         * @param value - the value to compare the parameter name against
         * @param comparator - the type of comparison to be done.
         */
        constructor(column?: string, value?: Object, comparator?: CriteriaComparator);
    }
}
declare namespace TSF.Data {
    /**
     * Holds a group of criteria to be enclosed in paranthesis
     */
    class CriteriaGroup {
        /** how to join the group onto the previous criteria or groups */
        join: CriteriaJoin;
        /** the list of criteria for the group*/
        criteria: Criteria[];
        /** sub groups of the groups*/
        groups: CriteriaGroup[];
        /**
         * how to join the group onto the previous criteria.
         * @param join
         */
        constructor(join?: CriteriaJoin);
    }
}
declare namespace TSF.Data {
    class Filtering {
        protected static OperationsHash: any;
        protected static regexHash: any;
        static filterOnCondition(data: Array<any>, filters: Data.Condition, columnHash: Hash<UI.Column>): Array<any>;
        protected static convertDateTimesForCriteriaGroup(groups: Array<Data.CriteriaGroup>, columnHash: Hash<UI.Column>): void;
        protected static convertDateTimesForCriteria(criteria: Array<Data.Criteria>, columnHash: Hash<UI.Column>): void;
        /**
         * Filters data locally on teh provided condition
         * @param condition - condition to filter data on
         */
        protected static filterLocalData(data: Array<any>, condition: Data.Condition, columnHash: Hash<UI.Column>): any[];
        /**
         * Checks to see if an object matches the criteria in a criteria group list
         * @param groups - list of criteria groups to compare the data against
         * @param data - data to compare
         */
        protected static checkCriteriaGroup(groups: Array<Data.CriteriaGroup>, data: any, columnHash: Hash<UI.Column>): boolean;
        /**
         * Determines if an object matches the specified criteria
         * @param criteria - list of criteria to compare
         * @param data - data to compare criteria against
         */
        protected static checkCriteriaList(criteria: Array<Data.Criteria>, data: any, columnHash: Hash<UI.Column>): boolean;
    }
}
declare namespace TSF.Data {
    /** typed hashtable to be applied to a normal object */
    interface Hash<T> {
        [key: string]: T;
        [key: number]: T;
    }
}
declare namespace TSF.Events {
    /**
     * Basic event with one argument that can be dynamically typed.
     */
    class ValueEvent<T> extends EventHandler<(value: T) => void> {
        /**
         * Fires the event
         * @param value - the value to be passed into the listening methods.
         */
        fire(value: T): void;
    }
}
declare namespace TSF.Data {
    /**
     * Class that holds logic for making objects observable.
     */
    class Observer {
        /** parameters not to convert into getters and setters that fire events */
        protected static $exclusions: {
            $exclusions: boolean;
            $observe: boolean;
            $alertObservers: boolean;
            $definEvent: boolean;
            $setValueNoEvent: boolean;
            $setAttributeWithoutEvent: boolean;
            $stopObserving: boolean;
            $events: boolean;
            $objectChangeEvent: boolean;
            $regEvents: boolean;
            $dirty: boolean;
        };
        /**
         * Alerts other objects listening for changes on this object
         * @param object - the object to fire the events for
         * @param attribute - the attribute to fire the event for (optional.  Will fire on change of object if not provided)
         */
        static $alertObservers<T>(object: any, attribute?: string): void;
        /**
         * Defines the getters and setters that trigger events when their values change
         * @param object - the object to define the event for
         * @param att - the attribute to define the event for
         * @param newName - the name to use for the value of the attribute
         */
        protected static $defineEvent<T>(object: any, att: any, newName: any): void;
        /**
         * Allows setting of a value without triggering an event
         * @param obj - object to set the value for
         * @param attr - the attribute to set
         * @param val - the value to assign to the attribute
         */
        static $setValueNoEvent(obj: any, attr: string, val: any): void;
        /**
         * observes a specific attribute of an object and makes the object obserable if it isn't already
         * @param object - object to observe
         * @param callBackObject - the object listening for the event
         * @param method - the method to fire
         * @param attribute - the attribute to observe
         */
        static $observe<T>(object: any, callBackObject: Object, method: (object: T) => void, attribute?: string): void;
        /**
         * Stops observing a specific attribute
         * @param object - the object to stop observing
         * @param callBackObject - the object that was listening
         * @param method - the method to remove from the event handeler
         * @param attribute - the attribute to stop listening to.
         */
        static $stopObserving<T>(object: any, callBackObject: Object, method: (object: T) => void, attribute?: string): void;
    }
}
declare namespace TSF.Data {
    /**
     * An event fired when a data source has its page changed
     */
    class PageChangeEvent extends Events.EventHandler<(pageNum: number, maxRecords?: number) => void> {
        /**
         * Fires the page change event
         * @param pageNum - the page being changed to
         * @param maxRecords - the max number of records available to make pages from
         */
        fire(pageNum: number, maxRecords?: number): void;
    }
}
declare namespace TSF.Data {
    /**
     * Contains data related to a remote call including criteria, which columns to pull back, sort order and server side paging options.
     */
    class Query {
        /** columns to retreive */
        columns: string[];
        /** Conditions to apply to the query */
        condition: Condition;
        /** for server side paging the record to start from*/
        startRecord: number;
        /** the number of records to return*/
        returnCount: number;
        /** the columns to sort by */
        sortBy: Array<SortElement> | string;
    }
}
declare namespace TSF.Data {
    /** sort direction of a query */
    enum SortDirection {
        ASC = 0,
        DESC = 1
    }
    /**
     * The sort element of a query.
     */
    class SortElement {
        /** the column to sort by */
        column: string;
        /** the sort direction */
        sortDirection: SortDirection;
        /**
         * The sort element of a query.
         * @param column - the column to sort by
         * @param sortDirection - the direction to sort by (optional.  Sorts by Ascending by default).
         */
        constructor(column: string, sortDirection?: SortDirection);
    }
}
declare namespace TSF.Data.AbstractClasses {
    /**
     * If an object inherits from this class it becomes observable.  Meaning you can listen for attribute changes on the object
     */
    abstract class AObservable<T> {
        /** holds a hashtable of events by attribute */
        protected $events: any;
        /** the event for if any value on the object has changed (does not work if the attribute was not defined with a value before hand) */
        protected $objectChangeEvent: Events.ValueEvent<T>;
        /** used to determine if the events have been created yet for this object */
        protected $regEvents: boolean;
        /** is set to true if the any value on the object has changed */
        $dirty: boolean;
        /**
         * Sets the value of an object without triggering an event
         * @param attr - attribute to set
         * @param val - value to set the attribute to
         */
        $setAttributeWithoutEvent(attr: string, val: any): void;
        /**
         * Observes a speific attribute of an object
         * @param callBackObject - object listening
         * @param method - method to call when the attribute has changed
         * @param attribute - the attribute to listen for (optional.  If left blank triggers the method on any attribute change)
         */
        $observe(callBackObject: Object, method: (object: T) => void, attribute?: string): void;
        /**
         * Stops observing a the objects event
         * @param callBackObject - the object that was listening
         * @param method - the method that should no longer be called on value change
         * @param attribute - the attribute to stop listening to (optional.  If left blank will stop listening to object change events)
         */
        $stopObserving(callBackObject: Object, method: (object: T) => void, attribute?: string): void;
    }
}
declare namespace TSF.Data.Interfaces {
    interface IDataSource extends IFilterable, ISortable, IPageable {
        refresh(): any;
        data: any;
        onDataUpdated: Events.ValueEvent<any>;
    }
}
declare namespace TSF.Data.Interfaces {
    interface IAsyncDataSource extends IDataSource {
        onStartUpdate: Events.EmptyEvent;
        onEndUpdate: Events.ValueEvent<any>;
    }
}
declare namespace TSF.Data.Interfaces {
    interface IBindable {
        bind(data: any): any;
    }
}
declare namespace TSF.Data.Interfaces {
    interface IBindableArray extends IBindable {
        bind(data: Array<any>): any;
    }
}
declare namespace TSF.Data.Interfaces {
    interface IBindableWithKeys extends IBindable {
        ValueKey: string;
        TextKey: string;
    }
}
declare namespace TSF.Data.Interfaces {
    interface IFilterable {
        applyFilter(criteria: Condition | Array<string> | string, refresh?: boolean): any;
    }
}
declare namespace TSF.Data.Interfaces {
    interface IMultiSelectable {
        OnSelectionChanged: Events.GenericEvent<UI.TSControl, Array<UI.TSControl>>;
        SelectedValues: Array<any>;
    }
}
declare namespace TSF.Data.Interfaces {
    interface IPageable {
        changePage(pageNum: number): any;
        onPageChange: PageChangeEvent;
        pageSize: number;
    }
}
declare namespace TSF.Data.Interfaces {
    interface ISelectable {
        OnSelectionChanged: Events.GenericEvent<UI.TSControl, UI.TSControl>;
        SelectedValue: any;
    }
}
declare namespace TSF.Data.Interfaces {
    interface ISortable {
        onSortChanged: Events.ValueEvent<Array<Data.SortElement>>;
        applySorting(sortBy: Array<Data.SortElement>, refresh?: boolean): any;
    }
}
declare namespace TSF.DS {
    /**
     * Linked list structure
     */
    class LinkList<T> {
        root: Link<T>;
        last: Link<T>;
        count: number;
        /**
         * Pushes a value into the end list and returns the link references
         * @param value - value to add
         */
        push(value: T): Link<T>;
        /**
         * Adds element to the beggining of the list and returns a reference to the link
         * @param value - value to insert
         */
        insertFirst(value: T): Link<T>;
        /**
         * Inserts a value before a the specified link
         * @param value - value to insert
         * @param link - the link to insert the value before
         */
        insertBeforeLink(value: T, link: Link<T>): Link<T>;
        /**
         * Inserts a value before a the first found value in the list
         * @param value - value to insert
         * @param valueToInsertBefore - the value to insert the value before
         */
        insertBeforeValue(value: T, valueToInsertBefore: Link<T>): Link<T>;
        /**
         * Inserts a value after a the specified link
         * @param value - value to insert
         * @param link - the link to insert the value before
         */
        insertAfterLink(value: T, link: Link<T>): Link<T>;
        /**
         * Inserts a value after a the first found value in the list
         * @param value - value to insert
         * @param valueToInsertAfter - the value to insert the value after
         */
        insertAfterValue(value: T, valueToInsertAfter: Link<T>): Link<T>;
        /**
         * Filters the list  by the criteria specified by the method passed in
         * @param filterMethod - the method to use to filter
         */
        filter(filterMethod: (val: T) => boolean): void;
        /**
         * Gets the firet element in the list that matches the provided criteria
         * @param filterMethod - the method to filter on
         */
        first(filterMethod: (val: T) => boolean): Link<T>;
        /**
         * Removes the last element from the list and returns the value for it
         */
        pop(): T;
        /**
         *  Pushes a list of values into the linkList
         * @param values
         */
        pushList(values: Array<T>): void;
    }
    class Link<T> {
        val: T;
        next: Link<T>;
        previous: Link<T>;
    }
}
declare namespace TSF.DS {
    /**
     *  Used to interface with the .Net tuple
     */
    class Tuple {
        Item1: any;
        Item2: any;
        Item3: any;
        Item4: any;
        Item5: any;
        Item6: any;
        Item7: any;
        constructor(Item1: any, Item2?: any, Item3?: any, Item4?: any, Item5?: any, Item6?: any, Item7?: any);
    }
}
declare namespace TSF.Events {
    /**
     * Event handeler specifically for check changed event.  Takes a sender:UI.Checkbox,checked:boolean and args:any for input
     */
    class CheckedChangedEvent extends EventHandler<(sender: UI.Checkbox, checked: boolean, args: any) => void> {
        /**
         * event to trigger the method
         * @param sender - the object to fire the event for
         * @param args - the additional arguments to pass in
         */
        fire(sender: UI.Checkbox, args: any): void;
    }
}
declare namespace TSF.Events {
    /**
     * Standard event handeler with generic types signature (sender:any, args:any)
     */
    class Event extends EventHandler<(sender: any, args: any) => void> {
        fire(sender: any, args: any): void;
    }
}
declare namespace TSF.Events {
    /**
     * UI event handeler with generic signatures (sender:sender, args:args)
     */
    class GenericEvent<sender, args> extends EventHandler<(sender: sender, args: args) => void> {
        fire(sender: sender, args: args): void;
    }
}
declare namespace TSF.Events {
    /**
    * UI event handeler with specific signatures (sender:UI.TSControl, args:any)
    */
    class UIEvent extends EventHandler<(sender: UI.TSControl, args: any) => void> {
        fire(sender: UI.TSControl, args: any): void;
    }
}
declare namespace TSF.UI {
    class TSControl extends LogicalControl {
        context: any;
        args: any;
        protected static eventList: {};
        protected onClick: Events.UIEvent;
        /** The on click event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
        get OnClick(): Events.UIEvent;
        protected onDoubleClick: Events.UIEvent;
        /** The on double click event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
        get OnDoubleClick(): Events.UIEvent;
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
         * Appends a control to the child elements of the current control
         * @param control - the control to append
         */
        Append(control: TSControl): void;
        /**
         * Insert control before the provided control in the html
         * @param control - the control to insert this object before
         */
        InsertBefore(control: TSControl): void;
        /**
         * Insert control after the provided control in the html
         * @param control - the control to insert this object after
         */
        InsertAfter(control: TSControl): void;
        /**
         * clears all of the child html elements from the control
         */
        emptyContent(): void;
        /** returns the tag name of the element*/
        get TagName(): string;
        /** returns the class name of the element */
        get Class(): string;
        /** Sets the class name of the element */
        set Class(val: string);
        /** The attributes of the element */
        get Attributes(): NamedNodeMap;
        /** the style of the element */
        get Style(): CSSStyleDeclaration;
        /** Text of the html element */
        get Text(): string;
        /** Text of the html element */
        set Text(val: string);
        /** Value of the html element */
        get Value(): string;
        /** Value of the html element */
        set Value(val: string);
        protected disabled: boolean;
        /** Get or set the disabled status of the element */
        get Disabled(): boolean;
        /** Get or set the disabled status of the element */
        set Disabled(value: boolean);
        protected previousDisplay: string;
        /**
         * Hides the control (display:none)
         */
        hide(): void;
        /**
         * Shows the control.  Sets the previous display type if hide was used previously
         */
        show(): void;
        /**
         * load html content into the body construct any controls used specified in the markup.  This can be used to refer to
         * this object in the var attribute in this method.
         * @param data - html data to load into the control
         */
        protected loadHtml(data: string): void;
    }
}
declare namespace TSF.UI {
    enum ButtonType {
        button = 0,
        submit = 1,
        reset = 2,
        undefined = 3
    }
    /**
     * Class that represents a button.
     */
    class Button extends TSControl {
        get Type(): ButtonType;
        set Type(type: ButtonType);
        /**
         * A Button control that can be used in the html markup or just constructed plainly in javacsript
         * @param id - the id of the control to bind the elemnt to
         */
        constructor(id: string);
        /**
         * A Button control that can be used in the html markup or just constructed plainly in javacsript
         * @param ele - html element to bind the control to
         */
        constructor(ele: HTMLButtonElement);
        /**
         * A Button control that can be used in the html markup or just constructed plainly in javacsript
         */
        constructor();
    }
}
declare namespace TSF.UI {
    /**
     * Class that represents a checkbox and on as check change events etc.  Also implements the ability to do indeterminate checkboxes
     */
    class Checkbox extends TSControl {
        /** sets if the checkbox should be allowed to be in an indeterminate state*/
        protected indeterminate: boolean;
        protected indetermRegistered: boolean;
        set Indeterminate(val: boolean);
        get Indeterminate(): boolean;
        /** keeps track of if the checkbox has been checked yet */
        protected beenChecked: boolean;
        /** determines if the checkbox is checked */
        get Checked(): boolean;
        /** sets the the checked value on the checkbox */
        set Checked(val: boolean);
        protected onCheckedChanged: Events.CheckedChangedEvent;
        get OnCheckedChanged(): Events.CheckedChangedEvent;
        protected handleCheckedChanged(sender: Checkbox, checked: boolean, args: any): void;
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
    }
}
declare namespace TSF.UI {
    enum ColumnType {
        String = 0,
        Boolean = 1,
        DateTime = 2,
        Integer = 3,
        Float = 4
    }
    /**
     *  Used to specify columns for the wunder grid.
     */
    class Column {
        /** Text to display for the column */
        displayText: string;
        /** attribute of the object to bind the the cell for the given column */
        dataField: string;
        /** Data type of the column.  Only important if you are using a DateTime or you are allowing editing to your grid.
        The date format is applied if it is a date time.  During editing booleans are given checkboxes and values are validated
        Against their respective data type before being accepted */
        dataType: ColumnType;
        /**
         * Used to specify columns for the wunder grid.
         * @param dataField - attribute of the object to bind the the cell for the given column
         * @param headerText - Header text to display in the table header for the given column
         * @param dataType - Data type of the column.  Only important if you are using a DateTime or you are allowing editing to your grid.
        The date format is applied if it is a date time.  During editing booleans are given checkboxes and values are validated
        Against their respective data type before being accepted
         * @param dateFormat - reference http://blog.stevenlevithan.com/archives/date-time-format for more information
         * @param generateCell - generate custom content for a cell
         */
        constructor(dataField: string, displayField?: string, dataType?: ColumnType);
    }
}
declare namespace TSF.UI {
    /**
  * Drop down control
  */
    class DropDown extends TSControl implements Data.Interfaces.IBindableWithKeys, Data.Interfaces.ISelectable {
        set SelectedIndex(val: number);
        /** Selected index of the drop down -1 if none */
        get SelectedIndex(): number;
        /** attribute of the objects being bound to the control to use for the display text */
        TextKey: string;
        /** attribute of the objects being bound to the control to use for the value */
        ValueKey: string;
        /** Event fired when the selected item list has changed */
        protected onSelectionChanged: Events.GenericEvent<DropDown, DropDownItem>;
        /** The on OnSelection Changed event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
        get OnSelectionChanged(): Events.GenericEvent<DropDown, DropDownItem>;
        /** html element of the control */
        element: HTMLSelectElement;
        /** list of drop down items in the control */
        protected items: Array<DropDownItem>;
        /** Sets the items on the drop down */
        set Items(val: Array<DropDownItem>);
        /** gets the items in the drop down*/
        get Items(): Array<DropDownItem>;
        /** gets the selected dropdownitems of the control */
        get SelectedItem(): DropDownItem;
        /** sets the selected dropdownitems of the control.  This does change the UI Selection */
        set SelectedItem(val: DropDownItem);
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
        /** gets the selected value of the control */
        get SelectedValue(): any;
        /** sets the list of the selected value of the control.  This does change the UI Selection */
        set SelectedValue(value: any);
        /** the data source for the control */
        protected dataSource: Data.Interfaces.IDataSource;
        /** Gets the data source of the object */
        get DataSource(): Data.Interfaces.IDataSource;
        /** Sets te data source for the object */
        set DataSource(value: Data.Interfaces.IDataSource);
        /**
 * Binds the data to the control given the TextKey and ValueKey to map the data
 * @param data - data to bind to the control
 */
        bind(data: Array<any>): void;
        /**
 * Gets underlying data to the drop down items if there is any.
 */
        getData(): Array<Object>;
        /**
        * Handeles selection change.  Internal.
        */
        protected changeIndex(): void;
    }
}
declare namespace TSF.UI {
    /**
         * Drop down item used in the drop down control which contains display and selected data info.
         */
    class DropDownItem extends TSControl {
        data: any;
        index: number;
        /**the JQuery wrapped DOM row object**/
        element: HTMLOptionElement;
        constructor(text: string, value: any, element?: HTMLOptionElement);
    }
}
declare namespace TSF.UI {
    /**
     *  An image control for displaying images on a page
     */
    class Image extends TSControl {
        element: HTMLImageElement;
        /**
         * A Image control that can be used in the html markup or just constructed plainly in javacsript
         * @param id - the id of the control to bind the elemnt to
         */
        constructor(id: string);
        /**
         * A Image control that can be used in the html markup or just constructed plainly in javacsript
         * @param ele - html element to bind the control to
         */
        constructor(ele: HTMLElement);
        /**
         * A Image control that can be used in the html markup or just constructed plainly in javacsript
         */
        constructor();
        /** url source for the image */
        set Src(value: string);
        get Src(): string;
    }
}
declare namespace TSF.UI {
    /**
  * Drop down control
  */
    class MultiSelect extends TSControl implements Data.Interfaces.IBindableWithKeys, Data.Interfaces.IMultiSelectable {
        /** list of selected indicies */
        protected selectedIndicies: Array<number>;
        /** attribute of the objects being bound to the control to use for the display text */
        TextKey: string;
        /** attribute of the objects being bound to the control to use for the value */
        ValueKey: string;
        /** Event fired when the selected item list has changed */
        protected onSelectionChanged: Events.GenericEvent<MultiSelect, DropDownItem[]>;
        /** The on OnSelection Changed event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
        get OnSelectionChanged(): Events.UIEvent;
        /** html element of the control */
        element: HTMLSelectElement;
        /** internal use only for not firing extra events */
        protected updatingSelected: boolean;
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
        /** gets the list of selected values of the control */
        get SelectedValues(): Array<any>;
        /** sets the list of selected values of the control.  This does change the UI Selection */
        set SelectedValues(value: Array<any>);
        /** list of drop down items in the control */
        protected items: Array<DropDownItem>;
        /** Sets the items on the drop down */
        set Items(val: Array<DropDownItem>);
        /** gets the items in the drop down*/
        get Items(): Array<DropDownItem>;
        /** gets the selected dropdownitems of the control */
        get SelectedItems(): Array<DropDownItem>;
        /** sets the selected dropdownitems of the control.  This does change the UI Selection */
        set SelectedItems(val: Array<DropDownItem>);
        /** the data source for the control */
        protected dataSource: Data.Interfaces.IDataSource;
        /** Gets the data source of the object */
        get DataSource(): Data.Interfaces.IDataSource;
        /** Sets te data source for the object */
        set DataSource(value: Data.Interfaces.IDataSource);
        /**
         * Binds the data to the control given the TextKey and ValueKey to map the data
         * @param data - data to bind to the control
         */
        bind(data: Array<any>): void;
        /**
         * Gets underlying data to the drop down items if there is any.
         */
        getData(): Array<Object>;
        /**
         * Handeles selection change.  Internal.
         */
        protected changeSelection(): void;
        /**
         * gets the selected indexes internal
         */
        protected getSelectedIndicies(): any[];
        /**
         * handles gets indexes in a different way for ie because it doesn't support selectedOptions
         */
        protected getSelectedDropDownsIE(): any[];
    }
}
declare namespace TSF.UI {
    /**
     * Radio button control
     */
    class RadioButton extends TSControl {
        protected value: any;
        /** Value for the radio button.  If set this way it can be an object as well as a string */
        set Value(val: any);
        get Value(): any;
        /** html element of the control*/
        element: HTMLInputElement;
        /** internal selection change event*/
        protected onSelectionChanged: Events.UIEvent;
        /** The on change event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
        get OnSelectionChanged(): Events.UIEvent;
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
        /** Gets or Sets the selected value for the group of radio buttons */
        get SelectedValue(): any;
        /** Gets the selected value of the radio button group */
        set SelectedValue(val: any);
        /**selects the specific control */
        set Checked(val: boolean);
        /**returns true if the control is selected */
        get Checked(): boolean;
        /** name (group) of the radio button */
        get Name(): string;
        set Name(val: string);
        /** returns the ts control if one exists for the selected item otherwise just the html element */
        get SelectedItem(): HTMLInputElement | RadioButton;
    }
}
declare namespace TSF.UI {
    /**
     * Class that represents a Textbox.
     */
    class TextBox extends TSControl {
        /** html element of the control*/
        element: HTMLInputElement;
        protected onTextChange: Events.UIEvent;
        /** The on text change event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
        get OnTextChange(): Events.UIEvent;
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
    }
}
declare namespace TSF.UI.Grid {
    interface IGenerateCell {
        generateCell(value: any, column: WunderColumn, row: WunderRow, grid: WunderGrid): WunderCell;
    }
}
declare namespace TSF.UI.Grid {
    interface IGenerateColumn {
        generateHeader(column: WunderColumn, grid: WunderGrid): WunderColumnHeader;
    }
}
declare namespace TSF.UI.Grid {
    /**
     * Used to resize grid columns in the wunder grid
     */
    class Resizer extends TSControl {
        /** grid the resizer belongs to */
        grid: WunderGrid;
        /** cell the resizer belongs to */
        headerCell: WunderColumnHeader;
        /** width of the resizer */
        width: number;
        /** current x position of the mouse since the last mouse move event */
        currentMousePageX: number;
        currentColumnWidth: number;
        currentGridWidth: number;
        currentClientWidth: number;
        currentResizerLeft: number;
        left: boolean;
        prevResizer: Resizer;
        index: number;
        /**
         * Used to resize grid columns in the wunder grid
         * @param element - element to use as the resizer
         * @param grid - the grid being resized
         * @param cell - header cell to be resized
         * @param width
         */
        constructor(element: HTMLDivElement, grid: WunderGrid, cell: WunderColumnHeader, left: boolean, width: number, index: number);
        rePosition(): void;
        /**
         *  handles a double click on a column sizer
         * @param sender - sizer
         * @param args - none
         */
        doubleClick(sender: any, args: any): void;
        /**
         * handles mouse down on the control to start the resizing process
         * @param event
         */
        mouseDown(event: any): void;
        /**
         * Handles mouse move events while a column is being resized
         * @param event
         */
        onMouseMove(event: any): void;
    }
}
declare namespace TSF.UI.Grid {
    /**
     * Object that represents a cell in the wundergrid.  Has a reference to the underlying cell
     */
    class WunderCell extends TSControl {
        /** the column used to make the specific cell*/
        column: WunderColumn;
        /** the row the cell belongs to */
        row: WunderRow;
        textElement: TSControl;
        constructor(id: string);
        constructor(ele: HTMLTableCellElement);
        constructor();
        set Text(val: string);
        get Text(): string;
    }
}
declare namespace TSF.UI.Grid {
    /**
     *  Used to specify columns for the wunder grid.
     */
    class WunderColumn extends Column {
        /** determines if the particular column is editable.  Default = true */
        editable: boolean;
        /** Width of the column.  Autosized if not set */
        width: string;
        /** reference http://blog.stevenlevithan.com/archives/date-time-format for more information */
        dateFormat: string;
        /** generate custom content for a cell */
        customCell: IGenerateCell;
        /** method to generate your own headers */
        customHeader: IGenerateColumn;
        /** method to generate custom editable cells when the grid is in editing */
        customEditCell: IGenerateCell;
        /**
         * Used to specify columns for the wunder grid.
         * @param dataField - attribute of the object to bind the the cell for the given column
         * @param headerText - Header text to display in the table header for the given column
         * @param dataType - Data type of the column.  Only important if you are using a DateTime or you are allowing editing to your grid.
        The date format is applied if it is a date time.  During editing booleans are given checkboxes and values are validated
        Against their respective data type before being accepted
         * @param dateFormat - reference http://blog.stevenlevithan.com/archives/date-time-format for more information
         * @param generateCell - generate custom content for a cell
         */
        constructor(dataField: string, displayText?: string, dataType?: ColumnType, width?: string, dateFormat?: string, editable?: boolean, customCell?: IGenerateCell, customEditCell?: IGenerateCell, customHeader?: IGenerateColumn);
    }
}
declare namespace TSF.UI.Grid {
    /**
     * Object that represents a cell in the wundergrid.  Has a reference to the underlying cell
     */
    class WunderColumnHeader extends TSControl {
        /** the column used to make the specific cell*/
        column: WunderColumn;
        /** the row the cell belongs to */
        row: WunderRow;
        constructor(id: string);
        constructor(ele: HTMLTableColElement);
        constructor();
    }
}
declare namespace TSF.UI.Grid {
    /** Possible types of selection methods for the grid.  */
    enum SelectionType {
        NONE = 0,
        SINGLE = 1,
        MULTI = 2
    }
    /**
     * Grid view used to display data in a grid format.  Includes functionality for sorting, column resizing,
     * selection, multi selection, ability to be hooked up to a pager or filter.
     */
    class WunderGrid extends TSControl implements Data.Interfaces.IBindable, Data.Interfaces.IFilterable, Data.Interfaces.IPageable, Data.Interfaces.ISortable, Data.Interfaces.IMultiSelectable {
        /** internal hash of operations for filtering data */
        protected static OperationsHash: any;
        /** caches regex expressions so it doesn't have to compile it every time for filtering*/
        protected static regexHash: {};
        /** internal used to determine when to fire certain events */
        protected updating: boolean;
        /** determines if the columns have been changed since the last time they were drawn */
        protected columnsChanged: boolean;
        /** table header used when constructing the table */
        protected tBody: TSControl;
        /** table body used when constructing the table */
        protected tHead: TSControl;
        protected headerRow: TSControl;
        /** Enables client paging of the data on the grid */
        paging: boolean;
        /** Page size for client paging */
        pageSize: number;
        /** local page number of the data if client paging is enabled */
        protected pageNum: number;
        /** Criteria to filter the local data set by */
        protected criteria: Data.Condition;
        /** internal data reference to manipulating data set on the client side */
        protected filteredData: Array<any>;
        /** Sort by list for local sorting */
        sortBy: Array<Data.SortElement>;
        /** an observable state if intending to use with mvc style.  Contains data and selected data members */
        state: States.SelectableState;
        /** local selected rows attribute */
        protected selectedRows: Array<WunderRow>;
        /** if the grid is in editing mode */
        protected editing: boolean;
        /** type of selection NONE,SINGLE,MULTI*/
        selection: SelectionType;
        /** Fired when the selected row(s) change*/
        protected onSelectionChanged: Events.GenericEvent<WunderGrid, Array<WunderRow>>;
        /** Fired when the selected row(s) change*/
        get OnSelectionChanged(): Events.GenericEvent<WunderGrid, WunderRow[]>;
        get SelectedValues(): Array<any>;
        /** used if you want the sorting to apply to a data source or another ISortable object  instead of the local data in the grid */
        protected sortTarget: any;
        /** used if you want the sorting to apply to a data source or another ISortable object  instead of the local data in the grid */
        set SortTarget(val: Data.Interfaces.ISortable);
        get SortTarget(): Data.Interfaces.ISortable;
        /** Enables sorting ont the columns if set to true.  Not applied if providing a custom IGenerateHeader column*/
        protected enableSorting: any;
        set EnableSorting(val: boolean);
        get EnableSorting(): boolean;
        /** used to alert the pager when the page has changed */
        onPageChange: Data.PageChangeEvent;
        onSortChanged: Events.ValueEvent<Data.SortElement[]>;
        onRowCreated: Events.ValueEvent<WunderRow>;
        columnHeaders: Array<WunderColumnHeader>;
        /** Returns true if the table is in editing mode */
        get Editing(): boolean;
        /** Set the table to editing mode or remove it from editing mode */
        set Editing(ed: boolean);
        /**
         * Edits a specific row
         * @param row -row to edit
         */
        EditRow(row: WunderRow): void;
        /**
         * Stops editing a specific row
         * @param row - row to stop editing
         */
        FinishEditRow(row: WunderRow): void;
        /** The datasource for the object */
        protected dataSource: Data.Interfaces.IAsyncDataSource;
        /** The datasource for the object */
        get DataSource(): Data.Interfaces.IAsyncDataSource;
        /** The datasource for the object */
        set DataSource(dataSource: Data.Interfaces.IAsyncDataSource);
        /** used for efficiency purposes to get the configuration for a column based on the name */
        protected columnHash: any;
        /** columns to display in the grid */
        protected columns: Array<WunderColumn>;
        /** columns to display in the grid The getter is always returns a list of WunderColumn*/
        get Columns(): Array<string | WunderColumn>;
        /** columns to display in the grid */
        set Columns(columns: Array<string | WunderColumn>);
        /** columns to display in the grid */
        selectedRowClass: string;
        /** set wether or not to auto generate columns */
        get AutoGenerateColumns(): boolean;
        /** set wether or not to auto generate columns */
        set AutoGenerateColumns(autoGenerateColumns: boolean);
        /** auto generates the columns based on the objects used as input if set to true */
        protected autoGenerateColumns: boolean;
        protected rows: Array<WunderRow>;
        /** gets the data the grid is using for display purposes */
        get Data(): Array<any>;
        /** sets the data on the grid.  Causes a refresh of the data on the grid*/
        set Data(data: Array<any>);
        /** The selected rows of the grid */
        get SelectedRows(): Array<WunderRow>;
        /** The selected rows of the grid */
        set SelectedRows(rows: Array<WunderRow>);
        protected selectRows(rows: Array<WunderRow>): void;
        /** The rows of the grid */
        set Rows(val: Array<WunderRow>);
        /** The rows of the grid */
        get Rows(): Array<WunderRow>;
        /**
         * Allows you to select a row by dynamic criteria provided by a method you pass in.  If the method returns true
         * for a given data input the row is selected.
         * @param filter - The method to determine if a row is selected
         */
        selectRowByCriteria(filter: (data: any) => boolean): void;
        /**
         * Selects a row when the attribute specified for the data of that row equals the value provided
         * @param attribute - attribute to use in the comparison
         * @param value - value to use in the comparison
         */
        selectRowByAttribute(attribute: string, value: any): void;
        /**
         * Finds the row with the data object provided and selects it
         * @param data - the data you want selected
         */
        selectRowByData(data: Array<any> | any): void;
        /**
         * A grid control used for displaying table data
         * @param id - the id of the html element to bind the control to
         */
        constructor(id: string);
        /**
         * A grid control used for displaying table data
         * @param ele - the html element to bind the control to
         */
        constructor(ele: HTMLTableElement);
        /**
         * A grid control used for displaying table data
         */
        constructor();
        /**
         *  used if the data changes from the state observable
         */
        refresh(): void;
        /** Binds data to the grid.  Causes the grid to re-draw the data in the grid and if the columns have changed the columns are re-drawn */
        bind(data: Array<any>): void;
        /**
         *  creates the body of the table
         * @param data - data to make the body with
         */
        protected createBody(data: Array<any>): void;
        /**
         * The row to handle selection for (handler for on click)
         * @param row
         */
        protected handleSelection(row: WunderRow): void;
        /**
         * Creates the header rows in the grid
         */
        protected createHeaderRow(): void;
        /**
         * displays the loading message when connected to an async data source
         */
        protected onStartUpdate(): void;
        /**
         * Listener for an async data source that updates the data on the grid
         * @param data
         */
        protected onEndUpdate(data: any): void;
        /*********************************************************************************************************************************************************************/
        /*********************************************************************************************************************************************************************/
        protected eventsRegistered: boolean;
        /** internal boolean keeping track of if the columns are resizable */
        protected columnsResizable: boolean;
        /** True means columns can be resized False means they can't */
        get ColumnsResizable(): boolean;
        /** True means columns can be resized False means they can't */
        set ColumnsResizable(val: boolean);
        addResizers(): void;
        /**
         * Handles setting initial width for header rows
         */
        protected handleInitialWidthsForResizer(): void;
        protected mouseMove(event: any): void;
        /*********************************************************************************************************************************************************************/
        /*********************************************************************************************************************************************************************/
        /**
       * Changes the page number of the grids local data
       * @param pageNum - the page to change to.
       */
        changePage(pageNum: number, refresh?: boolean): void;
        /**
        * Changes the sort column being used for the local sorting
        * @param sortBy - Sort by fields to sort on
        * @param refresh - determines if a data refresh should occur when the method is called.
        */
        applySorting(sortBy: Array<Data.SortElement>, refresh?: boolean): void;
        /**
         *  Gets the current sorted column.
         */
        getSort(): Array<Data.SortElement>;
        /**
        * Apply filter to local client side data. Type sensitive.
        * Cannot compare string to numbers and like statements can only be used on string columns.
        * @param filters - Filters to apply to the data
        * @param refresh - determines if a data refresh should occur when the method is called.
        */
        applyFilter(filters: Data.Condition, refresh?: boolean): void;
        protected localRefresh(data: any): void;
    }
}
declare namespace TSF.UI.Grid.Extensions {
    class BaseEditableCell {
        changeValue(sender: UI.TSControl, value: Object): void;
    }
}
declare namespace TSF.UI.Grid.Extensions {
    class WunderTextCell extends BaseEditableCell implements IGenerateCell {
        generateCell(value: any, column: WunderColumn, row: WunderRow, grid: WunderGrid): WunderCell;
    }
}
declare namespace TSF.UI.Grid.Extensions {
    /**
     *  Used by the wundergrid when no editable cell method is provided by the column to generate an editable checkbox cell
     */
    class WunderCheckboxCell extends BaseEditableCell implements IGenerateCell {
        /** generates the cell */
        generateCell(value: any, column: WunderColumn, row: WunderRow, grid: WunderGrid): WunderCell;
    }
}
declare namespace TSF.UI.Grid {
    class WunderRow extends TSControl {
        protected static editableTextCellGenerator: Extensions.WunderTextCell;
        protected static editableCheckCellGenerator: Extensions.WunderCheckboxCell;
        /** grid that the row is attached too */
        grid: WunderGrid;
        /** cells of the row */
        cells: Array<WunderCell>;
        /** columns on the grid to create the row.  Must be set before the data */
        columns: Array<WunderColumn>;
        /** if the row is in editing mode */
        protected editing: boolean;
        get Editing(): boolean;
        set Editing(editing: boolean);
        protected data: any;
        get Data(): any;
        set Data(data: any);
        /**
         * Creates the cells in the row based off of the columns.  the columns have to be set first before the data is set for this method to work.
         */
        protected createCells(): void;
        /**
         * Table row used in the wunder grid.
         * @param id - id of the element to be used
         * @param logicalParent - internal use only
         */
        constructor(id: string, logicalParent?: UI.LogicalControl);
        /**
         * Table row used in the wunder grid.
         * @param ele - element to be used
         * @param logicalParent - internal use only
         */
        constructor(ele: HTMLElement, logicalParent?: UI.LogicalControl);
        constructor();
    }
}
declare namespace TSF.UI.Grid.Extensions {
    /**
     *  Used by the wundergrid when no custom header method is provided by the column to generate anthe header
     */
    class SortableColumnHeader extends TSControl implements IGenerateColumn {
        column: Column;
        target: Data.Interfaces.ISortable;
        order: Data.SortDirection;
        constructor();
        /** generates the cell */
        generateHeader(column: Column, target: Data.Interfaces.ISortable): WunderColumnHeader;
        click(sender: any, args: any): void;
        changeSortingOrder(order?: Data.SortDirection): void;
        sortChanged(sorts: Array<Data.SortElement>): void;
    }
}
declare namespace TSF.UI.States {
    /**
     * Observable state of the grid if needed for architecture
     */
    class SelectableState extends Data.AbstractClasses.AObservable<SelectableState> {
        /** selected data in the grid */
        selectedData: Array<any>;
        /** the data being displayed in the grid*/
        data: Array<any>;
    }
}
declare namespace TSF.Utilities {
    class DateFormatter {
        static token: RegExp;
        static timezone: RegExp;
        static timezoneClip: RegExp;
        static pad(val: any, len?: any): any;
        protected static masks: {
            default: string;
            shortDate: string;
            mediumDate: string;
            longDate: string;
            fullDate: string;
            shortTime: string;
            mediumTime: string;
            longTime: string;
            isoDate: string;
            isoTime: string;
            isoDateTime: string;
            isoUtcDateTime: string;
        };
        protected static i18n: {
            dayNames: string[];
            monthNames: string[];
        };
        constructor();
        static formatDate(date: Date, format: string, utc?: boolean): string;
    }
}
