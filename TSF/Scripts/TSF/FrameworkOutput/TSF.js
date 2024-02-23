var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var TSF;
(function (TSF) {
    var Base;
    (function (Base) {
        /**
         * Standard exception for error handeling
         */
        var Exception = /** @class */ (function () {
            /**
             * Exception used for throwing
             * @param message The message for the exception
             */
            function Exception(ExceptionMessage) {
                this.ExceptionMessage = ExceptionMessage;
            }
            return Exception;
        }());
        Base.Exception = Exception;
    })(Base = TSF.Base || (TSF.Base = {}));
})(TSF || (TSF = {}));
/// <reference path="..\Base\Exception.ts" />
var TSF;
/// <reference path="..\Base\Exception.ts" />
(function (TSF) {
    var Events;
    (function (Events) {
        /**
         * Generic event handeler
         */
        var EventHandler = /** @class */ (function () {
            function EventHandler() {
                /** array of subscribers */
                this.events = [];
            }
            /**
             * Adds a listener to the event object
             * @param method - method to call when the event is triggered
             * @param callBackObject - object to be used as the this when firing the event
             */
            EventHandler.prototype.add = function (method, callBackObject) {
                this.events.push(new TSF.DS.Tuple(method, callBackObject));
            };
            /**
             * Removes a subscription from the event object
             * @param method - method to unsubscribe
             * @param callBackObject - object that was listening that wants to unsubscribe
             */
            EventHandler.prototype.remove = function (method, callBackObject) {
                var count = this.events.length;
                this.events = this.events.filter(function (x) { return x.Item2 !== callBackObject && x.Item1 !== method; });
                if (count === this.events.length)
                    throw new TSF.Base.Exception("Event not found to remove");
            };
            /**
             * Clears all events from the event handeler
             */
            EventHandler.prototype.clearEvents = function () {
                this.events = [];
            };
            /**
             * Fires the event
             * @param args - the arguments to pass to the listening method.
             */
            EventHandler.prototype.fire = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                for (var i = 0; i < this.events.length; i++) {
                    this.events[i].Item1.apply(this.events[i].Item2, args);
                }
            };
            return EventHandler;
        }());
        Events.EventHandler = EventHandler;
    })(Events = TSF.Events || (TSF.Events = {}));
})(TSF || (TSF = {}));
/// <reference path=".\EventHandler.ts" />
var TSF;
/// <reference path=".\EventHandler.ts" />
(function (TSF) {
    var Events;
    (function (Events) {
        /**
         * Event handeler with no input arguments
         */
        var EmptyEvent = /** @class */ (function (_super) {
            __extends(EmptyEvent, _super);
            function EmptyEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            EmptyEvent.prototype.fire = function () {
                _super.prototype.fire.call(this);
            };
            return EmptyEvent;
        }(Events.EventHandler));
        Events.EmptyEvent = EmptyEvent;
    })(Events = TSF.Events || (TSF.Events = {}));
})(TSF || (TSF = {}));
/// <reference path="..\Base\Exception.ts" />
var TSF;
/// <reference path="..\Base\Exception.ts" />
(function (TSF) {
    var Remote;
    (function (Remote) {
        /**
         *  Standard exception with additional detail from a remote call
         */
        var RemoteException = /** @class */ (function (_super) {
            __extends(RemoteException, _super);
            function RemoteException(message) {
                return _super.call(this, message) || this;
            }
            return RemoteException;
        }(TSF.Base.Exception));
        Remote.RemoteException = RemoteException;
    })(Remote = TSF.Remote || (TSF.Remote = {}));
})(TSF || (TSF = {}));
/// <reference path="..\..\typings\jquery\jquery.d.ts" />
/// <reference path="..\Events\EmptyEvent.ts" />
/// <reference path="..\Base\Exception.ts" />
/// <reference path=".\RemoteException.ts" />
var TSF;
/// <reference path="..\..\typings\jquery\jquery.d.ts" />
/// <reference path="..\Events\EmptyEvent.ts" />
/// <reference path="..\Base\Exception.ts" />
/// <reference path=".\RemoteException.ts" />
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
        var RemoteCall = /** @class */ (function () {
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
            /** Fires when a remote call has been fired and there currently isn't another remote call in progress that has fire events set to true */
            RemoteCall.OnStart = new TSF.Events.EmptyEvent();
            /** Fired when all remote calls are finished.  This means that if more then one call is made before the previous one has finished
            then all remote calls have to finish before the OnStop event is fired if all methods are marked with fire events.  */
            RemoteCall.OnStop = new TSF.Events.EmptyEvent();
            /** keeps track of the current number of remote calls being done through this class */
            RemoteCall.currentCallCount = 0;
            return RemoteCall;
        }());
        Remote.RemoteCall = RemoteCall;
    })(Remote = TSF.Remote || (TSF.Remote = {}));
})(TSF || (TSF = {}));
/// <reference path="..\Events\EmptyEvent.ts" />
/// <reference path="..\Remote\Remote.ts" />
var TSF;
/// <reference path="..\Events\EmptyEvent.ts" />
/// <reference path="..\Remote\Remote.ts" />
(function (TSF) {
    var Base;
    (function (Base) {
        /**
         * Base functionality for TSF that constructs the elements based on the html attributes.
         */
        var TSBase = /** @class */ (function () {
            function TSBase() {
            }
            /**
             * Goes through the HTML and constructs the controls marked in the html
             * @param element
             */
            TSBase.constructControls = function (element) {
                if (TSBase.defaultTypes === undefined)
                    TSBase.defaultTypes = {
                        BUTTON: TSF.UI.Button, INPUT: { CHECKBOX: TSF.UI.Checkbox, TEXT: TSF.UI.TextBox, SUBMIT: TSF.UI.Button, BUTTON: TSF.UI.Button, RADIO: TSF.UI.RadioButton }, IMG: TSF.UI.Image, TABLE: TSF.UI.Grid.WunderGrid, SELECT: { '': TSF.UI.DropDown, MULTIPLE: TSF.UI.MultiSelect }
                    };
                var elements = new Array();
                elements.push({ ele: element, name: "" });
                var curName = "";
                while (elements.length > 0) {
                    var link = elements.pop();
                    var node = link.ele;
                    curName = link.name;
                    var tsClass = node.getAttribute('TSClass');
                    var name = node.getAttribute('var');
                    var parent_1 = link.logicalParent;
                    if (tsClass !== null && tsClass !== undefined) {
                        if (name !== undefined && name.length > 0) {
                            var res = TSBase.getRelativeObjects.apply(this, [name, parent_1]);
                            var clss = eval(tsClass);
                            var ctrl = new clss(node, res.parent);
                            if (!res.parent)
                                window[res.att] = ctrl;
                            else
                                res.parent[res.att] = ctrl;
                            parent_1 = ctrl;
                        }
                        else {
                            var ctrl = eval('new ' + tsClass + '(node)');
                            parent_1 = ctrl;
                        }
                    }
                    else if (name !== null && name !== undefined) {
                        var res = TSBase.getRelativeObjects.apply(this, [name, parent_1]);
                        var type = node.nodeName.toUpperCase();
                        var def = TSBase.defaultTypes[type];
                        if (type == "INPUT") {
                            type = node.getAttribute('type');
                            if (type !== undefined && type !== null)
                                type = type.toUpperCase();
                            def = def[type];
                        }
                        else if (type == "SELECT") {
                            if (node.hasAttribute('MULTIPLE'))
                                def = def['MULTIPLE'];
                            else
                                def = def[''];
                        }
                        var ctrl = void 0;
                        if (def !== undefined && def !== null)
                            ctrl = new def(node, res.parent);
                        else
                            ctrl = new TSF.UI.TSControl(node, res.parent);
                        if (!res.parent)
                            window[res.att] = ctrl;
                        else
                            res.parent[res.att] = ctrl;
                        parent_1 = ctrl;
                    }
                    var len = node.children.length;
                    for (var i = 0; i < len; i++) {
                        elements.push({ ele: node.children[len - i - 1], logicalParent: parent_1 });
                    }
                }
            };
            /**
            * Not intended for use outside of framework.  Used to handle relative paths in the var element of
            * html elements.
            * @param path - path to assign this control to.
            */
            TSBase.getRelativeObjects = function (path, parentNode) {
                var pth = path.trim();
                var splitPath = pth.split(/[\.]/g);
                var len = splitPath.length;
                len = len - 1;
                if (pth[0] !== '.') {
                    var att = splitPath.pop();
                    var par = eval(splitPath.join('.'));
                    return { parent: par, att: att };
                }
                var currentNode;
                if (splitPath[0] == '')
                    currentNode = parentNode;
                for (var i = 1; i < len; i++) {
                    if (!currentNode || splitPath[i] !== '')
                        break;
                    currentNode = currentNode.logicalParent;
                }
                if (currentNode) {
                    var temp = splitPath.slice(i, splitPath.length);
                    var att = temp.pop();
                    var par_1;
                    if (temp.length == 0)
                        par_1 = currentNode;
                    else
                        par_1 = currentNode[temp.join('.')];
                    return { parent: par_1, att: att };
                }
            };
            TSBase.onInit = new TSF.Events.EmptyEvent();
            TSBase.defaultTypes = undefined;
            return TSBase;
        }());
        Base.TSBase = TSBase;
        $(function () {
            TSBase.constructControls.apply(window, [document.documentElement]);
            TSBase.onInit.fire();
        });
    })(Base = TSF.Base || (TSF.Base = {}));
})(TSF || (TSF = {}));
var _this = this;
(function () {
    var method = function (root) {
        // Store setTimeout reference so promise-polyfill will be unaffected by
        // other code modifying setTimeout (like sinon.useFakeTimers())
        var setTimeoutFunc = setTimeout;
        function noop() { }
        // Polyfill for Function.prototype.bind
        function bind(fn, thisArg) {
            return function () {
                fn.apply(thisArg, arguments);
            };
        }
        function Promise(fn) {
            if (typeof this !== 'object')
                throw new TypeError('Promises must be constructed via new');
            if (typeof fn !== 'function')
                throw new TypeError('not a function');
            this._state = 0;
            this._handled = false;
            this._value = undefined;
            this._deferreds = [];
            doResolve(fn, this);
        }
        function handle(self, deferred) {
            while (self._state === 3) {
                self = self._value;
            }
            if (self._state === 0) {
                self._deferreds.push(deferred);
                return;
            }
            self._handled = true;
            Promise._immediateFn(function () {
                var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
                if (cb === null) {
                    (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
                    return;
                }
                var ret;
                try {
                    ret = cb(self._value);
                }
                catch (e) {
                    reject(deferred.promise, e);
                    return;
                }
                resolve(deferred.promise, ret);
            });
        }
        function resolve(self, newValue) {
            try {
                // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
                if (newValue === self)
                    throw new TypeError('A promise cannot be resolved with itself.');
                if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                    var then = newValue.then;
                    if (newValue instanceof Promise) {
                        self._state = 3;
                        self._value = newValue;
                        finale(self);
                        return;
                    }
                    else if (typeof then === 'function') {
                        doResolve(bind(then, newValue), self);
                        return;
                    }
                }
                self._state = 1;
                self._value = newValue;
                finale(self);
            }
            catch (e) {
                reject(self, e);
            }
        }
        function reject(self, newValue) {
            self._state = 2;
            self._value = newValue;
            finale(self);
        }
        function finale(self) {
            if (self._state === 2 && self._deferreds.length === 0) {
                Promise._immediateFn(function () {
                    if (!self._handled) {
                        Promise._unhandledRejectionFn(self._value);
                    }
                });
            }
            for (var i = 0, len = self._deferreds.length; i < len; i++) {
                handle(self, self._deferreds[i]);
            }
            self._deferreds = null;
        }
        function Handler(onFulfilled, onRejected, promise) {
            this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
            this.onRejected = typeof onRejected === 'function' ? onRejected : null;
            this.promise = promise;
        }
        /**
         * Take a potentially misbehaving resolver function and make sure
         * onFulfilled and onRejected are only called once.
         *
         * Makes no guarantees about asynchrony.
         */
        function doResolve(fn, self) {
            var done = false;
            try {
                fn(function (value) {
                    if (done)
                        return;
                    done = true;
                    resolve(self, value);
                }, function (reason) {
                    if (done)
                        return;
                    done = true;
                    reject(self, reason);
                });
            }
            catch (ex) {
                if (done)
                    return;
                done = true;
                reject(self, ex);
            }
        }
        Promise.prototype['catch'] = function (onRejected) {
            return this.then(null, onRejected);
        };
        Promise.prototype.then = function (onFulfilled, onRejected) {
            var prom = new (this.constructor)(noop);
            handle(this, new Handler(onFulfilled, onRejected, prom));
            return prom;
        };
        Promise.all = function (arr) {
            var args = Array.prototype.slice.call(arr);
            return new Promise(function (resolve, reject) {
                if (args.length === 0)
                    return resolve([]);
                var remaining = args.length;
                function res(i, val) {
                    try {
                        if (val && (typeof val === 'object' || typeof val === 'function')) {
                            var then = val.then;
                            if (typeof then === 'function') {
                                then.call(val, function (val) {
                                    res(i, val);
                                }, reject);
                                return;
                            }
                        }
                        args[i] = val;
                        if (--remaining === 0) {
                            resolve(args);
                        }
                    }
                    catch (ex) {
                        reject(ex);
                    }
                }
                for (var i = 0; i < args.length; i++) {
                    res(i, args[i]);
                }
            });
        };
        Promise.resolve = function (value) {
            if (value && typeof value === 'object' && value.constructor === Promise) {
                return value;
            }
            return new Promise(function (resolve) {
                resolve(value);
            });
        };
        Promise.reject = function (value) {
            return new Promise(function (resolve, reject) {
                reject(value);
            });
        };
        Promise.race = function (values) {
            return new Promise(function (resolve, reject) {
                for (var i = 0, len = values.length; i < len; i++) {
                    values[i].then(resolve, reject);
                }
            });
        };
        // Use polyfill for setImmediate for performance gains
        Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) { setImmediate(fn); }) ||
            function (fn) {
                setTimeoutFunc(fn, 0);
            };
        Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
            if (typeof console !== 'undefined' && console) {
                console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
            }
        };
        /**
         * Set the immediate function to execute callbacks
         * @param fn {function} Function to execute
         * @deprecated
         */
        Promise._setImmediateFn = function _setImmediateFn(fn) {
            Promise._immediateFn = fn;
        };
        /**
         * Change the function to execute on unhandled rejection
         * @param {function} fn Function to execute on unhandled rejection
         * @deprecated
         */
        Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
            Promise._unhandledRejectionFn = fn;
        };
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = Promise;
        }
        else if (!root.Promise) {
            root.Promise = Promise;
        }
    };
    if (typeof Promise === 'undefined')
        method(_this);
})();
var TSF;
(function (TSF) {
    var UI;
    (function (UI) {
        var LogicalControl = /** @class */ (function () {
            /**
             * A logical control that can be used in the html markup or just constructed plainly in javacsript
             * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
             * @param logicalParent - the logical parent entity such as a controller.  Used internally.
             */
            function LogicalControl(ele, logicalParent) {
                this.logicalParent = logicalParent;
                TSF.Base.TSBase.onInit.add(this.TSInit, this);
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
            LogicalControl.prototype.TSInit = function () {
            };
            /**
             * Loads html attributes into attributes of the class.  Case sensitive.  For example if you
             * have an attribute such as selectionEnabled.  You would need a string attribute in your class named that exact name
             * The attribute on the html is not case sensitive and the value of that attribute would be loaded into the object attribute.
             * Takes an arbitrary number of attributes to load.
             * @param attributes - the list of attributes to load
             */
            LogicalControl.prototype.loadConfiguration = function () {
                var attributes = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributes[_i] = arguments[_i];
                }
                var len = attributes.length;
                for (var i = 0; i < len; i++) {
                    var att = attributes[i];
                    this[att] = this.element.getAttribute(att);
                    if (this[att] === null)
                        this[att] = undefined;
                }
            };
            /**
             * checks to see if the element passed in is undefined and if it is create a new element to use
             * for the object of the specified type i.e. button
             * @param type - the type of html control to create if one was not passed in
             */
            LogicalControl.prototype.checkEmptyEle = function (type) {
                if (this.element === undefined) {
                    this.element = document.createElement(type);
                    this.jElement = $(this.element);
                }
            };
            /**
             *  converts a specific object member to a boolean.  Used for converting configurations that
             * that come in as strings.
             * @param attribute - attribute to convert to boolean
             * @param defaultVal - the default value to use if its not defined.
             */
            LogicalControl.prototype.convertToBoolean = function (attribute, defaultVal) {
                var res = this[attribute];
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
            };
            /**
             *  converts a specific object member to a float.  Used for converting configurations that
             * that come in as strings.
             * @param attribute - attribute to convert to float
             * @param defaultVal - the default value to use if its not defined.
             */
            LogicalControl.prototype.convertToFloat = function (attribute, defaultVal) {
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
            };
            /**
             *  converts a specific object member to a integer.  Used for converting configurations that
             * that come in as strings.
             * @param attribute - attribute to convert to integer
             * @param defaultVal - the default value to use if its not defined.
             */
            LogicalControl.prototype.convertToInteger = function (attribute, defaultVal) {
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
            };
            /**
             * Gets a value from an object using the logicalParent and a string to get a value.  The format is.
             * one period for every level up followed by the member ie.  ..DataSource would retreive
             * logicalParent.logicalparent.DataSource.  This is used for parsing attributes in html elements
             * that are intended to have relative paths such as the data source of a grid
             * @param path - string path to the value to retreive
             */
            LogicalControl.prototype.getRelativePath = function (path) {
                var pth = path.trim();
                var splitPath = pth.split(/[\.]/g);
                var len = splitPath.length;
                len = len - 1;
                var currentNode = this;
                if (len === 0)
                    return window[pth];
                for (var i = 0; i < len; i++) {
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
            };
            return LogicalControl;
        }());
        UI.LogicalControl = LogicalControl;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
var TSF;
(function (TSF) {
    var Data;
    (function (Data) {
        /** How to join criteria or criteria groups*/
        var CriteriaJoin;
        (function (CriteriaJoin) {
            CriteriaJoin[CriteriaJoin["And"] = 0] = "And";
            CriteriaJoin[CriteriaJoin["Or"] = 1] = "Or";
        })(CriteriaJoin = Data.CriteriaJoin || (Data.CriteriaJoin = {}));
        /** The type of comparison to do */
        var CriteriaComparator;
        (function (CriteriaComparator) {
            CriteriaComparator[CriteriaComparator["Equal"] = 0] = "Equal";
            CriteriaComparator[CriteriaComparator["NotEqual"] = 1] = "NotEqual";
            CriteriaComparator[CriteriaComparator["GreaterThan"] = 2] = "GreaterThan";
            CriteriaComparator[CriteriaComparator["LessThan"] = 3] = "LessThan";
            CriteriaComparator[CriteriaComparator["GreaterThanOrEqual"] = 4] = "GreaterThanOrEqual";
            CriteriaComparator[CriteriaComparator["LessThanOrEqual"] = 5] = "LessThanOrEqual";
            CriteriaComparator[CriteriaComparator["Like"] = 6] = "Like";
            CriteriaComparator[CriteriaComparator["NotLike"] = 7] = "NotLike";
            CriteriaComparator[CriteriaComparator["In"] = 8] = "In";
            CriteriaComparator[CriteriaComparator["NotIn"] = 9] = "NotIn";
            CriteriaComparator[CriteriaComparator["IsNull"] = 10] = "IsNull";
            CriteriaComparator[CriteriaComparator["IsNotNull"] = 11] = "IsNotNull";
        })(CriteriaComparator = Data.CriteriaComparator || (Data.CriteriaComparator = {}));
        /**
         * A class that represents an sql criteria
         */
        var Criteria = /** @class */ (function () {
            /**
             * Creates a new criteria with the specified constraint
             * @param column - the column to the compare the value to
             * @param value - the value to compare against the column
             * @param comparator - the type of comparison to do (Equals, Greater than etc)
             * @param join - how to join the criteria to the previous criteria
             */
            function Criteria(column, value, comparator, join) {
                if (comparator === void 0) { comparator = CriteriaComparator.Equal; }
                if (join === void 0) { join = CriteriaJoin.And; }
                this.column = column;
                this.value = value;
                this.join = join;
                this.comparator = comparator;
            }
            return Criteria;
        }());
        Data.Criteria = Criteria;
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
/// <reference path="..\UI\LogicalControl.ts" />
/// <reference path=".\Criteria.ts" />
var TSF;
/// <reference path="..\UI\LogicalControl.ts" />
/// <reference path=".\Criteria.ts" />
(function (TSF) {
    var Data;
    (function (Data) {
        /**An asynchronous datasource.s**/
        var DataSource = /** @class */ (function (_super) {
            __extends(DataSource, _super);
            function DataSource(ele, logicalParent) {
                var _this = _super.call(this, ele, logicalParent) || this;
                /**the current page number  not to be set directly.**/
                _this.pageNum = 0;
                /**Event is fired when the data is successfully updated**/
                _this.onDataUpdated = new TSF.Events.ValueEvent();
                _this.onError = new TSF.Events.ValueEvent();
                /**Is fired when the page changed in the datasource (used by pagers in case something resets the data source and also provides max pages to display)**/
                _this.onPageChange = new Data.PageChangeEvent();
                _this.onSortChanged = new TSF.Events.ValueEvent();
                _this.loadConfiguration('dataUrl', 'countUrl', 'pageSize', 'clientPaging', 'fireStartEndEvents');
                _this.convertToInteger('pageSize', 0);
                _this.convertToBoolean('clientPaging', false);
                _this.convertToBoolean('fireStartEndEvents', false);
                return _this;
            }
            Object.defineProperty(DataSource.prototype, "Criteria", {
                /** criteria currently set on data source */
                get: function () {
                    return this.criteria;
                },
                enumerable: false,
                configurable: true
            });
            /**Calls the data retrieval method.**/
            DataSource.prototype.callDataMethod = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var startIndex, recordCount, query;
                    var _this = this;
                    return __generator(this, function (_a) {
                        if (this.pageSize === undefined)
                            this.pageSize = this.maxRecords;
                        startIndex = this.pageNum * this.pageSize;
                        if (this.maxRecords < startIndex + this.pageSize)
                            recordCount = this.maxRecords - startIndex;
                        else
                            recordCount = this.pageSize;
                        query = new Data.Query();
                        query.condition = this.criteria;
                        query.startRecord = startIndex;
                        query.returnCount = recordCount;
                        if (this.sortBy && this.sortBy.length > 0)
                            query.sortBy = this.sortBy;
                        else
                            query.sortBy = this.defaultSortBy;
                        new TSF.Remote.RemoteCall(this.dataUrl, query).advancedOptions(TSF.Remote.RequestType.POST, this.fireStartEndEvents).call().then(function (data) {
                            _this.data = data;
                            _this.updateDS(_this.data);
                        }).catch(function (ex) {
                            console.error(ex);
                            _this.onError.fire(ex);
                        });
                        return [2 /*return*/];
                    });
                });
            };
            /* fire the updated data source method and determines the max pages etc */
            DataSource.prototype.updateDS = function (ds) {
                this.onDataUpdated.fire(ds);
                this.onDSRefresh();
            };
            DataSource.prototype.onDSRefresh = function () {
                var maxPages = 0;
                if (this.maxRecords != undefined
                    && this.pageSize !== undefined) {
                    maxPages = Math.ceil(this.maxRecords / this.pageSize);
                }
                this.onPageChange.fire(this.pageNum + 1, maxPages);
            };
            /**Refreshes the data in the datasource with the current page number and filters**/
            DataSource.prototype.refresh = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var query, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!(this.countUrl !== undefined
                                    && this.countUrl !== null)) return [3 /*break*/, 2];
                                query = new Data.Query();
                                query.condition = this.criteria;
                                if (this.sortBy && this.sortBy.length > 0)
                                    query.sortBy = this.sortBy;
                                else
                                    query.sortBy = this.defaultSortBy;
                                _a = this;
                                return [4 /*yield*/, new TSF.Remote.RemoteCall(this.countUrl, query).advancedOptions(TSF.Remote.RequestType.POST, this.fireStartEndEvents).call()];
                            case 1:
                                _a.maxRecords = (_b.sent());
                                this.callDataMethod();
                                return [3 /*break*/, 3];
                            case 2:
                                this.callDataMethod();
                                _b.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            /**
             * Applies filters to the data source (resets page to 0);
             * @param filters - Filters to apply to the data source
             * @param refresh - determines if a data refresh should occur when the method is called.
             */
            DataSource.prototype.applyFilter = function (filters, refresh) {
                if (refresh === void 0) { refresh = true; }
                if (this.criteria != filters)
                    this.pageNum = 0;
                this.criteria = filters;
                if (refresh) {
                    this.refresh();
                }
            };
            /**
             * Changes the sort column being used for the datasource for the server side sorting
             * @param sortBy - Sort by fields to sort on
             * @param refresh - determines if a data refresh should occur when the method is called.
             */
            DataSource.prototype.applySorting = function (sortBy, refresh) {
                this.sortBy = sortBy;
                this.pageNum = 0;
                if (refresh === undefined || refresh === true)
                    this.refresh();
                this.onSortChanged.fire(this.sortBy);
            };
            /**
             * Changes the page number of the data source
             * @param pageNum - the page to change to.
             */
            DataSource.prototype.changePage = function (pageNum) {
                this.pageNum = pageNum - 1;
                this.refresh();
            };
            return DataSource;
        }(TSF.UI.LogicalControl));
        Data.DataSource = DataSource;
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
/// <reference path="..\Data\DataSource.ts" />
var TSF;
/// <reference path="..\Data\DataSource.ts" />
(function (TSF) {
    var Data;
    (function (Data) {
        /**An asynchronous datasource.s**/
        var AsyncDataSource = /** @class */ (function (_super) {
            __extends(AsyncDataSource, _super);
            function AsyncDataSource() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**Event is fired when the data is successfully updated**/
                _this.onEndUpdate = new TSF.Events.ValueEvent();
                /**Event fired right before making remote calls**/
                _this.onStartUpdate = new TSF.Events.EmptyEvent();
                return _this;
            }
            AsyncDataSource.prototype.updateDS = function (ds) {
                this.onDataUpdated.fire(ds);
                this.onEndUpdate.fire(ds);
                this.onDSRefresh();
            };
            /**if either count or success callback fails**/
            AsyncDataSource.prototype.failureCallback = function (exception) {
                this.onEndUpdate.fire(null);
                this.onError.fire(exception);
            };
            /**Refreshes the data in the datasource with the current page number and filters**/
            AsyncDataSource.prototype.refresh = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.onStartUpdate.fire();
                        _super.prototype.refresh.call(this);
                        return [2 /*return*/];
                    });
                });
            };
            return AsyncDataSource;
        }(Data.DataSource));
        Data.AsyncDataSource = AsyncDataSource;
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
/// <reference path=".\Criteria.ts" />
var TSF;
/// <reference path=".\Criteria.ts" />
(function (TSF) {
    var Data;
    (function (Data) {
        /**
         * A class used to hold criteria for an sql call
         */
        var Condition = /** @class */ (function () {
            /**
             * Creates a new condition with an optional starting criteria
             * @param column - the column name to compare
             * @param value - the value to compare the parameter name against
             * @param comparator - the type of comparison to be done.
             */
            function Condition(column, value, comparator) {
                if (comparator === void 0) { comparator = Data.CriteriaComparator.Equal; }
                /** Used to hold a group of criteria that would be enclosed in a parathensis */
                this.criteriaGroup = new Array();
                /** used to hold a list of criteria */
                this.criteria = new Array();
                if (column) {
                    this.criteria.push(new Data.Criteria(column, value, comparator));
                }
            }
            return Condition;
        }());
        Data.Condition = Condition;
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
var TSF;
(function (TSF) {
    var Data;
    (function (Data) {
        /**
         * Holds a group of criteria to be enclosed in paranthesis
         */
        var CriteriaGroup = /** @class */ (function () {
            /**
             * how to join the group onto the previous criteria.
             * @param join
             */
            function CriteriaGroup(join) {
                if (join === void 0) { join = Data.CriteriaJoin.And; }
                /** the list of criteria for the group*/
                this.criteria = new Array();
                /** sub groups of the groups*/
                this.groups = new Array();
                this.join = join;
            }
            return CriteriaGroup;
        }());
        Data.CriteriaGroup = CriteriaGroup;
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
var TSF;
(function (TSF) {
    var Data;
    (function (Data) {
        var Filtering = /** @class */ (function () {
            function Filtering() {
            }
            Filtering.filterOnCondition = function (data, filters, columnHash) {
                if (!Filtering.OperationsHash) {
                    Filtering.OperationsHash = {};
                    Filtering.OperationsHash[Data.CriteriaComparator.Equal] = function (val1, val2) { return val1 === val2; };
                    Filtering.OperationsHash[Data.CriteriaComparator.NotEqual] = function (val1, val2) { return val1 !== val2; };
                    Filtering.OperationsHash[Data.CriteriaComparator.GreaterThan] = function (val1, val2) { return val1 > val2; };
                    Filtering.OperationsHash[Data.CriteriaComparator.GreaterThanOrEqual] = function (val1, val2) { return val1 >= val2; };
                    Filtering.OperationsHash[Data.CriteriaComparator.IsNotNull] = function (val1, val2) { return val1 !== null; };
                    Filtering.OperationsHash[Data.CriteriaComparator.IsNull] = function (val1, val2) { return val1 === null; };
                    Filtering.OperationsHash[Data.CriteriaComparator.LessThan] = function (val1, val2) { return val1 < val2; };
                    Filtering.OperationsHash[Data.CriteriaComparator.LessThanOrEqual] = function (val1, val2) { return val1 <= val2; };
                    Filtering.OperationsHash[Data.CriteriaComparator.Like] = function (val1, val2) {
                        var regex = Filtering.regexHash[val2];
                        if (!regex)
                            Filtering.regexHash[val2] = regex = new RegExp('^' + val2.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '.*?') + '$');
                        return regex.test(val1);
                    };
                    Filtering.OperationsHash[Data.CriteriaComparator.NotLike] = function (val1, val2) {
                        var regex = Filtering.regexHash[val2];
                        if (!regex)
                            Filtering.regexHash[val2] = regex = new RegExp('^' + val2.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '.*?') + '$');
                        return !regex.test(val1);
                    };
                    Filtering.OperationsHash[Data.CriteriaComparator.In] = function (val1, val2) {
                        var len = val2.length;
                        for (var i = 0; i < len; i++) {
                            if (val1 === val2[i])
                                return true;
                        }
                        return false;
                    };
                    Filtering.OperationsHash[Data.CriteriaComparator.NotIn] = function (val1, val2) {
                        var len = val2.length;
                        for (var i = 0; i < len; i++) {
                            if (val1 === val2[i])
                                return false;
                        }
                        return true;
                    };
                }
                Filtering.convertDateTimesForCriteria(filters.criteria, columnHash);
                Filtering.convertDateTimesForCriteriaGroup(filters.criteriaGroup, columnHash);
                return Filtering.filterLocalData(data, filters, columnHash);
            };
            Filtering.convertDateTimesForCriteriaGroup = function (groups, columnHash) {
                var len = groups.length;
                for (var i = 0; i < len; i++) {
                    var group = groups[i];
                    Filtering.convertDateTimesForCriteria(group.criteria, columnHash);
                    Filtering.convertDateTimesForCriteriaGroup(group.groups, columnHash);
                }
            };
            Filtering.convertDateTimesForCriteria = function (criteria, columnHash) {
                var len = criteria.length;
                for (var i = 0; i < len; i++) {
                    var crit = criteria[i];
                    var col = columnHash[crit.column];
                    if (col && col.dataType === TSF.UI.ColumnType.DateTime) {
                        crit['#dt'] = new Date(crit.value).getTime();
                    }
                }
            };
            /**
             * Filters data locally on teh provided condition
             * @param condition - condition to filter data on
             */
            Filtering.filterLocalData = function (data, condition, columnHash) {
                var dataLen = data.length;
                var newData = [];
                for (var i = 0; i < dataLen; i++) {
                    var dat = data[i];
                    var validated = Filtering.checkCriteriaList(condition.criteria, dat, columnHash);
                    if (condition.criteriaGroup.length > 0) {
                        if (condition.criteriaGroup[0].join === Data.CriteriaJoin.And)
                            validated = validated && Filtering.checkCriteriaGroup(condition.criteriaGroup, dat, columnHash);
                        else
                            validated = validated || Filtering.checkCriteriaGroup(condition.criteriaGroup, dat, columnHash);
                    }
                    if (validated)
                        newData.push(dat);
                }
                return newData;
            };
            /**
             * Checks to see if an object matches the criteria in a criteria group list
             * @param groups - list of criteria groups to compare the data against
             * @param data - data to compare
             */
            Filtering.checkCriteriaGroup = function (groups, data, columnHash) {
                var dataCondition = true;
                var groupLen = groups.length;
                if (groupLen > 0) {
                    var group = groups[0];
                    if (group.groups.length > 0) {
                        if (group.groups[0].join === Data.CriteriaJoin.And)
                            dataCondition = Filtering.checkCriteriaList(group.criteria, data, columnHash) && Filtering.checkCriteriaGroup(group.groups, data, columnHash);
                        else
                            dataCondition = Filtering.checkCriteriaList(group.criteria, data, columnHash) || Filtering.checkCriteriaGroup(group.groups, data, columnHash);
                    }
                    else
                        dataCondition = Filtering.checkCriteriaList(group.criteria, data, columnHash);
                }
                for (var i = 1; i < groupLen; i++) {
                    var tempCondition = false;
                    var group = groups[i];
                    if (group.groups.length > 0) {
                        if (group.groups[0].join === Data.CriteriaJoin.And)
                            tempCondition = Filtering.checkCriteriaList(group.criteria, data, columnHash) && Filtering.checkCriteriaGroup(group.groups, data, columnHash);
                        else
                            tempCondition = Filtering.checkCriteriaList(group.criteria, data, columnHash) || Filtering.checkCriteriaGroup(group.groups, data, columnHash);
                    }
                    else
                        tempCondition = Filtering.checkCriteriaList(group.criteria, data, columnHash);
                    if (group.join == Data.CriteriaJoin.And)
                        dataCondition = dataCondition && tempCondition;
                    else
                        dataCondition = dataCondition || tempCondition;
                }
                return dataCondition;
            };
            /**
             * Determines if an object matches the specified criteria
             * @param criteria - list of criteria to compare
             * @param data - data to compare criteria against
             */
            Filtering.checkCriteriaList = function (criteria, data, columnHash) {
                var dataCondition = true;
                var criteriaLength = criteria.length;
                var opHash = Filtering.OperationsHash;
                if (criteriaLength > 0) {
                    var crit = criteria[0];
                    var col = columnHash[crit.column];
                    var val1_1 = data[crit.column];
                    var val2_1;
                    if (col && col.dataType === TSF.UI.ColumnType.DateTime) {
                        val2_1 = crit['#dt'];
                        val1_1 = new Date(val1_1).getTime();
                    }
                    else
                        val2_1 = crit.value;
                    dataCondition = opHash[crit.comparator](val1_1, val2_1);
                }
                for (var i = 1; i < criteriaLength; i++) {
                    var crit = criteria[i];
                    var col = columnHash[crit.column];
                    var val1 = data[crit.column];
                    var val2 = crit.value;
                    if (col.dataType === TSF.UI.ColumnType.DateTime) {
                        val2 = new Date(val2).getTime();
                        val1 = new Date(val1).getTime();
                    }
                    if (crit.join == Data.CriteriaJoin.And)
                        dataCondition = dataCondition && opHash[crit.comparator](val1, val2);
                    else
                        dataCondition = dataCondition || opHash[crit.comparator](val1, val2);
                }
                return dataCondition;
            };
            return Filtering;
        }());
        Data.Filtering = Filtering;
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
/// <reference path=".\EventHandler.ts" />
var TSF;
/// <reference path=".\EventHandler.ts" />
(function (TSF) {
    var Events;
    (function (Events) {
        /**
         * Basic event with one argument that can be dynamically typed.
         */
        var ValueEvent = /** @class */ (function (_super) {
            __extends(ValueEvent, _super);
            function ValueEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * Fires the event
             * @param value - the value to be passed into the listening methods.
             */
            ValueEvent.prototype.fire = function (value) {
                _super.prototype.fire.call(this, value);
            };
            return ValueEvent;
        }(Events.EventHandler));
        Events.ValueEvent = ValueEvent;
    })(Events = TSF.Events || (TSF.Events = {}));
})(TSF || (TSF = {}));
/// <reference path="..\Base\Exception.ts" />
/// <reference path="..\Events\ValueEvent.ts" />
var TSF;
/// <reference path="..\Base\Exception.ts" />
/// <reference path="..\Events\ValueEvent.ts" />
(function (TSF) {
    var Data;
    (function (Data) {
        var Exception = TSF.Base.Exception;
        /**
         * Class that holds logic for making objects observable.
         */
        var Observer = /** @class */ (function () {
            function Observer() {
            }
            /**
             * Alerts other objects listening for changes on this object
             * @param object - the object to fire the events for
             * @param attribute - the attribute to fire the event for (optional.  Will fire on change of object if not provided)
             */
            Observer.$alertObservers = function (object, attribute) {
                if (attribute) {
                    var event = object.$events[attribute];
                    if (event)
                        event.fire(object);
                    object.$objectChangeEvent.fire(object);
                }
                else
                    object.$objectChangeEvent.fire(object);
            };
            /**
             * Defines the getters and setters that trigger events when their values change
             * @param object - the object to define the event for
             * @param att - the attribute to define the event for
             * @param newName - the name to use for the value of the attribute
             */
            Observer.$defineEvent = function (object, att, newName) {
                var me = object;
                Object.defineProperty(object, att, {
                    get: function () { return this[newName]; },
                    set: function (value) { var oldVal = me[newName]; me[newName] = value; if (oldVal !== value) {
                        me.$dirty = true;
                        Observer.$alertObservers(me, att);
                    } }
                });
                object.$events[att] = new TSF.Events.ValueEvent();
            };
            /**
             * Allows setting of a value without triggering an event
             * @param obj - object to set the value for
             * @param attr - the attribute to set
             * @param val - the value to assign to the attribute
             */
            Observer.$setValueNoEvent = function (obj, attr, val) {
                obj['#' + attr] = val;
            };
            /**
             * observes a specific attribute of an object and makes the object obserable if it isn't already
             * @param object - object to observe
             * @param callBackObject - the object listening for the event
             * @param method - the method to fire
             * @param attribute - the attribute to observe
             */
            Observer.$observe = function (object, callBackObject, method, attribute) {
                if (callBackObject && method) {
                    if (object.$regEvents === undefined) {
                        object.$events = {};
                        object.$objectChangeEvent = new TSF.Events.ValueEvent();
                        object.$regEvents = false;
                        object.$dirty = false;
                    }
                    if (!object.$regEvents) {
                        object.$regEvents = true;
                        for (var att in object) {
                            if (Observer.$exclusions[att] === undefined) {
                                var newName = '#' + att;
                                var val = object[att];
                                if (typeof (val) !== 'function') {
                                    object[newName] = val;
                                    delete object[att];
                                    Observer.$defineEvent(object, att, newName);
                                    object.$events[att] = new TSF.Events.ValueEvent();
                                }
                            }
                        }
                    }
                    if (attribute) {
                        if (!object.$events[attribute]) {
                            var newName = '#' + attribute;
                            var val = object[attribute];
                            if (typeof (val) !== 'function') {
                                object[newName] = val;
                                delete object[attribute];
                                Observer.$defineEvent(object, attribute, newName);
                                object[attribute] = new TSF.Events.ValueEvent();
                            }
                        }
                        object.$events[attribute].add(method, callBackObject);
                    }
                    else {
                        object.$objectChangeEvent.add(method, callBackObject);
                    }
                }
                else {
                    throw new Exception("Must provide a callBackObject and method to listen to events");
                }
            };
            /**
             * Stops observing a specific attribute
             * @param object - the object to stop observing
             * @param callBackObject - the object that was listening
             * @param method - the method to remove from the event handeler
             * @param attribute - the attribute to stop listening to.
             */
            Observer.$stopObserving = function (object, callBackObject, method, attribute) {
                if (callBackObject && method) {
                    if (attribute) {
                        var event = object.$events[attribute];
                        if (event)
                            event;
                        else {
                            throw new Exception("There is no one observering this objecet to stop observing it");
                        }
                        event.remove(method, callBackObject);
                    }
                    else {
                        throw new Exception("Must provide a callBackObject and method to listen to events");
                    }
                }
            };
            /** parameters not to convert into getters and setters that fire events */
            Observer.$exclusions = {
                '$exclusions': true, '$observe': true, '$alertObservers': true, '$definEvent': true, '$setValueNoEvent': true, '$setAttributeWithoutEvent': true, '$stopObserving': true, '$events': true, '$objectChangeEvent': true, '$regEvents': true, '$dirty': true
            };
            return Observer;
        }());
        Data.Observer = Observer;
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
/// <reference path="..\Events\EventHandler.ts" />
var TSF;
/// <reference path="..\Events\EventHandler.ts" />
(function (TSF) {
    var Data;
    (function (Data) {
        /**
         * An event fired when a data source has its page changed
         */
        var PageChangeEvent = /** @class */ (function (_super) {
            __extends(PageChangeEvent, _super);
            function PageChangeEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * Fires the page change event
             * @param pageNum - the page being changed to
             * @param maxRecords - the max number of records available to make pages from
             */
            PageChangeEvent.prototype.fire = function (pageNum, maxRecords) {
                _super.prototype.fire.call(this, pageNum, maxRecords);
            };
            return PageChangeEvent;
        }(TSF.Events.EventHandler));
        Data.PageChangeEvent = PageChangeEvent;
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
var TSF;
(function (TSF) {
    var Data;
    (function (Data) {
        /**
         * Contains data related to a remote call including criteria, which columns to pull back, sort order and server side paging options.
         */
        var Query = /** @class */ (function () {
            function Query() {
                /** columns to retreive */
                this.columns = new Array();
            }
            return Query;
        }());
        Data.Query = Query;
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
var TSF;
(function (TSF) {
    var Data;
    (function (Data) {
        /** sort direction of a query */
        var SortDirection;
        (function (SortDirection) {
            SortDirection[SortDirection["ASC"] = 0] = "ASC";
            SortDirection[SortDirection["DESC"] = 1] = "DESC";
        })(SortDirection = Data.SortDirection || (Data.SortDirection = {}));
        /**
         * The sort element of a query.
         */
        var SortElement = /** @class */ (function () {
            /**
             * The sort element of a query.
             * @param column - the column to sort by
             * @param sortDirection - the direction to sort by (optional.  Sorts by Ascending by default).
             */
            function SortElement(column, sortDirection) {
                if (sortDirection === void 0) { sortDirection = SortDirection.ASC; }
                this.column = column;
                this.sortDirection = sortDirection;
            }
            return SortElement;
        }());
        Data.SortElement = SortElement;
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
/// <reference path="..\..\Base\Exception.ts" />
/// <reference path="..\..\Events\ValueEvent.ts" />
var TSF;
/// <reference path="..\..\Base\Exception.ts" />
/// <reference path="..\..\Events\ValueEvent.ts" />
(function (TSF) {
    var Data;
    (function (Data) {
        var AbstractClasses;
        (function (AbstractClasses) {
            /**
             * If an object inherits from this class it becomes observable.  Meaning you can listen for attribute changes on the object
             */
            var AObservable = /** @class */ (function () {
                function AObservable() {
                    /** holds a hashtable of events by attribute */
                    this.$events = {};
                    /** the event for if any value on the object has changed (does not work if the attribute was not defined with a value before hand) */
                    this.$objectChangeEvent = new TSF.Events.ValueEvent();
                    /** used to determine if the events have been created yet for this object */
                    this.$regEvents = false;
                    /** is set to true if the any value on the object has changed */
                    this.$dirty = false;
                }
                /**
                 * Sets the value of an object without triggering an event
                 * @param attr - attribute to set
                 * @param val - value to set the attribute to
                 */
                AObservable.prototype.$setAttributeWithoutEvent = function (attr, val) {
                    Data.Observer.$setValueNoEvent(this, attr, val);
                };
                /**
                 * Observes a speific attribute of an object
                 * @param callBackObject - object listening
                 * @param method - method to call when the attribute has changed
                 * @param attribute - the attribute to listen for (optional.  If left blank triggers the method on any attribute change)
                 */
                AObservable.prototype.$observe = function (callBackObject, method, attribute) {
                    Data.Observer.$observe(this, callBackObject, method, attribute);
                };
                /**
                 * Stops observing a the objects event
                 * @param callBackObject - the object that was listening
                 * @param method - the method that should no longer be called on value change
                 * @param attribute - the attribute to stop listening to (optional.  If left blank will stop listening to object change events)
                 */
                AObservable.prototype.$stopObserving = function (callBackObject, method, attribute) {
                    Data.Observer.$stopObserving(this, callBackObject, method, attribute);
                };
                return AObservable;
            }());
            AbstractClasses.AObservable = AObservable;
        })(AbstractClasses = Data.AbstractClasses || (Data.AbstractClasses = {}));
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
/// <reference path=".\IDataSource.ts" />
/*Data Structures*/
var TSF;
/*Data Structures*/
(function (TSF) {
    var DS;
    (function (DS) {
        /**
         * Linked list structure
         */
        var LinkList = /** @class */ (function () {
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
        var Link = /** @class */ (function () {
            function Link() {
            }
            return Link;
        }());
        DS.Link = Link;
    })(DS = TSF.DS || (TSF.DS = {}));
})(TSF || (TSF = {}));
var TSF;
(function (TSF) {
    var DS;
    (function (DS) {
        /**
         *  Used to interface with the .Net tuple
         */
        var Tuple = /** @class */ (function () {
            function Tuple(Item1, Item2, Item3, Item4, Item5, Item6, Item7) {
                this.Item1 = Item1;
                this.Item2 = Item2;
                this.Item3 = Item3;
                this.Item4 = Item4;
                this.Item5 = Item5;
                this.Item6 = Item6;
                this.Item7 = Item7;
            }
            return Tuple;
        }());
        DS.Tuple = Tuple;
    })(DS = TSF.DS || (TSF.DS = {}));
})(TSF || (TSF = {}));
/// <reference path=".\EventHandler.ts" />
var TSF;
/// <reference path=".\EventHandler.ts" />
(function (TSF) {
    var Events;
    (function (Events) {
        /**
         * Event handeler specifically for check changed event.  Takes a sender:UI.Checkbox,checked:boolean and args:any for input
         */
        var CheckedChangedEvent = /** @class */ (function (_super) {
            __extends(CheckedChangedEvent, _super);
            function CheckedChangedEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * event to trigger the method
             * @param sender - the object to fire the event for
             * @param args - the additional arguments to pass in
             */
            CheckedChangedEvent.prototype.fire = function (sender, args) {
                _super.prototype.fire.call(this, sender, sender.Checked, args);
            };
            return CheckedChangedEvent;
        }(Events.EventHandler));
        Events.CheckedChangedEvent = CheckedChangedEvent;
    })(Events = TSF.Events || (TSF.Events = {}));
})(TSF || (TSF = {}));
/// <reference path=".\EventHandler.ts" />
var TSF;
/// <reference path=".\EventHandler.ts" />
(function (TSF) {
    var Events;
    (function (Events) {
        /**
         * Standard event handeler with generic types signature (sender:any, args:any)
         */
        var Event = /** @class */ (function (_super) {
            __extends(Event, _super);
            function Event() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Event.prototype.fire = function (sender, args) {
                _super.prototype.fire.call(this, sender, args);
            };
            return Event;
        }(Events.EventHandler));
        Events.Event = Event;
    })(Events = TSF.Events || (TSF.Events = {}));
})(TSF || (TSF = {}));
/// <reference path=".\EventHandler.ts" />
var TSF;
/// <reference path=".\EventHandler.ts" />
(function (TSF) {
    var Events;
    (function (Events) {
        /**
         * UI event handeler with generic signatures (sender:sender, args:args)
         */
        var GenericEvent = /** @class */ (function (_super) {
            __extends(GenericEvent, _super);
            function GenericEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GenericEvent.prototype.fire = function (sender, args) {
                _super.prototype.fire.call(this, sender, args);
            };
            return GenericEvent;
        }(Events.EventHandler));
        Events.GenericEvent = GenericEvent;
    })(Events = TSF.Events || (TSF.Events = {}));
})(TSF || (TSF = {}));
/// <reference path=".\EventHandler.ts" />
var TSF;
/// <reference path=".\EventHandler.ts" />
(function (TSF) {
    var Events;
    (function (Events) {
        /**
        * UI event handeler with specific signatures (sender:UI.TSControl, args:any)
        */
        var UIEvent = /** @class */ (function (_super) {
            __extends(UIEvent, _super);
            function UIEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            UIEvent.prototype.fire = function (sender, args) {
                _super.prototype.fire.call(this, sender, args);
            };
            return UIEvent;
        }(Events.EventHandler));
        Events.UIEvent = UIEvent;
    })(Events = TSF.Events || (TSF.Events = {}));
})(TSF || (TSF = {}));
/// <reference path=".\LogicalControl.ts" />
var TSF;
/// <reference path=".\LogicalControl.ts" />
(function (TSF) {
    var UI;
    (function (UI) {
        var TSControl = /** @class */ (function (_super) {
            __extends(TSControl, _super);
            /**
             * A Base control that can be used in the html markup or just constructed plainly in javacsript
             * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
             * @param logicalParent - the logical parent entity such as a controller.  Used internally.
             */
            function TSControl(ele, logicalParent) {
                var _this = _super.call(this, ele, logicalParent) || this;
                _this.context = {};
                if (ele !== undefined) {
                    var clickEvent = _this.jElement.attr('onclick');
                    if (clickEvent !== null && clickEvent !== undefined) {
                        _this.OnClick.add(function (sender, args) { eval(clickEvent); }, (logicalParent === undefined) ? _this : logicalParent);
                    }
                    var doubleClickEvent = _this.jElement.attr('ondblclick');
                    if (doubleClickEvent !== null && doubleClickEvent !== undefined) {
                        _this.OnDoubleClick.add(function (sender, args) { eval(doubleClickEvent); }, (logicalParent === undefined) ? _this : logicalParent);
                    }
                    _this.loadConfiguration('args');
                }
                return _this;
            }
            Object.defineProperty(TSControl.prototype, "OnClick", {
                /** The on click event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
                get: function () {
                    var _this = this;
                    if (this.onClick === undefined) {
                        this.onClick = new TSF.Events.UIEvent();
                        this.element.onclick = function () { return _this.onClick.fire(_this, _this.args); };
                    }
                    return this.onClick;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(TSControl.prototype, "OnDoubleClick", {
                /** The on double click event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
                get: function () {
                    var _this = this;
                    if (this.onDoubleClick === undefined) {
                        this.onDoubleClick = new TSF.Events.UIEvent();
                        this.element.ondblclick = function () { return _this.onDoubleClick.fire(_this, _this.args); };
                    }
                    return this.onDoubleClick;
                },
                enumerable: false,
                configurable: true
            });
            /**
             * Appends a control to the child elements of the current control
             * @param control - the control to append
             */
            TSControl.prototype.Append = function (control) {
                this.jElement.append(control.jElement);
            };
            /**
             * Insert control before the provided control in the html
             * @param control - the control to insert this object before
             */
            TSControl.prototype.InsertBefore = function (control) {
                this.jElement.insertBefore(control.jElement);
            };
            /**
             * Insert control after the provided control in the html
             * @param control - the control to insert this object after
             */
            TSControl.prototype.InsertAfter = function (control) {
                this.jElement.insertAfter(control.jElement);
            };
            /**
             * clears all of the child html elements from the control
             */
            TSControl.prototype.emptyContent = function () {
                this.jElement.empty();
            };
            Object.defineProperty(TSControl.prototype, "TagName", {
                /** returns the tag name of the element*/
                get: function () {
                    return this.element.tagName;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(TSControl.prototype, "Class", {
                /** returns the class name of the element */
                get: function () {
                    return this.element.className;
                },
                /** Sets the class name of the element */
                set: function (val) {
                    this.element.className = val;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(TSControl.prototype, "Attributes", {
                /** The attributes of the element */
                get: function () {
                    return this.element.attributes;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(TSControl.prototype, "Style", {
                /** the style of the element */
                get: function () {
                    return this.element.style;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(TSControl.prototype, "Text", {
                /** Text of the html element */
                get: function () {
                    return this.jElement.text();
                },
                /** Text of the html element */
                set: function (val) {
                    this.jElement.text(val);
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(TSControl.prototype, "Value", {
                /** Value of the html element */
                get: function () {
                    return this.jElement.val();
                },
                /** Value of the html element */
                set: function (val) {
                    this.jElement.val(val);
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(TSControl.prototype, "Disabled", {
                /** Get or set the disabled status of the element */
                get: function () {
                    return this.disabled;
                },
                /** Get or set the disabled status of the element */
                set: function (value) {
                    if (value !== this.disabled) {
                        if (value === true) {
                            this.disabled = true;
                            this.jElement.removeAttr('disabled');
                        }
                        else {
                            this.disabled = false;
                            this.jElement.attr('disabled', 'disabled');
                        }
                    }
                },
                enumerable: false,
                configurable: true
            });
            /**
             * Hides the control (display:none)
             */
            TSControl.prototype.hide = function () {
                this.previousDisplay = this.element.style.display;
                this.jElement.hide();
            };
            /**
             * Shows the control.  Sets the previous display type if hide was used previously
             */
            TSControl.prototype.show = function () {
                if (!this.previousDisplay && this.previousDisplay.toUpperCase() !== "NONE")
                    this.element.style.display = this.previousDisplay;
                else
                    this.jElement.show();
            };
            /**
             * load html content into the body construct any controls used specified in the markup.  This can be used to refer to
             * this object in the var attribute in this method.
             * @param data - html data to load into the control
             */
            TSControl.prototype.loadHtml = function (data) {
                if (data !== undefined) {
                    if (this.jElement === undefined) {
                        this.jElement = $(data);
                        this.element = this.jElement[0];
                        TSF.Base.TSBase.constructControls.apply(this, [this.element]);
                    }
                    else {
                        this.jElement.append($(data));
                        var children = this.element.children;
                        var len = children.length;
                        for (var i = 0; i < len; i++)
                            TSF.Base.TSBase.constructControls.apply(this, [children[i]]);
                    }
                }
            };
            TSControl.eventList = {};
            return TSControl;
        }(UI.LogicalControl));
        UI.TSControl = TSControl;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
/// <reference path=".\TSControl.ts" />
var TSF;
/// <reference path=".\TSControl.ts" />
(function (TSF) {
    var UI;
    (function (UI) {
        var ButtonType;
        (function (ButtonType) {
            ButtonType[ButtonType["button"] = 0] = "button";
            ButtonType[ButtonType["submit"] = 1] = "submit";
            ButtonType[ButtonType["reset"] = 2] = "reset";
            ButtonType[ButtonType["undefined"] = 3] = "undefined";
        })(ButtonType = UI.ButtonType || (UI.ButtonType = {}));
        /**
         * Class that represents a button.
         */
        var Button = /** @class */ (function (_super) {
            __extends(Button, _super);
            /**
             * A Button control that can be used in the html markup or just constructed plainly in javacsript
             * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
             * @param logicalParent - the logical parent entity such as a controller.  Used internally.
             */
            function Button(ele, logicalParent) {
                var _this = _super.call(this, ele, logicalParent) || this;
                _this.checkEmptyEle('button');
                return _this;
            }
            Object.defineProperty(Button.prototype, "Type", {
                get: function () {
                    var attr = this.element.getAttribute('type');
                    if (attr === undefined || attr === null)
                        return ButtonType.undefined;
                    else
                        return ButtonType[attr.toLocaleLowerCase()];
                },
                set: function (type) {
                    this.element.setAttribute('type', ButtonType[type]);
                },
                enumerable: false,
                configurable: true
            });
            return Button;
        }(UI.TSControl));
        UI.Button = Button;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
/// <reference path=".\TSControl.ts" />
var TSF;
/// <reference path=".\TSControl.ts" />
(function (TSF) {
    var UI;
    (function (UI) {
        /**
         * Class that represents a checkbox and on as check change events etc.  Also implements the ability to do indeterminate checkboxes
         */
        var Checkbox = /** @class */ (function (_super) {
            __extends(Checkbox, _super);
            /**
             * A Checkbox control that can be used in the html markup or just constructed plainly in javacsript
             * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
             * @param logicalParent - the logical parent entity such as a controller.  Used internally.
             */
            function Checkbox(ele, logicalParent) {
                var _this = _super.call(this, ele, logicalParent) || this;
                /** sets if the checkbox should be allowed to be in an indeterminate state*/
                _this.indeterminate = false;
                _this.indetermRegistered = false;
                /** keeps track of if the checkbox has been checked yet */
                _this.beenChecked = false;
                if (ele === undefined) {
                    _this.checkEmptyEle('input');
                    _this.element.setAttribute('type', 'checkbox');
                }
                _this.loadConfiguration('args', 'indeterminate');
                _this.convertToBoolean('indeterminate', false);
                _this.OnCheckedChanged.add(_this.handleCheckedChanged, _this);
                var changeEvent = _this.jElement.attr('onchange');
                if (changeEvent !== null && changeEvent !== undefined) {
                    _this.OnCheckedChanged.add(function (sender, checked, args) { eval(changeEvent); }, (logicalParent === undefined) ? _this : logicalParent);
                }
                return _this;
            }
            Object.defineProperty(Checkbox.prototype, "Indeterminate", {
                get: function () {
                    return this.indeterminate;
                },
                set: function (val) {
                    this.indeterminate = val;
                    if (val === true && !this.element.hasAttribute("checked") && !this.beenChecked) {
                        this.element.indeterminate = true;
                    }
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(Checkbox.prototype, "Checked", {
                /** determines if the checkbox is checked */
                get: function () {
                    if (this.indeterminate === true && this.beenChecked === false && !this.element.hasAttribute("checked"))
                        return undefined;
                    else
                        return this.element.checked;
                },
                /** sets the the checked value on the checkbox */
                set: function (val) {
                    this.beenChecked = true;
                    this.element.checked = val;
                    if (val !== undefined)
                        this.element.indeterminate = false;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(Checkbox.prototype, "OnCheckedChanged", {
                get: function () {
                    var _this = this;
                    if (this.onCheckedChanged === undefined) {
                        this.onCheckedChanged = new TSF.Events.CheckedChangedEvent();
                        this.element.onchange = function () { return _this.onCheckedChanged.fire(_this, _this.args); };
                    }
                    return this.onCheckedChanged;
                },
                enumerable: false,
                configurable: true
            });
            Checkbox.prototype.handleCheckedChanged = function (sender, checked, args) {
                this.beenChecked = true;
            };
            return Checkbox;
        }(UI.TSControl));
        UI.Checkbox = Checkbox;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
var TSF;
(function (TSF) {
    var UI;
    (function (UI) {
        var ColumnType;
        (function (ColumnType) {
            ColumnType[ColumnType["String"] = 0] = "String";
            ColumnType[ColumnType["Boolean"] = 1] = "Boolean";
            ColumnType[ColumnType["DateTime"] = 2] = "DateTime";
            ColumnType[ColumnType["Integer"] = 3] = "Integer";
            ColumnType[ColumnType["Float"] = 4] = "Float";
        })(ColumnType = UI.ColumnType || (UI.ColumnType = {}));
        /**
         *  Used to specify columns for the wunder grid.
         */
        var Column = /** @class */ (function () {
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
            function Column(dataField, displayField, dataType) {
                /** Data type of the column.  Only important if you are using a DateTime or you are allowing editing to your grid.
                The date format is applied if it is a date time.  During editing booleans are given checkboxes and values are validated
                Against their respective data type before being accepted */
                this.dataType = ColumnType.String;
                this.dataField = dataField;
                if (!displayField)
                    this.displayText = dataField;
                else
                    this.displayText = displayField;
                this.dataType = dataType;
            }
            return Column;
        }());
        UI.Column = Column;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
/// <reference path=".\TSControl.ts" />
var TSF;
/// <reference path=".\TSControl.ts" />
(function (TSF) {
    var UI;
    (function (UI) {
        /**
      * Drop down control
      */
        var DropDown = /** @class */ (function (_super) {
            __extends(DropDown, _super);
            /**
             * Drop down control
             * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
             * @param logicalParent - the logical parent entity such as a controller.  Used internally.
             */
            function DropDown(ele, logicalParent) {
                var _this = _super.call(this, ele, logicalParent) || this;
                /** Event fired when the selected item list has changed */
                _this.onSelectionChanged = new TSF.Events.GenericEvent();
                /** list of drop down items in the control */
                _this.items = [];
                /** the data source for the control */
                _this.dataSource = undefined;
                _this.checkEmptyEle('select');
                _this.loadConfiguration('dataSource', 'TextKey', 'ValueKey');
                var onchanged = _this.jElement.attr('onchange');
                if (onchanged !== null && onchanged !== undefined) {
                    _this.OnSelectionChanged.add(function (sender, args) { eval(onchanged); }, (logicalParent === undefined) ? _this : logicalParent);
                }
                if (_this.TextKey === undefined) {
                    _this.TextKey = "text";
                }
                if (_this.ValueKey === undefined) {
                    _this.ValueKey = "value";
                }
                if (_this.dataSource)
                    _this.DataSource = _this.getRelativePath(_this.dataSource);
                var initialData = null;
                if ($("option", _this.jElement).length > 0) {
                    initialData = new Array();
                    var extractItemData = function (index, elem) {
                        var item = new Object();
                        item[_this.TextKey] = $(elem).text();
                        item[_this.ValueKey] = $(elem).val();
                        initialData.push(item);
                    };
                    $("option", _this.jElement).each(extractItemData);
                }
                _this.jElement.empty();
                var me = _this;
                _this.element.onchange = function () { return _this.changeIndex(); };
                if (initialData !== null) {
                    _this.bind(initialData);
                }
                return _this;
            }
            Object.defineProperty(DropDown.prototype, "SelectedIndex", {
                /** Selected index of the drop down -1 if none */
                get: function () {
                    return this.element.selectedIndex;
                },
                set: function (val) {
                    this.element.selectedIndex = val;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(DropDown.prototype, "OnSelectionChanged", {
                /** The on OnSelection Changed event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
                get: function () {
                    return this.onSelectionChanged;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(DropDown.prototype, "Items", {
                /** gets the items in the drop down*/
                get: function () {
                    return this.items;
                },
                /** Sets the items on the drop down */
                set: function (val) {
                    this.emptyContent();
                    if (val) {
                        var len = val.length;
                        for (var i = 0; i < len; i++) {
                            var item = val[i];
                            this.Append(item);
                        }
                    }
                    this.items = val;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(DropDown.prototype, "SelectedItem", {
                /** gets the selected dropdownitems of the control */
                get: function () {
                    return this.items[this.SelectedIndex];
                },
                /** sets the selected dropdownitems of the control.  This does change the UI Selection */
                set: function (val) {
                    val.element.selected = true;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(DropDown.prototype, "SelectedValue", {
                /** gets the selected value of the control */
                get: function () {
                    if (this.SelectedIndex !== -1)
                        return this.items[this.SelectedIndex].data;
                    else
                        return undefined;
                },
                /** sets the list of the selected value of the control.  This does change the UI Selection */
                set: function (value) {
                    if (value === undefined) {
                        this.SelectedIndex = -1;
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
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(DropDown.prototype, "DataSource", {
                /** Gets the data source of the object */
                get: function () {
                    return this.dataSource;
                },
                /** Sets te data source for the object */
                set: function (value) {
                    if (this.dataSource !== undefined && this.dataSource !== null && typeof this.dataSource !== 'string') {
                        this.dataSource.onDataUpdated.remove(this.bind, this);
                    }
                    this.dataSource = value;
                    if (this.dataSource != null) {
                        this.dataSource.onDataUpdated.add(this.bind, this);
                    }
                },
                enumerable: false,
                configurable: true
            });
            /**
     * Binds the data to the control given the TextKey and ValueKey to map the data
     * @param data - data to bind to the control
     */
            DropDown.prototype.bind = function (data) {
                this.jElement.empty();
                for (var i = 0; i < data.length; i++) {
                    var dat = data[i];
                    var item;
                    if (typeof dat == 'string')
                        item = new UI.DropDownItem(dat, dat);
                    else {
                        if (this.ValueKey === 'valueOf')
                            item = new UI.DropDownItem(dat[this.TextKey], dat);
                        else
                            item = new UI.DropDownItem(dat[this.TextKey], dat[this.ValueKey]);
                    }
                    this.items.push(item);
                    item.index = i;
                    item.jElement.attr('idx', i);
                    var me = this;
                    this.Append(item);
                }
                this.SelectedIndex = -1;
            };
            /**
     * Gets underlying data to the drop down items if there is any.
     */
            DropDown.prototype.getData = function () {
                return this.items.map(function (d) { return d.data; });
            };
            /**
            * Handeles selection change.  Internal.
            */
            DropDown.prototype.changeIndex = function () {
                if (this.items && this.items.length > 0)
                    this.onSelectionChanged.fire(this, this.items[this.SelectedIndex]);
            };
            return DropDown;
        }(UI.TSControl));
        UI.DropDown = DropDown;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
/// <reference path=".\TSControl.ts" />
var TSF;
/// <reference path=".\TSControl.ts" />
(function (TSF) {
    var UI;
    (function (UI) {
        /**
             * Drop down item used in the drop down control which contains display and selected data info.
             */
        var DropDownItem = /** @class */ (function (_super) {
            __extends(DropDownItem, _super);
            function DropDownItem(text, value, element) {
                var _this = _super.call(this, element) || this;
                _this.checkEmptyEle('option');
                if (value !== undefined && value != null)
                    _this.jElement.val(value.toString());
                _this.Text = text;
                _this.data = value;
                return _this;
            }
            return DropDownItem;
        }(UI.TSControl));
        UI.DropDownItem = DropDownItem;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
/// <reference path=".\TSControl.ts" />
var TSF;
/// <reference path=".\TSControl.ts" />
(function (TSF) {
    var UI;
    (function (UI) {
        /**
         *  An image control for displaying images on a page
         */
        var Image = /** @class */ (function (_super) {
            __extends(Image, _super);
            /**
             * A Image control that can be used in the html markup or just constructed plainly in javacsript
             * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
             * @param logicalParent - the logical parent entity such as a controller.  Used internally.
             */
            function Image(ele, logicalParent) {
                var _this = _super.call(this, ele, logicalParent) || this;
                if (ele === undefined) {
                    _this.checkEmptyEle('img');
                }
                return _this;
            }
            Object.defineProperty(Image.prototype, "Src", {
                get: function () {
                    return this.jElement.attr("src");
                },
                /** url source for the image */
                set: function (value) {
                    if (value === null || value === undefined)
                        value = "";
                    this.jElement.attr("src", value);
                },
                enumerable: false,
                configurable: true
            });
            return Image;
        }(UI.TSControl));
        UI.Image = Image;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
/// <reference path=".\TSControl.ts" />
var TSF;
/// <reference path=".\TSControl.ts" />
(function (TSF) {
    var UI;
    (function (UI) {
        /**
      * Drop down control
      */
        var MultiSelect = /** @class */ (function (_super) {
            __extends(MultiSelect, _super);
            /**
             * Drop down control
             * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
             * @param logicalParent - the logical parent entity such as a controller.  Used internally.
             */
            function MultiSelect(ele, logicalParent) {
                var _this = _super.call(this, ele, logicalParent) || this;
                /** list of selected indicies */
                _this.selectedIndicies = [];
                /** Event fired when the selected item list has changed */
                _this.onSelectionChanged = new TSF.Events.GenericEvent();
                /** internal use only for not firing extra events */
                _this.updatingSelected = false;
                /** list of drop down items in the control */
                _this.items = [];
                /** the data source for the control */
                _this.dataSource = undefined;
                if (_this.Attributes['multiple'] === undefined)
                    _this.element.setAttribute('multiple', '');
                _this.checkEmptyEle('select');
                _this.loadConfiguration('dataSource', 'TextKey', 'ValueKey');
                var onchanged = _this.jElement.attr('onchange');
                if (onchanged !== null && onchanged !== undefined) {
                    _this.OnSelectionChanged.add(function (sender, args) { eval(onchanged); }, (logicalParent === undefined) ? _this : logicalParent);
                }
                if (_this.TextKey === undefined) {
                    _this.TextKey = "text";
                }
                if (_this.ValueKey === undefined) {
                    _this.ValueKey = "value";
                }
                if (_this.dataSource)
                    _this.DataSource = _this.getRelativePath(_this.dataSource);
                var initialData = null;
                var i = 0;
                if ($("option", _this.jElement).length > 0) {
                    initialData = new Array();
                    var extractItemData = function (index, elem) {
                        var ele = $(elem);
                        var item = new UI.DropDownItem(ele.text(), ele.val(), elem);
                        _this.items.push(item);
                        if (elem.selected)
                            _this.selectedIndicies.push(i);
                        item.index = i;
                        item.jElement.attr('idx', i);
                        i++;
                    };
                    $("option", _this.jElement).each(extractItemData);
                }
                var me = _this;
                _this.element.onchange = function () { return _this.changeSelection(); };
                return _this;
            }
            Object.defineProperty(MultiSelect.prototype, "OnSelectionChanged", {
                /** The on OnSelection Changed event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
                get: function () {
                    return this.onSelectionChanged;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(MultiSelect.prototype, "SelectedValues", {
                /** gets the list of selected values of the control */
                get: function () {
                    var items = this.SelectedItems;
                    return items.map(function (x) { return x.data; });
                },
                /** sets the list of selected values of the control.  This does change the UI Selection */
                set: function (value) {
                    this.updatingSelected = true;
                    this.selectedIndicies = [];
                    if (value !== undefined && this.items !== undefined && this.items !== null) {
                        var length = this.items.length;
                        for (var i = 0; i < length; i++) {
                            var item = this.items[i];
                            var len = value.length;
                            var found = false;
                            for (var j = 0; j < len; j++) {
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
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(MultiSelect.prototype, "Items", {
                /** gets the items in the drop down*/
                get: function () {
                    return this.items;
                },
                /** Sets the items on the drop down */
                set: function (val) {
                    this.selectedIndicies = [];
                    this.emptyContent();
                    if (val) {
                        var len = val.length;
                        for (var i = 0; i < len; i++) {
                            var item = val[i];
                            this.Append(item);
                            if (item.element.selected)
                                this.selectedIndicies.push(i);
                        }
                    }
                    this.items = val;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(MultiSelect.prototype, "SelectedItems", {
                /** gets the selected dropdownitems of the control */
                get: function () {
                    var _this = this;
                    return this.selectedIndicies.map(function (x) { return _this.items[x]; });
                },
                /** sets the selected dropdownitems of the control.  This does change the UI Selection */
                set: function (val) {
                    this.updatingSelected = true;
                    this.selectedIndicies = [];
                    this.element.selectedIndex = -1;
                    if (val) {
                        var length = val.length;
                        for (var i = 0; i < length; i++) {
                            var item = val[i];
                            item.element.selected = true;
                            this.selectedIndicies.push(item.element.index);
                        }
                    }
                    this.selectedIndicies.sort();
                    this.updatingSelected = false;
                    this.onSelectionChanged.fire(this, val);
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(MultiSelect.prototype, "DataSource", {
                /** Gets the data source of the object */
                get: function () {
                    return this.dataSource;
                },
                /** Sets te data source for the object */
                set: function (value) {
                    if (this.dataSource !== undefined && this.dataSource !== null && typeof this.dataSource !== 'string') {
                        this.dataSource.onDataUpdated.remove(this.bind, this);
                    }
                    this.dataSource = value;
                    if (this.dataSource != null) {
                        this.dataSource.onDataUpdated.add(this.bind, this);
                    }
                },
                enumerable: false,
                configurable: true
            });
            /**
             * Binds the data to the control given the TextKey and ValueKey to map the data
             * @param data - data to bind to the control
             */
            MultiSelect.prototype.bind = function (data) {
                this.items = [];
                this.jElement.empty();
                for (var i = 0; i < data.length; i++) {
                    var dat = data[i];
                    var item;
                    if (typeof dat == 'string')
                        item = new UI.DropDownItem(dat, dat);
                    else {
                        if (this.ValueKey === 'valueOf')
                            item = new UI.DropDownItem(dat[this.TextKey], dat);
                        else
                            item = new UI.DropDownItem(dat[this.TextKey], dat[this.ValueKey]);
                    }
                    this.items.push(item);
                    item.index = i;
                    item.jElement.attr('idx', i);
                    var me = this;
                    this.Append(item);
                }
                this.element.selectedIndex = -1;
            };
            /**
             * Gets underlying data to the drop down items if there is any.
             */
            MultiSelect.prototype.getData = function () {
                return this.items.map(function (d) { return d.data; });
            };
            /**
             * Handeles selection change.  Internal.
             */
            MultiSelect.prototype.changeSelection = function () {
                if (!this.updatingSelected) {
                    this.selectedIndicies = this.getSelectedIndicies();
                    this.OnSelectionChanged.fire(this, this.SelectedItems);
                }
            };
            /**
             * gets the selected indexes internal
             */
            MultiSelect.prototype.getSelectedIndicies = function () {
                if (this.element.selectedOptions === undefined)
                    return this.getSelectedDropDownsIE();
                var selected = this.element.selectedOptions;
                var len = selected.length;
                var selectedIndicies = [];
                for (var i = 0; i < len; i++) {
                    selectedIndicies.push(selected[i].index);
                }
                return selectedIndicies;
            };
            /**
             * handles gets indexes in a different way for ie because it doesn't support selectedOptions
             */
            MultiSelect.prototype.getSelectedDropDownsIE = function () {
                var len = this.items.length;
                var indicies = [];
                for (var i = 0; i < len; i++) {
                    if (this.items[0].element.selected)
                        indicies.push(i);
                }
                return indicies;
            };
            return MultiSelect;
        }(UI.TSControl));
        UI.MultiSelect = MultiSelect;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
/// <reference path=".\TSControl.ts" />
var TSF;
/// <reference path=".\TSControl.ts" />
(function (TSF) {
    var UI;
    (function (UI) {
        /**
         * Radio button control
         */
        var RadioButton = /** @class */ (function (_super) {
            __extends(RadioButton, _super);
            /**
             * A RadioButton control that can be used in the html markup or just constructed plainly in javacsript
             * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
             * @param logicalParent - the logical parent entity such as a controller.  Used internally.
             */
            function RadioButton(ele, logicalParent) {
                var _this = _super.call(this, ele, logicalParent) || this;
                if (ele === undefined) {
                    _this.checkEmptyEle('input');
                }
                _this.element.setAttribute('type', 'radio');
                _this.element.TSControl = _this;
                return _this;
            }
            Object.defineProperty(RadioButton.prototype, "Value", {
                get: function () {
                    if (this.value)
                        return this.value;
                    else
                        return this.element.value;
                },
                /** Value for the radio button.  If set this way it can be an object as well as a string */
                set: function (val) {
                    this.value = val;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(RadioButton.prototype, "OnSelectionChanged", {
                /** The on change event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
                get: function () {
                    var _this = this;
                    if (!this.onSelectionChanged) {
                        this.onSelectionChanged = new TSF.Events.UIEvent();
                        this.element.onchange = function () { return _this.onSelectionChanged.fire(_this, _this.args); };
                    }
                    return this.onSelectionChanged;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(RadioButton.prototype, "SelectedValue", {
                /** Gets or Sets the selected value for the group of radio buttons */
                get: function () {
                    var selectedItem = this.SelectedItem;
                    if (selectedItem === undefined)
                        return undefined;
                    if (selectedItem.Value !== undefined)
                        return selectedItem.Value;
                },
                /** Gets the selected value of the radio button group */
                set: function (val) {
                    var ctrls = document.getElementsByName(this.Name);
                    var len = ctrls.length;
                    for (var i = 0; i < len; i++) {
                        var ctrl = ctrls[i];
                        if (ctrl.TSControl !== undefined) {
                            var tsCtrl = ctrl.TSControl;
                            if (tsCtrl.Value === val) {
                                tsCtrl.Checked = true;
                            }
                        }
                        else if (ctrl.value === val) {
                            ctrl.checked = true;
                        }
                    }
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(RadioButton.prototype, "Checked", {
                /**returns true if the control is selected */
                get: function () {
                    return this.element.checked;
                },
                /**selects the specific control */
                set: function (val) {
                    this.element.checked = val;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(RadioButton.prototype, "Name", {
                /** name (group) of the radio button */
                get: function () {
                    return this.element.name;
                },
                set: function (val) {
                    this.element.name = val;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(RadioButton.prototype, "SelectedItem", {
                /** returns the ts control if one exists for the selected item otherwise just the html element */
                get: function () {
                    var ctrls = document.getElementsByName(this.Name);
                    var len = ctrls.length;
                    for (var i = 0; i < len; i++) {
                        var ctrl = ctrls[i];
                        if (ctrl.checked) {
                            if (ctrl.TSControl !== undefined)
                                return ctrl.TSControl;
                            else
                                return ctrl;
                        }
                    }
                    return undefined;
                },
                enumerable: false,
                configurable: true
            });
            return RadioButton;
        }(UI.TSControl));
        UI.RadioButton = RadioButton;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
/// <reference path=".\TSControl.ts" />
var TSF;
/// <reference path=".\TSControl.ts" />
(function (TSF) {
    var UI;
    (function (UI) {
        /**
         * Class that represents a Textbox.
         */
        var TextBox = /** @class */ (function (_super) {
            __extends(TextBox, _super);
            /**
             * A TextBox control that can be used in the html markup or just constructed plainly in javacsript
             * @param ele - the id or html element to bind the control to or undefined if its not tied to an html object
             * @param logicalParent - the logical parent entity such as a controller.  Used internally.
             */
            function TextBox(ele, logicalParent) {
                var _this = _super.call(this, ele, logicalParent) || this;
                if (ele === undefined) {
                    _this.checkEmptyEle('input');
                }
                _this.element.setAttribute('type', 'text');
                var onchanged = _this.jElement.attr('onchange');
                if (onchanged !== null && onchanged !== undefined) {
                    _this.OnTextChange.add(function (sender, args) { eval(onchanged); }, (logicalParent === undefined) ? _this : logicalParent);
                }
                return _this;
            }
            Object.defineProperty(TextBox.prototype, "OnTextChange", {
                /** The on text change event for the html element.  Allows keeping the this of the method correct as well as the ability to add context*/
                get: function () {
                    var _this = this;
                    if (!this.onTextChange) {
                        this.onTextChange = new TSF.Events.UIEvent();
                        this.element.onchange = function () { return _this.onTextChange.fire(_this, _this.args); };
                    }
                    return this.onTextChange;
                },
                enumerable: false,
                configurable: true
            });
            return TextBox;
        }(UI.TSControl));
        UI.TextBox = TextBox;
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
/// <reference path="..\TSControl.ts" />
/// <reference path="..\TSControl.ts" />
/// <reference path="..\TSControl.ts" />
var TSF;
/// <reference path="..\TSControl.ts" />
(function (TSF) {
    var UI;
    (function (UI) {
        var Grid;
        (function (Grid) {
            /**
             * Used to resize grid columns in the wunder grid
             */
            var Resizer = /** @class */ (function (_super) {
                __extends(Resizer, _super);
                /**
                 * Used to resize grid columns in the wunder grid
                 * @param element - element to use as the resizer
                 * @param grid - the grid being resized
                 * @param cell - header cell to be resized
                 * @param width
                 */
                function Resizer(element, grid, cell, left, width, index) {
                    var _this = _super.call(this, element) || this;
                    _this.index = index;
                    _this.grid = grid;
                    _this.headerCell = cell;
                    _this.width = width;
                    var me = _this;
                    var style = _this.Style;
                    style.cursor = 'col-resize';
                    _this.left = left;
                    //if (float === 'left')
                    //    style.margin = '0px 0px 0px -2px';
                    //else
                    //    style.margin = '0px -2px 0px 0px';
                    _this.Style.position = 'absolute';
                    cell.Style.position = 'relative';
                    _this.rePosition();
                    _this.Style.top = '0px';
                    style.width = width + 'px';
                    style.height = '100%';
                    style.display = 'inline-block';
                    //style.cssFloat = float;
                    _this.jElement.mouseup(function () { return _this.grid.context.selectedResizer = undefined; });
                    _this.jElement.mousedown(function (event) {
                        me.mouseDown(event);
                    });
                    _this.OnDoubleClick.add(_this.doubleClick, _this);
                    return _this;
                }
                Resizer.prototype.rePosition = function () {
                    var _this = this;
                    var padding = 0;
                    setTimeout(function () {
                        if (_this.headerCell.element.style.paddingRight)
                            padding = parseInt(_this.headerCell.element.style.paddingRight);
                        if (!_this.left)
                            _this.Style.left = (_this.headerCell.element.clientWidth - (_this.width - 1) - padding) + 'px';
                        else
                            _this.Style.left = '-1px';
                    }, 18);
                };
                /**
                 *  handles a double click on a column sizer
                 * @param sender - sizer
                 * @param args - none
                 */
                Resizer.prototype.doubleClick = function (sender, args) {
                    var maxWidth = 0;
                    var nodes = this.headerCell.element.childNodes;
                    var len = nodes.length;
                    var backupStyle = this.headerCell.Style.whiteSpace;
                    if (!backupStyle)
                        backupStyle = 'normal';
                    this.headerCell.Style.whiteSpace = 'pre';
                    var headWidth = parseInt(this.headerCell.Style.width.replace('px', ''));
                    var cellPadding = parseInt(this.headerCell.jElement.css('padding-left').replace('px', '')) + parseInt(this.headerCell.jElement.css('padding-right').replace('px', ''));
                    for (var i = 0; i < len; i++) {
                        maxWidth += nodes[i].offsetWidth;
                    }
                    maxWidth += cellPadding;
                    this.headerCell.Style.whiteSpace = backupStyle;
                    len = this.grid.Rows.length;
                    for (var i = 0; i < len; i++) {
                        var cell = this.grid.Rows[i].cells[this.index];
                        var nodes_1 = cell.element.childNodes;
                        var cellLen = cell.element.childNodes.length;
                        var width = 0;
                        var backupStyle_1 = cell.Style.whiteSpace;
                        if (!backupStyle_1)
                            backupStyle_1 = 'normal';
                        cell.Style.whiteSpace = 'pre';
                        for (var j = 0; j < cellLen; j++) {
                            width += nodes_1[j].offsetWidth;
                        }
                        width += cellPadding;
                        cell.Style.whiteSpace = backupStyle_1;
                        if (width > maxWidth)
                            maxWidth = width;
                    }
                    this.headerCell.Style.width = maxWidth + 'px';
                    var gridWidth = parseInt(this.grid.Style.width.replace('px', ''));
                    this.grid.Style.width = (gridWidth + (maxWidth - headWidth)) + 'px';
                    this.rePosition();
                    if (this.prevResizer)
                        this.prevResizer.rePosition();
                };
                /**
                 * handles mouse down on the control to start the resizing process
                 * @param event
                 */
                Resizer.prototype.mouseDown = function (event) {
                    this.grid.context.selectedResizer = this;
                    this.currentColumnWidth = parseInt(this.headerCell.Style.width.replace('px', ''));
                    this.currentGridWidth = parseInt(this.grid.Style.width.replace('px', ''));
                    this.currentMousePageX = event.pageX;
                    this.grid.context.selectedColumn = this;
                    this.currentClientWidth = this.headerCell.element.clientWidth;
                    if (this.left && this.prevResizer)
                        this.currentResizerLeft = parseFloat(this.prevResizer.Style.left.replace('px', ''));
                    else
                        this.currentResizerLeft = parseFloat(this.Style.left.replace('px', ''));
                };
                /**
                 * Handles mouse move events while a column is being resized
                 * @param event
                 */
                Resizer.prototype.onMouseMove = function (event) {
                    var width = this.width;
                    var diff = event.pageX - this.currentMousePageX;
                    var gridStyle = this.grid.Style;
                    var cellStyle = this.headerCell.Style;
                    var backup = cellStyle.width;
                    var clientWidth = this.headerCell.element.clientWidth;
                    //let gridWidth: any = gridStyle.width.replace('px', '');
                    cellStyle.width = (this.currentColumnWidth + diff) + 'px';
                    if (clientWidth === this.headerCell.element.clientWidth)
                        cellStyle.width = backup;
                    else {
                        gridStyle.width = (this.currentGridWidth + diff) + 'px';
                        if (this.left) {
                            if (this.prevResizer)
                                this.prevResizer.Style.left = (this.currentResizerLeft + this.headerCell.element.clientWidth - this.currentClientWidth) + 'px';
                        }
                        else
                            this.Style.left = (this.currentResizerLeft + this.headerCell.element.clientWidth - this.currentClientWidth) + 'px';
                    }
                    if (window.getSelection) {
                        if (window.getSelection().empty) { // Chrome
                            window.getSelection().empty();
                        }
                        else if (window.getSelection().removeAllRanges) { // Firefox
                            window.getSelection().removeAllRanges();
                        }
                    }
                    else if (document.selection) { // IE?
                        document.selection.empty();
                    }
                };
                return Resizer;
            }(UI.TSControl));
            Grid.Resizer = Resizer;
        })(Grid = UI.Grid || (UI.Grid = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
/// <reference path="..\TSControl.ts" />
var TSF;
/// <reference path="..\TSControl.ts" />
(function (TSF) {
    var UI;
    (function (UI) {
        var Grid;
        (function (Grid) {
            /**
             * Object that represents a cell in the wundergrid.  Has a reference to the underlying cell
             */
            var WunderCell = /** @class */ (function (_super) {
                __extends(WunderCell, _super);
                function WunderCell(ele, logicalParent) {
                    var _this = _super.call(this, ele, logicalParent) || this;
                    _this.checkEmptyEle('td');
                    _this.textElement = new UI.TSControl(document.createElement('span'));
                    _this.Append(_this.textElement);
                    return _this;
                }
                Object.defineProperty(WunderCell.prototype, "Text", {
                    get: function () {
                        return this.textElement.Text;
                    },
                    set: function (val) {
                        this.textElement.Text = val;
                    },
                    enumerable: false,
                    configurable: true
                });
                return WunderCell;
            }(UI.TSControl));
            Grid.WunderCell = WunderCell;
        })(Grid = UI.Grid || (UI.Grid = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
/// <reference path="..\Column.ts" />
var TSF;
/// <reference path="..\Column.ts" />
(function (TSF) {
    var UI;
    (function (UI) {
        var Grid;
        (function (Grid) {
            /**
             *  Used to specify columns for the wunder grid.
             */
            var WunderColumn = /** @class */ (function (_super) {
                __extends(WunderColumn, _super);
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
                function WunderColumn(dataField, displayText, dataType, width, dateFormat, editable, customCell, customEditCell, customHeader) {
                    var _this = _super.call(this, dataField, displayText, dataType) || this;
                    /** determines if the particular column is editable.  Default = true */
                    _this.editable = true;
                    /** reference http://blog.stevenlevithan.com/archives/date-time-format for more information */
                    _this.dateFormat = '';
                    _this.editable = editable;
                    _this.dateFormat = dateFormat;
                    _this.customCell = customCell;
                    _this.customHeader = customHeader;
                    _this.customEditCell = customEditCell;
                    _this.width = width;
                    return _this;
                }
                return WunderColumn;
            }(UI.Column));
            Grid.WunderColumn = WunderColumn;
        })(Grid = UI.Grid || (UI.Grid = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
/// <reference path="..\TSControl.ts" />
var TSF;
/// <reference path="..\TSControl.ts" />
(function (TSF) {
    var UI;
    (function (UI) {
        var Grid;
        (function (Grid) {
            /**
             * Object that represents a cell in the wundergrid.  Has a reference to the underlying cell
             */
            var WunderColumnHeader = /** @class */ (function (_super) {
                __extends(WunderColumnHeader, _super);
                function WunderColumnHeader(ele, logicalParent) {
                    var _this = _super.call(this, ele, logicalParent) || this;
                    _this.checkEmptyEle('th');
                    return _this;
                }
                return WunderColumnHeader;
            }(UI.TSControl));
            Grid.WunderColumnHeader = WunderColumnHeader;
        })(Grid = UI.Grid || (UI.Grid = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
/// <reference path="..\TSControl.ts" />
var TSF;
/// <reference path="..\TSControl.ts" />
(function (TSF) {
    var UI;
    (function (UI) {
        var Grid;
        (function (Grid) {
            /** Possible types of selection methods for the grid.  */
            var SelectionType;
            (function (SelectionType) {
                SelectionType[SelectionType["NONE"] = 0] = "NONE";
                SelectionType[SelectionType["SINGLE"] = 1] = "SINGLE";
                SelectionType[SelectionType["MULTI"] = 2] = "MULTI";
            })(SelectionType = Grid.SelectionType || (Grid.SelectionType = {}));
            /**
             * Grid view used to display data in a grid format.  Includes functionality for sorting, column resizing,
             * selection, multi selection, ability to be hooked up to a pager or filter.
             */
            var WunderGrid = /** @class */ (function (_super) {
                __extends(WunderGrid, _super);
                /**
                 * A grid control used for displaying table data
                 * @param ele - the html element to use for the control
                 * @param logicalParent - the logical parent entity such as a controller.  Used internally.
                 */
                function WunderGrid(ele, logicalParent) {
                    var _this = _super.call(this, ele, logicalParent) || this;
                    /** internal used to determine when to fire certain events */
                    _this.updating = false;
                    /** determines if the columns have been changed since the last time they were drawn */
                    _this.columnsChanged = false;
                    /** table header used when constructing the table */
                    _this.tBody = new UI.TSControl(document.createElement('tbody'));
                    /** table body used when constructing the table */
                    _this.tHead = new UI.TSControl(document.createElement('thead'));
                    _this.headerRow = new UI.TSControl(document.createElement('tr'));
                    /** Enables client paging of the data on the grid */
                    _this.paging = false;
                    /** Page size for client paging */
                    _this.pageSize = 10;
                    /** internal data reference to manipulating data set on the client side */
                    _this.filteredData = [];
                    /** local selected rows attribute */
                    _this.selectedRows = [];
                    /** if the grid is in editing mode */
                    _this.editing = false;
                    /** used to alert the pager when the page has changed */
                    _this.onPageChange = new TSF.Data.PageChangeEvent();
                    _this.onSortChanged = new TSF.Events.ValueEvent();
                    /* Gets fired on the creation of every row.  Usefull for visual formatting of the rows */
                    _this.onRowCreated = new TSF.Events.ValueEvent();
                    _this.columnHeaders = [];
                    /** columns to display in the grid */
                    _this.columns = [];
                    /** auto generates the columns based on the objects used as input if set to true */
                    _this.autoGenerateColumns = true;
                    /* the rows of the grid */
                    _this.rows = [];
                    /*********************************************************************************************************************************************************************/
                    /* Region resizable columns */
                    /*********************************************************************************************************************************************************************/
                    _this.eventsRegistered = false;
                    if (ele === undefined)
                        _this.checkEmptyEle('table');
                    _this.Append(_this.tHead);
                    _this.tHead.Append(_this.headerRow);
                    _this.loadConfiguration('selection', 'dataSource', 'state', 'selectedRowClass', 'clientPaging', 'pageSize', 'ColumnsResizable', 'enableSorting', 'sortTarget');
                    _this.convertToInteger('pageSize', 10);
                    _this.convertToBoolean('clientPaging', false);
                    _this.convertToBoolean('ColumnsResizable', false);
                    _this.convertToBoolean('enableSorting', undefined);
                    if (_this.sortTarget) {
                        _this.SortTarget = _this.getRelativePath(_this.sortTarget);
                    }
                    if (_this.dataSource) {
                        var ds = _this.dataSource;
                        _this.dataSource = undefined;
                        _this.DataSource = _this.getRelativePath(ds);
                    }
                    if (_this.selection)
                        _this.selection = SelectionType[_this.selection.toUpperCase()];
                    if (_this.state)
                        _this.state = eval(_this.state);
                    else
                        _this.state = new UI.States.SelectableState();
                    _this.state.$observe(_this, function (state) { return _this.selectRowByData(state.selectedData); }, 'selectedData');
                    _this.state.$observe(_this, function (state) { return _this.refresh(); }, 'data');
                    return _this;
                }
                Object.defineProperty(WunderGrid.prototype, "OnSelectionChanged", {
                    /** Fired when the selected row(s) change*/
                    get: function () {
                        if (!this.onSelectionChanged)
                            this.onSelectionChanged = new TSF.Events.GenericEvent();
                        return this.onSelectionChanged;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(WunderGrid.prototype, "SelectedValues", {
                    get: function () {
                        return this.state.selectedData;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(WunderGrid.prototype, "SortTarget", {
                    get: function () {
                        if (!this.sortTarget)
                            return this;
                        else
                            return this.sortTarget;
                    },
                    /** used if you want the sorting to apply to a data source or another ISortable object  instead of the local data in the grid */
                    set: function (val) {
                        this.sortTarget = val;
                        if (this.enableSorting === undefined)
                            this.enableSorting = true;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(WunderGrid.prototype, "EnableSorting", {
                    get: function () {
                        if (this.enableSorting === undefined)
                            return false;
                        else
                            return this.enableSorting;
                    },
                    set: function (val) {
                        this.enableSorting = val;
                        if (this.filteredData)
                            this.createHeaderRow();
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(WunderGrid.prototype, "Editing", {
                    /** Returns true if the table is in editing mode */
                    get: function () {
                        return this.editing;
                    },
                    /** Set the table to editing mode or remove it from editing mode */
                    set: function (ed) {
                        this.editing = ed;
                        var count = this.rows.length;
                        for (var i = 0; i < count; i++) {
                            var row = this.rows[i];
                            row.Editing = ed;
                        }
                    },
                    enumerable: false,
                    configurable: true
                });
                /**
                 * Edits a specific row
                 * @param row -row to edit
                 */
                WunderGrid.prototype.EditRow = function (row) {
                    row.Editing = true;
                };
                /**
                 * Stops editing a specific row
                 * @param row - row to stop editing
                 */
                WunderGrid.prototype.FinishEditRow = function (row) {
                    row.Editing = false;
                };
                Object.defineProperty(WunderGrid.prototype, "DataSource", {
                    /** The datasource for the object */
                    get: function () {
                        return this.dataSource;
                    },
                    /** The datasource for the object */
                    set: function (dataSource) {
                        if (this.dataSource) {
                            this.dataSource.onStartUpdate.remove(this.onStartUpdate, this);
                            this.dataSource.onEndUpdate.remove(this.onEndUpdate, this);
                        }
                        this.dataSource = dataSource;
                        if (this.dataSource) {
                            this.dataSource.onStartUpdate.add(this.onStartUpdate, this);
                            this.dataSource.onEndUpdate.add(this.onEndUpdate, this);
                        }
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(WunderGrid.prototype, "Columns", {
                    /** columns to display in the grid The getter is always returns a list of WunderColumn*/
                    get: function () {
                        return this.columns;
                    },
                    /** columns to display in the grid */
                    set: function (columns) {
                        this.columnHash = {};
                        if (columns) {
                            this.autoGenerateColumns = false;
                            var len = columns.length;
                            for (var i = 0; i < len; i++) {
                                var col = columns[i];
                                if (typeof (col) == "string")
                                    col = columns[i] = new Grid.WunderColumn(col);
                                this.columnHash[col.dataField] = col;
                            }
                        }
                        this.columns = columns;
                        this.columnsChanged = true;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(WunderGrid.prototype, "AutoGenerateColumns", {
                    /** set wether or not to auto generate columns */
                    get: function () {
                        return this.autoGenerateColumns;
                    },
                    /** set wether or not to auto generate columns */
                    set: function (autoGenerateColumns) {
                        this.autoGenerateColumns = autoGenerateColumns;
                        this.columnsChanged = true;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(WunderGrid.prototype, "Data", {
                    /** gets the data the grid is using for display purposes */
                    get: function () {
                        return this.state.data;
                    },
                    /** sets the data on the grid.  Causes a refresh of the data on the grid*/
                    set: function (data) {
                        if (this.updating) {
                            this.state.$setAttributeWithoutEvent('data', data);
                            this.filteredData = data;
                        }
                        else {
                            this.state.$setAttributeWithoutEvent('data', data);
                            this.filteredData = data;
                            this.refresh();
                        }
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(WunderGrid.prototype, "SelectedRows", {
                    /** The selected rows of the grid */
                    get: function () {
                        return this.selectedRows;
                    },
                    /** The selected rows of the grid */
                    set: function (rows) {
                        if (!rows)
                            rows = [];
                        this.selectRows(rows);
                    },
                    enumerable: false,
                    configurable: true
                });
                /*  selects rows on the grid */
                WunderGrid.prototype.selectRows = function (rows) {
                    var selClass = this.selectedRowClass;
                    if (!selClass)
                        selClass = 'selected';
                    if (!rows)
                        rows = [];
                    var selectedRows = this.selectedRows;
                    var len = selectedRows.length;
                    for (var i = 0; i < len; i++) {
                        selectedRows[i].jElement.removeClass(selClass);
                    }
                    len = rows.length;
                    var data = [];
                    for (var i = 0; i < len; i++) {
                        var row = rows[i];
                        row.jElement.addClass(selClass);
                        data[i] = row.Data;
                    }
                    this.selectedRows = rows;
                    this.state.$setAttributeWithoutEvent('selectedData', data);
                    this.onSelectionChanged.fire(this, rows);
                };
                Object.defineProperty(WunderGrid.prototype, "Rows", {
                    /** The rows of the grid */
                    get: function () {
                        return this.rows;
                    },
                    /** The rows of the grid */
                    set: function (val) {
                        var len = val.length;
                        this.tBody.emptyContent();
                        for (var i = 0; i < len; i++) {
                            this.tBody.Append(val[i]);
                        }
                        this.rows = val;
                    },
                    enumerable: false,
                    configurable: true
                });
                /**
                 * Allows you to select a row by dynamic criteria provided by a method you pass in.  If the method returns true
                 * for a given data input the row is selected.
                 * @param filter - The method to determine if a row is selected
                 */
                WunderGrid.prototype.selectRowByCriteria = function (filter) {
                    var rows = this.rows.filter(filter);
                    this.selectRows(rows);
                };
                /**
                 * Selects a row when the attribute specified for the data of that row equals the value provided
                 * @param attribute - attribute to use in the comparison
                 * @param value - value to use in the comparison
                 */
                WunderGrid.prototype.selectRowByAttribute = function (attribute, value) {
                    var rows = this.rows.filter(function (x) { return x.Data[attribute] == value; });
                    this.selectRows(rows);
                };
                /**
                 * Finds the row with the data object provided and selects it
                 * @param data - the data you want selected
                 */
                WunderGrid.prototype.selectRowByData = function (data) {
                    var rows;
                    if (Array.isArray(data)) {
                        rows = [];
                        var len = this.rows.length;
                        for (var i = 0; i < len; i++) {
                            var dat = data[i];
                            var res = this.rows.filter(function (x) { return x.Data == dat; });
                            if (res.length > 0)
                                rows.push(res[0]);
                        }
                    }
                    else {
                        rows = new Array(1);
                        rows[0] = data;
                    }
                    this.selectRows(rows);
                };
                /**
                 *  used if the data changes from the state observable
                 */
                WunderGrid.prototype.refresh = function () {
                    this.updating = true;
                    if (this.criteria)
                        this.applyFilter(this.criteria, false);
                    if (this.sortBy)
                        this.applySorting(this.sortBy, false);
                    if (this.paging)
                        this.changePage(1);
                    else
                        this.createBody(this.filteredData);
                    this.updating = false;
                };
                /** Binds data to the grid.  Causes the grid to re-draw the data in the grid and if the columns have changed the columns are re-drawn */
                WunderGrid.prototype.bind = function (data) {
                    this.updating = true;
                    this.Data = data;
                    this.filteredData = data;
                    if (this.criteria)
                        this.applyFilter(this.criteria, false);
                    if (this.sortBy)
                        this.applySorting(this.sortBy, false);
                    if (this.paging)
                        this.changePage(1);
                    else
                        this.createBody(this.filteredData);
                    this.updating = false;
                };
                /**
                 *  creates the body of the table
                 * @param data - data to make the body with
                 */
                WunderGrid.prototype.createBody = function (data) {
                    var _this = this;
                    try {
                        this.element.removeChild(this.tBody.element);
                    }
                    catch (e) {
                    }
                    this.updating = true;
                    var dataLen = data.length;
                    this.tBody.emptyContent();
                    if (this.columnsChanged)
                        this.createHeaderRow();
                    this.rows = new Array(dataLen);
                    for (var i = 0; i < dataLen; i++) {
                        var row = new Grid.WunderRow();
                        row.grid = this;
                        row.columns = this.columns;
                        row.Editing = this.editing;
                        row.Data = data[i];
                        row.OnClick.add(function (row) { return _this.handleSelection(row); }, this);
                        this.rows[i] = row;
                        this.tBody.Append(row);
                        this.onRowCreated.fire(row);
                    }
                    this.Append(this.tBody);
                };
                /**
                 * The row to handle selection for (handler for on click)
                 * @param row
                 */
                WunderGrid.prototype.handleSelection = function (row) {
                    switch (this.selection) {
                        case SelectionType.NONE:
                            return;
                        case SelectionType.SINGLE:
                            this.selectRows([row]);
                            break;
                        case SelectionType.MULTI:
                            var newSelection = this.selectedRows.filter(function (x) { return x !== row; });
                            if (newSelection.length === this.selectedRows.length)
                                newSelection.push(row);
                            this.selectRows(newSelection);
                            break;
                    }
                };
                /**
                 * Creates the header rows in the grid
                 */
                WunderGrid.prototype.createHeaderRow = function () {
                    var _this = this;
                    try {
                        this.tHead.element.removeChild(this.headerRow.element);
                    }
                    catch (e) {
                    }
                    this.headerRow.emptyContent();
                    var headers = this.columnHeaders = [];
                    if (this.autoGenerateColumns && this.Data.length > 0) {
                        if (this.Data && this.Data.length > 0) {
                            this.columns = [];
                            var ele = this.Data[0];
                            for (var att in ele) {
                                if (ele.hasOwnProperty(att)) {
                                    this.columns.push(new Grid.WunderColumn(att));
                                }
                            }
                            this.columnsChanged = false;
                        }
                    }
                    var colLength = this.columns.length;
                    if (colLength > 0) {
                        for (var i = 0; i < colLength; i++) {
                            var col = this.columns[i];
                            if (col.customHeader) {
                                var header = col.customHeader.generateHeader(col, this);
                                headers[i] = header;
                                this.headerRow.Append(header);
                            }
                            else {
                                if (this.EnableSorting) {
                                    var sorter = new Grid.Extensions.SortableColumnHeader();
                                    var header = sorter.generateHeader(col, this.SortTarget);
                                    if (this.sortBy && this.sortBy.length > 0)
                                        sorter.sortChanged(this.sortBy);
                                    headers[i] = header;
                                    this.headerRow.Append(header);
                                }
                                else {
                                    var header = new Grid.WunderColumnHeader();
                                    var textEle = new UI.TSControl(document.createElement('span'));
                                    textEle.Text = col.displayText;
                                    header.Append(textEle);
                                    //header.Text = col.displayText;
                                    headers[i] = header;
                                    this.headerRow.Append(header);
                                }
                            }
                        }
                        this.columnsChanged = false;
                    }
                    this.tHead.Append(this.headerRow);
                    setTimeout(function () {
                        if (_this.ColumnsResizable) {
                            _this.addResizers();
                            _this.handleInitialWidthsForResizer();
                        }
                    }, 1);
                };
                /**
                 * displays the loading message when connected to an async data source
                 */
                WunderGrid.prototype.onStartUpdate = function () {
                    if (this.rows.length === 0) {
                        this.rows.push(new Grid.WunderRow());
                        this.tBody.Append(this.rows[0]);
                    }
                    try {
                        this.element.removeChild(this.tBody.element);
                    }
                    catch (e) {
                    }
                    var len = this.rows.length;
                    for (var i = 1; i < len; i++) {
                        this.rows[i].Style.visibility = 'hidden';
                    }
                    var span = this.rows[0].cells.length;
                    if (span === 0)
                        span = this.columns.length;
                    if (span === 0)
                        span = 1;
                    var row = this.rows[0];
                    row.emptyContent();
                    var td = $(document.createElement('td'));
                    td.attr('colspan', span);
                    td.text('Loading...');
                    row.jElement.append(td);
                    this.Append(this.tBody);
                };
                /**
                 * Listener for an async data source that updates the data on the grid
                 * @param data
                 */
                WunderGrid.prototype.onEndUpdate = function (data) {
                    this.bind(data);
                };
                Object.defineProperty(WunderGrid.prototype, "ColumnsResizable", {
                    /** True means columns can be resized False means they can't */
                    get: function () {
                        return this.columnsResizable;
                    },
                    /** True means columns can be resized False means they can't */
                    set: function (val) {
                        var _this = this;
                        this.columnsResizable = val;
                        var rows = this.rows;
                        var len = rows.length;
                        if (val) {
                            this.columnsChanged = true;
                            this.handleInitialWidthsForResizer();
                        }
                        if (this.Columns.length > 0)
                            this.createHeaderRow();
                        if (!this.eventsRegistered) {
                            $(window).mouseup(function () { return _this.context.selectedResizer = undefined; });
                            $(window).mousemove(function (event) { return _this.mouseMove(event); });
                        }
                    },
                    enumerable: false,
                    configurable: true
                });
                WunderGrid.prototype.addResizers = function () {
                    var len = this.columnHeaders.length;
                    var prevHead;
                    var prevResizer;
                    for (var i = 0; i < len; i++) {
                        var header = this.columnHeaders[i];
                        var ele = void 0;
                        var resizer = void 0;
                        if (prevHead) {
                            ele = document.createElement('div');
                            ele.innerHTML = '&nbsp;';
                            resizer = new Grid.Resizer(ele, this, prevHead, true, 6, i - 1);
                            header.Append(resizer);
                            resizer.prevResizer = prevResizer;
                        }
                        ele = document.createElement('div');
                        ele.innerHTML = '&nbsp;';
                        prevResizer = new Grid.Resizer(ele, this, header, false, 6, i);
                        header.Append(prevResizer);
                        prevHead = header;
                    }
                };
                /**
                 * Handles setting initial width for header rows
                 */
                WunderGrid.prototype.handleInitialWidthsForResizer = function () {
                    if (this.filteredData.length > 0 && this.tHead.element.children.length > 0) {
                        var len = this.tHead.element.children.length;
                        this.Style.width = (this.element.clientWidth + (10 * len)) + 'px';
                        for (var i = 0; i < len; i++) {
                            var header = this.tHead.element.children[i];
                            if (!header.style.width)
                                header.style.width = (header.clientWidth + 10) + 'px';
                        }
                    }
                };
                WunderGrid.prototype.mouseMove = function (event) {
                    var resizer = this.context.selectedResizer;
                    if (resizer)
                        resizer.onMouseMove(event);
                };
                /*********************************************************************************************************************************************************************/
                /* Region local sorting filtering and paging*/
                /*********************************************************************************************************************************************************************/
                /**
               * Changes the page number of the grids local data
               * @param pageNum - the page to change to.
               */
                WunderGrid.prototype.changePage = function (pageNum, refresh) {
                    if (refresh === void 0) { refresh = true; }
                    if (this.paging) {
                        this.pageNum = pageNum - 1;
                        var startIndex = this.pageNum * this.pageSize;
                        var newData = this.filteredData.slice(startIndex, startIndex + this.pageSize);
                        if (refresh)
                            this.localRefresh(newData);
                        var maxPages = 0;
                        if (this.Data != undefined
                            && this.pageSize !== undefined) {
                            maxPages = Math.ceil(this.Data.length / this.pageSize);
                        }
                        this.onPageChange.fire(this.pageNum + 1, maxPages);
                    }
                };
                /**
                * Changes the sort column being used for the local sorting
                * @param sortBy - Sort by fields to sort on
                * @param refresh - determines if a data refresh should occur when the method is called.
                */
                WunderGrid.prototype.applySorting = function (sortBy, refresh) {
                    this.sortBy = sortBy;
                    if (this.filteredData) {
                        var len_1 = sortBy.length;
                        this.filteredData = this.filteredData.sort(function (a, b) {
                            for (var i = 0; i < len_1; i++) {
                                var sort = sortBy[i];
                                var col = sort.column;
                                var valA = a[col];
                                var valB = b[col];
                                if (valA < valB) {
                                    if (sort.sortDirection == TSF.Data.SortDirection.ASC)
                                        return -1;
                                    else
                                        return 1;
                                }
                                else if (valA > valB) {
                                    if (sort.sortDirection == TSF.Data.SortDirection.ASC)
                                        return 1;
                                    else
                                        return -1;
                                }
                                if ((valA === undefined || valA === null) && (valB !== undefined && valB !== null)) {
                                    if (sort.sortDirection == TSF.Data.SortDirection.ASC)
                                        return -1;
                                    else
                                        return 1;
                                }
                                if ((valB === undefined || valB === null) && (valA !== undefined && valA !== null)) {
                                    if (sort.sortDirection == TSF.Data.SortDirection.ASC)
                                        return 1;
                                    else
                                        return -1;
                                }
                            }
                            return 0;
                        });
                        if (refresh && this.paging)
                            this.changePage(1, true);
                        else if (refresh)
                            this.localRefresh(this.filteredData);
                        this.onSortChanged.fire(this.sortBy);
                    }
                };
                /**
                 *  Gets the current sorted column.
                 */
                WunderGrid.prototype.getSort = function () {
                    return this.sortBy;
                };
                /**
                * Apply filter to local client side data. Type sensitive.
                * Cannot compare string to numbers and like statements can only be used on string columns.
                * @param filters - Filters to apply to the data
                * @param refresh - determines if a data refresh should occur when the method is called.
                */
                WunderGrid.prototype.applyFilter = function (filters, refresh) {
                    if (refresh === void 0) { refresh = true; }
                    if (this.criteria != filters)
                        this.pageNum = 0;
                    this.criteria = filters;
                    if (refresh) {
                        this.filteredData = TSF.Data.Filtering.filterOnCondition(this.Data, this.criteria, this.columnHash);
                    }
                    this.pageNum = 0;
                    if (refresh && this.paging)
                        this.changePage(1, true);
                    else if (refresh)
                        this.localRefresh(this.filteredData);
                };
                WunderGrid.prototype.localRefresh = function (data) {
                    this.updating = true;
                    if (this.columnsChanged)
                        this.createHeaderRow();
                    this.createBody(data);
                    this.updating = false;
                };
                /** internal hash of operations for filtering data */
                WunderGrid.OperationsHash = undefined;
                /** caches regex expressions so it doesn't have to compile it every time for filtering*/
                WunderGrid.regexHash = {};
                return WunderGrid;
            }(UI.TSControl));
            Grid.WunderGrid = WunderGrid;
        })(Grid = UI.Grid || (UI.Grid = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
var TSF;
(function (TSF) {
    var UI;
    (function (UI) {
        var Grid;
        (function (Grid) {
            var Extensions;
            (function (Extensions) {
                var BaseEditableCell = /** @class */ (function () {
                    function BaseEditableCell() {
                    }
                    BaseEditableCell.prototype.changeValue = function (sender, value) {
                        var row = sender.context.row;
                        var col = sender.context.col;
                        var val = row.Data;
                        val = eval('val.' + col.dataField.replace(/[;\r\n]*/g, '') + ' = value;');
                    };
                    return BaseEditableCell;
                }());
                Extensions.BaseEditableCell = BaseEditableCell;
            })(Extensions = Grid.Extensions || (Grid.Extensions = {}));
        })(Grid = UI.Grid || (UI.Grid = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
/// <reference path="BaseEditableCell.ts" />
var TSF;
/// <reference path="BaseEditableCell.ts" />
(function (TSF) {
    var UI;
    (function (UI) {
        var Grid;
        (function (Grid) {
            var Extensions;
            (function (Extensions) {
                var WunderTextCell = /** @class */ (function (_super) {
                    __extends(WunderTextCell, _super);
                    function WunderTextCell() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    WunderTextCell.prototype.generateCell = function (value, column, row, grid) {
                        var _this = this;
                        var cell = new Grid.WunderCell();
                        var txt = new UI.TextBox();
                        txt.element.style.width = "95%";
                        txt.context.row = row;
                        txt.context.col = column;
                        txt.OnTextChange.add(function () { return _this.changeValue(txt, txt.Value); }, this);
                        if (value !== null && value !== undefined)
                            txt.Value = value.toString();
                        cell.Append(txt);
                        return cell;
                    };
                    return WunderTextCell;
                }(Extensions.BaseEditableCell));
                Extensions.WunderTextCell = WunderTextCell;
            })(Extensions = Grid.Extensions || (Grid.Extensions = {}));
        })(Grid = UI.Grid || (UI.Grid = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
/// <reference path="BaseEditableCell.ts" />
var TSF;
/// <reference path="BaseEditableCell.ts" />
(function (TSF) {
    var UI;
    (function (UI) {
        var Grid;
        (function (Grid) {
            var Extensions;
            (function (Extensions) {
                /**
                 *  Used by the wundergrid when no editable cell method is provided by the column to generate an editable checkbox cell
                 */
                var WunderCheckboxCell = /** @class */ (function (_super) {
                    __extends(WunderCheckboxCell, _super);
                    function WunderCheckboxCell() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    /** generates the cell */
                    WunderCheckboxCell.prototype.generateCell = function (value, column, row, grid) {
                        var _this = this;
                        var cell = new Grid.WunderCell();
                        var cbx = new UI.Checkbox();
                        cbx.Indeterminate = true;
                        cbx.context.row = row;
                        cbx.context.col = column;
                        cbx.OnCheckedChanged.add(function () { return _this.changeValue(cbx, cbx.Checked); }, this);
                        if (value !== null && value !== undefined)
                            cbx.Checked = value;
                        cell.Append(cbx);
                        return cell;
                    };
                    return WunderCheckboxCell;
                }(Extensions.BaseEditableCell));
                Extensions.WunderCheckboxCell = WunderCheckboxCell;
            })(Extensions = Grid.Extensions || (Grid.Extensions = {}));
        })(Grid = UI.Grid || (UI.Grid = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
/// <reference path="..\TSControl.ts" />
/// <reference path="Extensions\WunderTextCell.ts" />
/// <reference path="Extensions\WunderCheckboxCell.ts" />
var TSF;
/// <reference path="..\TSControl.ts" />
/// <reference path="Extensions\WunderTextCell.ts" />
/// <reference path="Extensions\WunderCheckboxCell.ts" />
(function (TSF) {
    var UI;
    (function (UI) {
        var Grid;
        (function (Grid) {
            var WunderRow = /** @class */ (function (_super) {
                __extends(WunderRow, _super);
                function WunderRow(ele, logicalParent) {
                    var _this = _super.call(this, ele, logicalParent) || this;
                    /** cells of the row */
                    _this.cells = [];
                    _this.checkEmptyEle('tr');
                    return _this;
                }
                Object.defineProperty(WunderRow.prototype, "Editing", {
                    get: function () {
                        return this.editing;
                    },
                    set: function (editing) {
                        this.editing = editing;
                        this.emptyContent();
                        if (this.data)
                            this.createCells();
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(WunderRow.prototype, "Data", {
                    get: function () {
                        return this.data;
                    },
                    set: function (data) {
                        this.data = data;
                        this.createCells();
                    },
                    enumerable: false,
                    configurable: true
                });
                /**
                 * Creates the cells in the row based off of the columns.  the columns have to be set first before the data is set for this method to work.
                 */
                WunderRow.prototype.createCells = function () {
                    var data = this.data;
                    if (data) {
                        var len = this.columns.length;
                        this.cells = new Array(len);
                        var cells = this.cells;
                        for (var i = 0; i < len; i++) {
                            var column = this.columns[i];
                            var val = this.data;
                            val = eval('val.' + column.dataField.replace(/[;\r\n]*/g, ''));
                            if (column.dataType === UI.ColumnType.DateTime) {
                                var format;
                                if (!column.dateFormat)
                                    format = "MM/dd/yyyy HH:mm:ss";
                                else
                                    format = column.dateFormat;
                                val = TSF.Utilities.DateFormatter.formatDate(new Date(val), format);
                            }
                            var cell;
                            if (this.editing === true) {
                                if (column.customEditCell)
                                    cell = column.customEditCell.generateCell(val, column, this, this.grid);
                                else {
                                    if (column.dataType === UI.ColumnType.Boolean)
                                        cell = WunderRow.editableCheckCellGenerator.generateCell(val, column, this, this.grid);
                                    else
                                        cell = WunderRow.editableTextCellGenerator.generateCell(val, column, this, this.grid);
                                }
                            }
                            else if (column.customCell)
                                cell = column.customCell.generateCell(val, column, this, this.grid);
                            else {
                                cell = new Grid.WunderCell();
                                cell.Text = val;
                                if (column.width)
                                    cell.jElement.width(column.width);
                            }
                            cell.column = column;
                            cell.row = this;
                            cells[i] = cell;
                            this.Append(cell);
                        }
                    }
                };
                WunderRow.editableTextCellGenerator = new Grid.Extensions.WunderTextCell();
                WunderRow.editableCheckCellGenerator = new Grid.Extensions.WunderCheckboxCell();
                return WunderRow;
            }(UI.TSControl));
            Grid.WunderRow = WunderRow;
        })(Grid = UI.Grid || (UI.Grid = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
/// <reference path="..\..\TSControl.ts" />
var TSF;
/// <reference path="..\..\TSControl.ts" />
(function (TSF) {
    var UI;
    (function (UI) {
        var Grid;
        (function (Grid) {
            var Extensions;
            (function (Extensions) {
                /**
                 *  Used by the wundergrid when no custom header method is provided by the column to generate anthe header
                 */
                var SortableColumnHeader = /** @class */ (function (_super) {
                    __extends(SortableColumnHeader, _super);
                    function SortableColumnHeader() {
                        var _this = _super.call(this, document.createElement('div')) || this;
                        _this.OnClick.add(_this.click, _this);
                        return _this;
                    }
                    /** generates the cell */
                    SortableColumnHeader.prototype.generateHeader = function (column, target) {
                        var _this = this;
                        this.column = column;
                        this.target = target;
                        var header = new Grid.WunderColumnHeader();
                        var textEle = new UI.TSControl(document.createElement('span'));
                        textEle.Text = column.displayText;
                        header.Append(textEle);
                        header.Append(this);
                        this.Style.display = 'inline-block';
                        this.element.innerHTML = "▵<br/>▿";
                        this.Style.lineHeight = '13px';
                        this.Style.fontSize = '1.5em';
                        this.Style.height = '100%';
                        this.Style.cssFloat = 'right';
                        this.Style.cursor = 'pointer';
                        this.Class = 'wgSorter';
                        setTimeout(function () {
                            var paddingTop = parseInt(header.jElement.css('padding-top').replace('px', ''));
                            var paddingBottom = parseInt(header.jElement.css('padding-bottom').replace('px', ''));
                            var elePadTop = parseInt(_this.jElement.css('padding-top').replace('px', ''));
                            var elePadBottom = parseInt(_this.jElement.css('padding-bottom').replace('px', ''));
                            _this.Style.marginTop = (((header.element.clientHeight - paddingTop - paddingBottom) / 2) - ((_this.element.clientHeight - elePadTop - elePadBottom) / 2)) + 'px';
                        }, 1);
                        target.onSortChanged.add(this.sortChanged, this);
                        return header;
                    };
                    SortableColumnHeader.prototype.click = function (sender, args) {
                        if (this.order === undefined)
                            this.target.applySorting([new TSF.Data.SortElement(this.column.dataField, TSF.Data.SortDirection.ASC)], true);
                        else if (this.order === TSF.Data.SortDirection.ASC)
                            this.target.applySorting([new TSF.Data.SortElement(this.column.dataField, TSF.Data.SortDirection.DESC)], true);
                        else
                            this.target.applySorting([], true);
                        if (window.getSelection) {
                            if (window.getSelection().empty) { // Chrome
                                window.getSelection().empty();
                            }
                            else if (window.getSelection().removeAllRanges) { // Firefox
                                window.getSelection().removeAllRanges();
                            }
                        }
                        else if (document.selection) { // IE?
                            document.selection.empty();
                        }
                    };
                    SortableColumnHeader.prototype.changeSortingOrder = function (order) {
                        this.order = order;
                        if (order === undefined)
                            this.element.innerHTML = "▵<br/>▿";
                        else {
                            if (order === TSF.Data.SortDirection.DESC)
                                this.element.innerHTML = "▵<br/>▾";
                            else
                                this.element.innerHTML = "▴<br/>▿";
                        }
                    };
                    SortableColumnHeader.prototype.sortChanged = function (sorts) {
                        if (sorts.length < 1)
                            this.changeSortingOrder();
                        else if (this.column.dataField === sorts[0].column)
                            this.changeSortingOrder(sorts[0].sortDirection);
                        else
                            this.changeSortingOrder();
                    };
                    return SortableColumnHeader;
                }(UI.TSControl));
                Extensions.SortableColumnHeader = SortableColumnHeader;
            })(Extensions = Grid.Extensions || (Grid.Extensions = {}));
        })(Grid = UI.Grid || (UI.Grid = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
/// <reference path="..\..\Data\AbstractClasses\AObservable.ts" />
var TSF;
/// <reference path="..\..\Data\AbstractClasses\AObservable.ts" />
(function (TSF) {
    var UI;
    (function (UI) {
        var States;
        (function (States) {
            /**
             * Observable state of the grid if needed for architecture
             */
            var SelectableState = /** @class */ (function (_super) {
                __extends(SelectableState, _super);
                function SelectableState() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /** selected data in the grid */
                    _this.selectedData = [];
                    /** the data being displayed in the grid*/
                    _this.data = [];
                    return _this;
                }
                return SelectableState;
            }(TSF.Data.AbstractClasses.AObservable));
            States.SelectableState = SelectableState;
        })(States = UI.States || (UI.States = {}));
    })(UI = TSF.UI || (TSF.UI = {}));
})(TSF || (TSF = {}));
var TSF;
(function (TSF) {
    var Utilities;
    (function (Utilities) {
        /*
         * Date Format 1.2.3
         * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
         * MIT license
         *
         * Includes enhancements by Scott Trenda <scott.trenda.net>
         * and Kris Kowal <cixar.com/~kris.kowal/>
         *
         * Accepts a date, a mask, or a date and a mask.
         * Returns a formatted version of the given date.
         * The date defaults to the current date/time.
         * The mask defaults to dateFormat.masks.default.
         */
        var DateFormatter = /** @class */ (function () {
            function DateFormatter() {
            }
            DateFormatter.pad = function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len)
                    val = "0" + val;
                return val;
            };
            ;
            // Regexes and supporting functions are cached through closure
            DateFormatter.formatDate = function (date, format, utc) {
                // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
                if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                    format = date;
                    date = undefined;
                }
                // Passing date through Date applies Date.parse, if necessary
                date = date ? new Date(date) : new Date;
                if (isNaN(date))
                    throw SyntaxError("invalid date");
                format = String(this.masks[format] || format || this.masks["default"]);
                // Allow setting the utc argument via the mask
                if (format.slice(0, 4) == "UTC:") {
                    format = format.slice(4);
                    utc = true;
                }
                var _ = utc ? "getUTC" : "get", d = date[_ + "Date"](), D = date[_ + "Day"](), m = date[_ + "Minutes"](), y = date[_ + "FullYear"](), H = date[_ + "Hours"](), M = date[_ + "Month"](), s = date[_ + "Seconds"](), L = date[_ + "Milliseconds"](), o = utc ? 0 : date.getTimezoneOffset(), flags = {
                    d: d,
                    dd: this.pad(d),
                    ddd: this.i18n.dayNames[D],
                    dddd: this.i18n.dayNames[D + 7],
                    M: M + 1,
                    MM: this.pad(M + 1),
                    MMM: this.i18n.monthNames[M],
                    MMMM: this.i18n.monthNames[M + 12],
                    yy: String(y).slice(2),
                    yyyy: y,
                    h: H % 12 || 12,
                    hh: this.pad(H % 12 || 12),
                    H: H,
                    HH: this.pad(H),
                    m: m,
                    mm: this.pad(m),
                    s: s,
                    ss: this.pad(s),
                    l: this.pad(L, 3),
                    L: this.pad(L > 99 ? Math.round(L / 10) : L),
                    t: H < 12 ? "a" : "p",
                    tt: H < 12 ? "am" : "pm",
                    T: H < 12 ? "A" : "P",
                    TT: H < 12 ? "AM" : "PM",
                    Z: utc ? "UTC" : (String(date).match(this.timezone) || [""]).pop().replace(this.timezoneClip, ""),
                    o: (o > 0 ? "-" : "+") + this.pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };
                return format.replace(this.token, function ($0) {
                    return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
                });
            };
            DateFormatter.token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g;
            DateFormatter.timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
            DateFormatter.timezoneClip = /[^-+\dA-Z]/g;
            // Some common format strings
            DateFormatter.masks = {
                "default": "ddd mmm dd yyyy HH:MM:ss",
                shortDate: "m/d/yy",
                mediumDate: "mmm d, yyyy",
                longDate: "mmmm d, yyyy",
                fullDate: "dddd, mmmm d, yyyy",
                shortTime: "h:MM TT",
                mediumTime: "h:MM:ss TT",
                longTime: "h:MM:ss TT Z",
                isoDate: "yyyy-mm-dd",
                isoTime: "HH:MM:ss",
                isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
                isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
            };
            // Internationalization strings
            DateFormatter.i18n = {
                dayNames: [
                    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
                    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                ],
                monthNames: [
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
                ]
            };
            return DateFormatter;
        }());
        Utilities.DateFormatter = DateFormatter;
    })(Utilities = TSF.Utilities || (TSF.Utilities = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=TSF.js.map