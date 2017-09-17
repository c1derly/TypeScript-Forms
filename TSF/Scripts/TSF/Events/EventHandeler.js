var TSUI;
(function (TSUI) {
    var Events;
    (function (Events) {
        var EventHandeler = (function () {
            function EventHandeler() {
            }
            EventHandeler.prototype.add = function (method, sender) {
                this.events.push(new TSUI.DS.Tuple(method, sender));
            };
            EventHandeler.prototype.remove = function (method) {
                this.events = this.events.filter(function (x) { return x.Item1 !== method; });
            };
            EventHandeler.prototype.clearEvents = function () {
                this.events = [];
            };
            EventHandeler.prototype.fire = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                for (var i = 0; i < this.events.length; i++) {
                    this.events[i].Item1.apply(this.events[i].Item2, args);
                }
            };
            return EventHandeler;
        }());
        Events.EventHandeler = EventHandeler;
    })(Events = TSUI.Events || (TSUI.Events = {}));
})(TSUI || (TSUI = {}));
