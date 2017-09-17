/// <reference path="..\..\typings\jquery\jquery.d.ts" />
/// <reference path="..\Events\EmptyEvent.ts" />
/// <reference path="..\Base\Exception.ts" />
/// <reference path=".\RemoteException.ts" />
namespace TSF.Remote {

    /** request type for remote calls */
    export enum RequestType {
        POST,
        GET,
        PUT,
        DELETE,
        TRACE,
        CONNECT
    }
    
    /**
     * Used to make remote calls a little bit easier by providing a fluent style remote call as well as an inline method.
     * This provides a prototype so you know which parameters are expected.  It also parses out the exception from the remote server if one is sent.
     */
    export class RemoteCall<T>
    {
        /** Fires when a remote call has been fired and there currently isn't another remote call in progress that has fire events set to true */
        public static OnStart = new Events.EmptyEvent();
        /** Fired when all remote calls are finished.  This means that if more then one call is made before the previous one has finished
        then all remote calls have to finish before the OnStop event is fired if all methods are marked with fire events.  */
        public static OnStop = new Events.EmptyEvent();
        /** keeps track of the current number of remote calls being done through this class */
        public static currentCallCount = 0;
        /** url to make the remote call too */
        url: string;
        /** The type of request to make (POST, GET, PUT, DELETE, TRACE, CONNECT) */
        requestType: RequestType = RequestType.POST;
        /** Any data you wish to send to the server */
        data: any;
        /** Content type of the request (example: application/json)*/
        contentType: string = "application/json";
        /** Datatype of the call.  */
        dataType: string = undefined;
        /** Header information to send to the server.  Each member and value of the object becomes a header element and its value*/
        reqHeaders = {};
        /** Denotes that start and end events should consider this remote call when determining when to fire */
        fireEvents: boolean = false;

        /**
         * Creates a command to send to the server using fluent style.
         * @param url The url to request
         * @param data The data to send to the server
         */
        constructor(url: string, data?: any) {
            this.url = url;
            this.data = data;
        }
        /**
         * Sets advanced options for the remote command
         * @param requestType The type of request to make (POST, GET, PUT, DELETE, TRACE, CONNECT)
         * @param fireEvents Denotes that start and end events should consider this remote call when determining when to fire
         * @param contentType Content type of the request (example: application/json)
         * @param dataType Datatype of the call.
         */
        public advancedOptions(requestType?: RequestType, fireEvents?:boolean,contentType?: string, dataType?: string):this
        {
            if (requestType !== undefined)
                this.requestType = requestType;
            if (contentType !== undefined)
                this.contentType = contentType;
            if (fireEvents !== undefined)
                this.fireEvents = fireEvents;
            this.dataType = dataType;
            return this;
        }
        /**
         * Adds header information to the remote call
         * @param headers - an object whose attributes will be used as headers
         */
        public headers(headers: Object): this {
            this.reqHeaders = headers;
            return this;
        }

        
        /**
         * Calls a remote method and returns a promise that can be used with async await.
         */
        public async call() {
            return new Promise<T>((resolve, reject) => {

                $.ajax({
                    data: JSON.stringify(this.data),
                    url: this.url,
                    type: RequestType[this.requestType],
                    contentType: this.contentType,
                    dataType: this.dataType,
                    async: true,
                    beforeSend :(request) =>{
                        if (this.reqHeaders !== undefined && this.reqHeaders !== null) {
                            for (var key in this.reqHeaders) {
                                request.setRequestHeader(key, this.reqHeaders[key]);
                            }
                        }
                    },
                }).done((data) => {
                    if (this.fireEvents) {
                        Remote.RemoteCall.currentCallCount--;
                        if (Remote.RemoteCall.currentCallCount === 0)
                            Remote.RemoteCall.OnStop.fire();
                    }
                    resolve(data);
                    }).fail((jqXHR, textStatus, errorThrown) => {
                    if (this.fireEvents) {
                        Remote.RemoteCall.currentCallCount--;
                        if (Remote.RemoteCall.currentCallCount === 0)
                            Remote.RemoteCall.OnStop.fire();
                        }
                        reject(Remote.RemoteCall.constructException(jqXHR, textStatus, errorThrown));
                });
                if (this.fireEvents) {
                    if (Remote.RemoteCall.currentCallCount === 0)
                        Remote.RemoteCall.OnStart.fire();
                    Remote.RemoteCall.currentCallCount++;
                }
            });

        }
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
        public static callInline<T>(url: string, data?: any, requestType: RequestType = RequestType.POST, fireEvents: boolean = false, reqHeaders?: Object, contentType: string = "application/json", dataType?: string)
        {
            return new Promise<T>((resolve, reject) => {

                $.ajax({
                    data: JSON.stringify(data),
                    url: url,
                    type: RequestType[requestType],
                    contentType: contentType,
                    dataType: dataType,
                    async: true,
                    beforeSend: (request) =>{
                        if (reqHeaders !== undefined && reqHeaders !== null) {
                            for (var key in reqHeaders) {
                                request.setRequestHeader(key, reqHeaders[key]);
                            }
                        }
                    },
                }).done((data) => {
                    if (fireEvents) {
                        Remote.RemoteCall.currentCallCount--;
                        if (Remote.RemoteCall.currentCallCount === 0)
                            Remote.RemoteCall.OnStop.fire();
                    }
                    resolve(data);
                    }).fail((jqXHR, textStatus, errorThrown) => {
                    if (fireEvents) {
                        Remote.RemoteCall.currentCallCount--;
                        if (Remote.RemoteCall.currentCallCount === 0)
                            Remote.RemoteCall.OnStop.fire();
                    }
                    reject(this.constructException(jqXHR, textStatus, errorThrown));
                });
                if (fireEvents) {
                    if (Remote.RemoteCall.currentCallCount === 0)
                        Remote.RemoteCall.OnStart.fire();
                    Remote.RemoteCall.currentCallCount++;
                }
            });
        }
        /**
         * Creates an exception based on the response of a call
         * @param XMLHttpRequest - the response from the remote call
         * @param textStatus - the status of the call
         * @param errorThrown - the errorthrown of the call
         * @param url - the url requested from the call
         */
        static constructException(XMLHttpRequest, textStatus, errorThrown, url?: string) {
            var exception: RemoteException = null;
            try {
                exception = XMLHttpRequest.responseText ? $.parseJSON(XMLHttpRequest.responseText) : new RemoteException("no response");
            }
            catch (error2) {
                exception = new RemoteException();
            }
            exception.TextStatus = textStatus;
            exception.jQueryXHR = XMLHttpRequest;
            exception.url = url;
            exception.ErrorThrown = errorThrown;

            console.error(exception);
            return exception;
        }
    }
}