// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
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


(function (doc) {
	'use strict';

	//just for fun, showing Nau's ASCII art in browser console
	console.log(' _   _    _   _   _     ____ _____ _   _ ____ ___ ___\n| \\ | |  / \\ | | | |   / ___|_   _| | | |  _ \\_ _/ _ \\\n|  \\| | / _ \\| | | |   \\___ \\ | | | | | | | | | | | | |\n| |\\  |/ ___ \\ |_| |    ___) || | | |_| | |_| | | |_| |\n|_| \\_/_/   \\_\\___/    |____/ |_|  \\___/|____/___\\___/');

    // monitor scroll and add page header
    var body = doc.body,
        headerVisible = false,
        pageHeader = doc.getElementById('page-header');

    doc.onscroll = function () {
        var isVisible = body.scrollTop > 400;

        console.log('onscroll', body.scrollTop, isVisible);

        if (isVisible !== headerVisible) {
            headerVisible = isVisible;


            if (headerVisible) {
                pageHeader.className = 'page-header page-header--visible';
            } else {
                pageHeader.className = 'page-header';
            }
        }
    };

}(document));
