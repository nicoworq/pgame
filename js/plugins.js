// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function () {
    };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

/*
 *
 *	jQuery Timer plugin v0.2
 *      Ferron Hanse [http://pragmatic-coding.blogspot.com/2012/01/jquery-timer-library.html]
 *		Matt Schmidt [http://www.mattptr.net]   : author of v1
 *
 *	Licensed under the BSD License:
 *		http://mattptr.net/license/license.txt
 *
 */

jQuery.timer = function (interval, callback, type) {
    /**
     *
     * timer() provides a cleaner way to handle intervals
     *
     *    @usage
     * $.timer(interval, callback);
     *
     *
     * @example
     * $.timer(1000, function (timer) {
     *     alert("hello");
     *     timer.stop();
     * },'interval');
     * @desc Show an alert box after 1 second and stop
     *
     * @example
     * var second = false;
     *    $.timer(1000, function (timer) {
     *        if (!second) {
     *            alert('First time!');
     *            second = true;
     *            timer.reset(3000);
     *        }
     *        else {
     *            alert('Second time');
     *            timer.stop();
     *        }
     *    },'interval');
     * @desc Show an alert box after 1 second and show another after 3 seconds
     *
     *
     */

    var interval = interval || 100;

    if (!callback)
        return false;


    _timer = function (interval, callback, type) {
        if (type === 'interval')
            _timerInterval(interval, callback);
        else if (typeof (type) === 'undefined' || type === 'timeout')
            _timerOut(interval, callback);
    };

    _timerInterval = function (interval, callback) {
        this.stop = function () {
            clearInterval(self.id);
        };

        this.internalCallback = function () {
            callback(self);
        };

        this.reset = function (val) {
            if (self.id)
                clearInterval(self.id);

            var val = val || 100;
            this.id = setInterval(this.internalCallback, val);
        };

        this.interval = interval;
        this.id = setInterval(this.internalCallback, this.interval);

        var self = this;
    };

    _timerOut = function (interval, callback) {
        this.stop = function () {
            clearTimeout(self.id);
        };

        this.internalCallback = function () {
            callback(self);
        };

        this.reset = function (val) {
            if (self.id)
                clearTimeout(self.id);

            var val = val || 1000;
            this.id = setTimeout(this.internalCallback, val);
        };

        this.interval = interval;
        this.id = setTimeout(this.internalCallback, this.interval);

        var self = this;
    };

    return new _timer(interval, callback, type);
};
