/* © 2014 NauStud.io - All rights reserved
 * @author Thanh Tran
 */
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
    var body = doc.body;
    var headerVisible = false;
    var lastScrollTop = 0;
    var pageHeader = doc.getElementById('page-header');
    var parallaxHeader = doc.getElementById('parallax-hero');
    // test whether this is iOS browser or not:
    var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );

    function onScroll() {
        //getting cross-browser body scroll position, according to this: http://forums.asp.net/t/1618316.aspx
        //this.y is the result of IScroll scroll positioning probing, its value is reversed of scrollTop
        var scrollTop = - this.y || body.scrollTop || doc.documentElement.scrollTop || win.pageYOffset || 0; /* jshint ignore:line */
        var delta = (lastScrollTop - scrollTop);
        var isVisible = (scrollTop > 300 && delta > 0);
        var parallaxY = - (scrollTop * 0.3);

        // console.log('onscroll', lastScrollTop,  scrollTop, lastScrollTop - scrollTop, parallaxY);
        lastScrollTop = scrollTop;

        if (isVisible !== headerVisible) {
            headerVisible = isVisible;

            if (headerVisible) {
                pageHeader.className = 'page-header page-header--visible';
            } else {
                pageHeader.className = 'page-header';
            }
        }

        if (iOS) {
            // use the translate 3D for better performance
            parallaxHeader.style.transform = 'translate3d(0,' + parallaxY + 'px,0)';
            parallaxHeader.style.webkitTransform = 'translate3d(0,' + parallaxY + 'px,0)';
        } else {
            parallaxHeader.style.top = parallaxY + 'px';
        }
    }


    if (iOS) {
        var iscroll;
        var mainEl = doc.getElementById('main');
        var iScrollScript = doc.createElement('script');
        doc.head.appendChild(iScrollScript);
        /*global IScroll*/
        iScrollScript.onload = function() {
            console.log('IScroll loaded');
            iscroll = new IScroll(mainEl, { probeType: 3, mouseWheel: true });

            iscroll.on('scroll', onScroll);
            iscroll.on('scrollEnd', onScroll);
        };

        iScrollScript.src = 'iscroll.min.js';

        doc.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        mainEl.className = 'main career iscroll';

        // block default anchor link and use iscroll instead
        var navLinks = doc.querySelectorAll('nav > a');
        Array.prototype.forEach.call(navLinks, function(link) {
            link.addEventListener('click', function(e) {
                var hash = e.currentTarget.hash;
                console.log('Tap on', hash);
                iscroll.scrollToElement(hash, 500);
                e.preventDefault();
            });
        });


    } else {
        // use normal scroll event for scrollTop probing
        win.onscroll = onScroll;
    }

}(window, document));
