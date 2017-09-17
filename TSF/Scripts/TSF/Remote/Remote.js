var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/// <reference path="..\..\typings\jquery\jquery.d.ts" />
/// <reference path="..\Events\EmptyEvent.ts" />
/// <reference path="..\Base\Exception.ts" />
/// <reference path=".\RemoteException.ts" />
var TSF;
(function (TSF) {
    var Remote;
    (function (Remote) {
        /** request type for remote calls */
        var RequestType;
        (function (RequestType) {
            RequestType[RequestType["POST"] = 0] = "POST";
            RequestType[RequestType["GET"] = 1] = "GET";
            RequestType[RequestType["PUT"] = 2] = "PUT";
            RequestType[RequestType["DELETE"] = 3] = "DELETE";
            RequestType[RequestType["TRACE"] = 4] = "TRACE";
            RequestType[RequestType["CONNECT"] = 5] = "CONNECT";
        })(RequestType = Remote.RequestType || (Remote.RequestType = {}));
        /**
         * Used to make remote calls a little bit easier by providing a fluent style remote call as well as an inline method.
         * This provides a prototype so you know which parameters are expected.  It also parses out the exception from the remote server if one is sent.
         */
        var RemoteCall = (function () {
            /**
             * Creates a command to send to the server using fluent style.
             * @param url The url to request
             * @param data The data to send to the server
             */
            function RemoteCall(url, data) {
                /** The type of request to make (POST, GET, PUT, DELETE, TRACE, CONNECT) */
                this.requestType = RequestType.POST;
                /** Content type of the request (example: application/json)*/
                this.contentType = "application/json";
                /** Datatype of the call.  */
                this.dataType = undefined;
                /** Header information to send to the server.  Each member and value of the object becomes a header element and its value*/
                this.reqHeaders = {};
                /** Denotes that start and end events should consider this remote call when determining when to fire */
                this.fireEvents = false;
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
            RemoteCall.prototype.advancedOptions = function (requestType, fireEvents, contentType, dataType) {
                if (requestType !== undefined)
                    this.requestType = requestType;
                if (contentType !== undefined)
                    this.contentType = contentType;
                if (fireEvents !== undefined)
                    this.fireEvents = fireEvents;
                this.dataType = dataType;
                return this;
            };
            /**
             * Adds header information to the remote call
             * @param headers - an object whose attributes will be used as headers
             */
            RemoteCall.prototype.headers = function (headers) {
                this.reqHeaders = headers;
                return this;
            };
            /**
             * Calls a remote method and returns a promise that can be used with async await.
             */
            RemoteCall.prototype.call = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                $.ajax({
                                    data: JSON.stringify(_this.data),
                                    url: _this.url,
                                    type: RequestType[_this.requestType],
                                    contentType: _this.contentType,
                                    dataType: _this.dataType,
                                    async: true,
                                    beforeSend: function (request) {
                                        if (_this.reqHeaders !== undefined && _this.reqHeaders !== null) {
                                            for (var key in _this.reqHeaders) {
                                                request.setRequestHeader(key, _this.reqHeaders[key]);
                                            }
                                        }
                                    },
                                }).done(function (data) {
                                    if (_this.fireEvents) {
                                        Remote.RemoteCall.currentCallCount--;
                                        if (Remote.RemoteCall.currentCallCount === 0)
                                            Remote.RemoteCall.OnStop.fire();
                                    }
                                    resolve(data);
                                }).fail(function (jqXHR, textStatus, errorThrown) {
                                    if (_this.fireEvents) {
                                        Remote.RemoteCall.currentCallCount--;
                                        if (Remote.RemoteCall.currentCallCount === 0)
                                            Remote.RemoteCall.OnStop.fire();
                                    }
                                    reject(Remote.RemoteCall.constructException(jqXHR, textStatus, errorThrown));
                                });
                                if (_this.fireEvents) {
                                    if (Remote.RemoteCall.currentCallCount === 0)
                                        Remote.RemoteCall.OnStart.fire();
                                    Remote.RemoteCall.currentCallCount++;
                                }
                            })];
                    });
                });
            };
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
            RemoteCall.callInline = function (url, data, requestType, fireEvents, reqHeaders, contentType, dataType) {
                var _this = this;
                if (requestType === void 0) { requestType = RequestType.POST; }
                if (fireEvents === void 0) { fireEvents = false; }
                if (contentType === void 0) { contentType = "application/json"; }
                return new Promise(function (resolve, reject) {
                    $.ajax({
                        data: JSON.stringify(data),
                        url: url,
                        type: RequestType[requestType],
                        contentType: contentType,
                        dataType: dataType,
                        async: true,
                        beforeSend: function (request) {
                            if (reqHeaders !== undefined && reqHeaders !== null) {
                                for (var key in reqHeaders) {
                                    request.setRequestHeader(key, reqHeaders[key]);
                                }
                            }
                        },
                    }).done(function (data) {
                        if (fireEvents) {
                            Remote.RemoteCall.currentCallCount--;
                            if (Remote.RemoteCall.currentCallCount === 0)
                                Remote.RemoteCall.OnStop.fire();
                        }
                        resolve(data);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        if (fireEvents) {
                            Remote.RemoteCall.currentCallCount--;
                            if (Remote.RemoteCall.currentCallCount === 0)
                                Remote.RemoteCall.OnStop.fire();
                        }
                        reject(_this.constructException(jqXHR, textStatus, errorThrown));
                    });
                    if (fireEvents) {
                        if (Remote.RemoteCall.currentCallCount === 0)
                            Remote.RemoteCall.OnStart.fire();
                        Remote.RemoteCall.currentCallCount++;
                    }
                });
            };
            /**
             * Creates an exception based on the response of a call
             * @param XMLHttpRequest - the response from the remote call
             * @param textStatus - the status of the call
             * @param errorThrown - the errorthrown of the call
             * @param url - the url requested from the call
             */
            RemoteCall.constructException = function (XMLHttpRequest, textStatus, errorThrown, url) {
                var exception = null;
                try {
                    exception = XMLHttpRequest.responseText ? $.parseJSON(XMLHttpRequest.responseText) : new Remote.RemoteException("no response");
                }
                catch (error2) {
                    exception = new Remote.RemoteException();
                }
                exception.TextStatus = textStatus;
                exception.jQueryXHR = XMLHttpRequest;
                exception.url = url;
                exception.ErrorThrown = errorThrown;
                console.error(exception);
                return exception;
            };
            return RemoteCall;
        }());
        /** Fires when a remote call has been fired and there currently isn't another remote call in progress that has fire events set to true */
        RemoteCall.OnStart = new TSF.Events.EmptyEvent();
        /** Fired when all remote calls are finished.  This means that if more then one call is made before the previous one has finished
        then all remote calls have to finish before the OnStop event is fired if all methods are marked with fire events.  */
        RemoteCall.OnStop = new TSF.Events.EmptyEvent();
        /** keeps track of the current number of remote calls being done through this class */
        RemoteCall.currentCallCount = 0;
        Remote.RemoteCall = RemoteCall;
    })(Remote = TSF.Remote || (TSF.Remote = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=Remote.js.map