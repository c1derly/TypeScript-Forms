/// <reference path="..\Base\Exception.ts" />
/// <reference path="..\Events\ValueEvent.ts" />
var TSF;
(function (TSF) {
    var Data;
    (function (Data) {
        var Exception = TSF.Base.Exception;
        /**
         * Class that holds logic for making objects observable.
         */
        var Observer = (function () {
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
            return Observer;
        }());
        /** parameters not to convert into getters and setters that fire events */
        Observer.$exclusions = {
            '$exclusions': true, '$observe': true, '$alertObservers': true, '$definEvent': true, '$setValueNoEvent': true, '$setAttributeWithoutEvent': true, '$stopObserving': true, '$events': true, '$objectChangeEvent': true, '$regEvents': true, '$dirty': true
        };
        Data.Observer = Observer;
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=Observer.js.map