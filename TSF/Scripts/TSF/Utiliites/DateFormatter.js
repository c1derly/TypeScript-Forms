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
        var DateFormatter = (function () {
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
                var _ = utc ? "getUTC" : "get", d = date[_ + "Date"](), D = date[_ + "Day"](), m = date[_ + "Month"](), y = date[_ + "FullYear"](), H = date[_ + "Hours"](), M = date[_ + "Minutes"](), s = date[_ + "Seconds"](), L = date[_ + "Milliseconds"](), o = utc ? 0 : date.getTimezoneOffset(), flags = {
                    d: d,
                    dd: this.pad(d),
                    ddd: this.i18n.dayNames[D],
                    dddd: this.i18n.dayNames[D + 7],
                    m: m + 1,
                    mm: this.pad(m + 1),
                    mmm: this.i18n.monthNames[m],
                    mmmm: this.i18n.monthNames[m + 12],
                    yy: String(y).slice(2),
                    yyyy: y,
                    h: H % 12 || 12,
                    hh: this.pad(H % 12 || 12),
                    H: H,
                    HH: this.pad(H),
                    M: M,
                    MM: this.pad(M),
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
            return DateFormatter;
        }());
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
        Utilities.DateFormatter = DateFormatter;
    })(Utilities = TSF.Utilities || (TSF.Utilities = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=DateFormatter.js.map