// Avoid `console` errors in browsers that lack a console.
(function() {
    'use strict';
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


(function (win, doc) {
    'use strict';
	//just for fun, showing Nau's ASCII art in browser console
    var ASCII_ART = '   _.._             _.._           .--┐\n .`--.  \'.        .\'  .-`\'.       |   |\n.   .-\\   \\  (`) .   /-.   \\      |   |\n|   |  \\   \\     |   |  \\   \\     |   |\n|   |   \\   \\    |   |   \\   \\    |   |\n|   |    \\   \\   |   |    \\   \\   |   |\n|   |     \\   \\  |   |     \\   \\  |   |\n|   |      \\   `-/   |      \\   \\-\'   |\n|   |       \\_.-`   ,\'  (`)  \\   `-._.\'\n└--`         `-...-`          `-...-`\nNau Studio';
	console.log(ASCII_ART);

    // monitor scroll and add page header
    var body = doc.body,
        headerVisible = false,
        lastScrollTop = 0,
        pageHeader = doc.getElementById('page-header');

    win.onscroll = function () {
        //getting cross-browser body scroll position, according to this: http://forums.asp.net/t/1618316.aspx
        var scrollTop = body.scrollTop || doc.documentElement.scrollTop || win.pageYOffset || 0,
            delta = (lastScrollTop - scrollTop),
            isVisible = (scrollTop > 200 && delta > 0) ;

        // console.log('onscroll', lastScrollTop,  scrollTop, lastScrollTop - scrollTop, isVisible);
        lastScrollTop = scrollTop;

        if (isVisible !== headerVisible) {
            headerVisible = isVisible;

            if (headerVisible) {
                pageHeader.className = 'page-header page-header--visible';
            } else {
                pageHeader.className = 'page-header';
            }
        }
    };

}(window, document));
