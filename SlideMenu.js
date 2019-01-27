/**
 * @name SlideMenu.js
 * @version v0.1 (29-12-2018)[dd-mm-yyyy]
 * @link https://alexkratky.cz                      Author website
 * @link https://tssoft.cz/SlideMenu.js             Documentation
 * @link https://github.com/AlexKratky/SlideMenu.js Github Repository
 * @author Alex Kratky <info@alexkratky.cz>
 * @copyright Copyright (c) 2018 Alex Kratky
 * @license http://opensource.org/licenses/mit-license.php MIT License
 * @description Easy off-canvas menu with mobile touch support.
 */

//TODO
    //change private and public functions correctly
'use strict';
/**
 * Creates instance of SlideMenu with specific options.
 * @param {object} $ jQuery
 * @param {object} options See the documentation for all available options.
 */
function SlideMenu(options) {
    options = options || {};

    // Define variables
    this._B = options.container || document.querySelector('body');
    this._Wrapper = options.wrapper || document.getElementById('site-wrapper');
    this._Canvas = options.canvas || document.getElementById('site-canvas');
    this._Button = options.button || document.getElementById('logo');
    this._percent = options.percent || 0.25; // percent to open
    this._area = options.area || 0.1; // 10% of left body is area where menu could be opened
    this._areaOpened = options.areaOpened || false; // if menu is opened, then area is full width, currently not working
    this._enabled = false;
    this._debug = options.debug || false;
    this._closeMenuOnWidth = options.closeMenuOnWidth || false;
    this._disableMenuOnWidth = options.disableMenuOnWidth || false; //disable touch listeners when window is higher then specific width
    this._size = options.size || 300;
    this._animationTime = options.animationTime || 300; // the time of ease-in-out animation for (*)Ended events
    this._direction = options.direction || 'left'; // 'left' or 'right';
    this._X;
    this._Y;
    this._W;

    this._createEvents();
    this._init();

}

/**
 * Clear classes from canvas, enable touch and set start coordinates.
 */
SlideMenu.prototype.touch_start = function(e) {
    if (this._disableMenuOnWidth <= this._W && this._disableMenuOnWidth !== false)
        return;
    if (e.touches[0].clientX >= this._W * this._area + (this.isMenuOpened() ? this._size : 0) /*&& (!this.isMenuOpened() && !this._areaOpened)*/)
        return;

    $(this._Canvas).removeClass();
    this._enabled = true;
    $(document).trigger(this._eventTouchStart);
    if (!this._X)
        this._X = e.touches[0].clientX;
    if (!this._Y)
        this._Y = e.touches[0].clientX;
    this._log("Start (e)");
    this._log(e);
}

/**
 * Visualizes touch move.
 */
SlideMenu.prototype.touch_move = function(e) {
    if(this.isMenuOpened())
        try {
            e.preventDefault();
        } catch(err) {this._log("e.preventDefault not supported");}
    if (this._enabled) {
        $(document).trigger(this._eventTouchMove);
        this._log("Touch enabled");
        this._log("0: " + this._X);
        this._log("1: " + (e.touches[0].clientX));
        this._log("Current: " + $(this._Canvas).data("x"));
        var m = (this._X - e.touches[0].clientX - $(this._Canvas).data("x"));
        this._log("m: " + m);
        if (-(m) <= this._size && m <= 0) {
            $(this._Canvas).css("transform", "translateX(" + (-(m)) + "px)");

        }
        console.log(this._X - e.touches[0].clientX);
    } else {
        this._log("not enabled touch");
    }
}

/**
 * Calculate the difference bettween starting coordinates and ending coordinates.
 */
SlideMenu.prototype.touch_end = function(e) {
    if(!this._enabled)
        return;
    $(document).trigger(this._eventTouchEnd);
    this._log("End (e)");
    this._log(e);
    this._log("3: " + "X: " + e.changedTouches[0].clientX);
    this._enabled = false;
    this._log("4: " + (this._X - e.changedTouches[0].clientX));
    var f = this._X - e.changedTouches[0].clientX;
    if (f == 0) { //same pos
        return;
    }
    var direction = Math.sign(f);
    $(this._Canvas).addClass('ease-in-out'); //smoth animations
    if (direction > 0) {
        //right +
        if (f >= this._W * this._percent) {
            this._log("Close menu")
            $(this._Canvas).css("transform", "translateX(" + 0 + "px)");
            $(this._Canvas).data("x", 0);
            this.closeMenu();
        } else {
            //not enough
            if(this.isMenuOpened()) {
                this._log("not_enough to close");
                $(this._Canvas).css("transform", "translateX(" + this._size + "px)");
                $(this._Canvas).data("x", this._size);
                $(document).trigger(this._eventNotEnough);
            }
        }
    } else {
        //left -
        if (-f >= this._W * this._percent) {
            this._log("Open Menu");
            $(this._Canvas).css("transform", "translateX(" + this._size + "px)");
            $(this._Canvas).data("x", this._size);
            this.openMenu();
        } else {
            //not enough
            $(this._Canvas).css("transform", "translateX(" + 0 + "px)");
            $(this._Canvas).data("x", 0);
            $(document).trigger(this._eventNotEnough);
        }
    }
    this._X = 0;
    this._Y = 0;
}

/**
 * Opens menu.
 */
SlideMenu.prototype.openMenu = function() {
    $(this._Canvas).removeAttr("style");
    $(this._Canvas).removeClass();
    $(this._Canvas).addClass('ease-in-out');
    $(this._Wrapper).addClass('show-nav');
    $(this._Wrapper).addClass('no-overflow');
    $(document).trigger(this._eventOpen);
    let e = this._eventOpenEnded;
    setTimeout(function () {
        $(document).trigger(e);
    }, this._animationTime);
}

/**
 * Closes menu.
 */
SlideMenu.prototype.closeMenu = function () {
    $(this._Canvas).removeAttr("style");
    $(this._Canvas).removeClass();
    $(this._Canvas).addClass('ease-in-out');
    $(this._Wrapper).removeClass('show-nav');
    $(this._Wrapper).removeClass('no-overflow');
    $(this._Canvas).data("x", 0);
    let e = this._eventCloseEnded;
    $(document).trigger(this._eventClose);
    setTimeout(function () {
        $(document).trigger(e);
    }, this._animationTime);
}

/**
 * Toggles menu.
 */
SlideMenu.prototype.toggleMenu = function () {
    this._log("Clicked");
    $(this._Canvas).removeAttr("style");
    $(this._Canvas).removeClass();
    if (this.isMenuOpened()) {
        $(this._Canvas).data("x", 0);
    } else {
        $(this._Canvas).data("x", this._size);
    }
    $(this._Canvas).addClass('ease-in-out');
    $(this._Wrapper).toggleClass('show-nav');
    $(this._Wrapper).toggleClass('no-overflow');
    $(document).trigger(this._eventToggle);
    let e = this._eventToggleEnded;
    setTimeout(function () {
        $(document).trigger(e);
    }, this._animationTime);
}


/**
 * Checks if menu is opened or not.
 * @return boolean
 */
SlideMenu.prototype.isMenuOpened = function () {
    return $(this._Wrapper).hasClass('show-nav');
}

//In future add some details to each event, e.g. to touchMoved actual (m) etc.
//it could trigger event by using this instead of document - $(this).trigger(this._event); and on client side it could be use by using reference instead document, e.g. - $(sm).on('event', function () {});
/**
 * Create all events.
 */
SlideMenu.prototype._createEvents = function () {
    this._eventOpen = jQuery.Event('menuOpen', []); // U
    this._eventClose = jQuery.Event('menuClose', []); // U
    this._eventOpenEnded = jQuery.Event('menuOpenEnded', []); // U
    this._eventCloseEnded = jQuery.Event('menuCloseEnded', []); // U
    this._eventNotEnough = jQuery.Event('menuNotEnough', []); // U - When the menu does not close or open after touch end
    this._eventToggle = jQuery.Event('menuToggle', []); // U
    this._eventToggleEnded = jQuery.Event('menuToggleEnded', []);
    this._eventTouchStart = jQuery.Event('touchStarted', []); // U
    this._eventTouchMove = jQuery.Event('touchMoved', []); // U
    this._eventTouchEnd = jQuery.Event('touchEnded', []); // U
}

/**
 * Initializes EventListeners.
 */
SlideMenu.prototype._init = function () {
    var x = this;
    console.log(x);
    //this._B.addEventListener('touchstart',this._touch_start, false);
    this._B.addEventListener('touchstart', bind(this, this.touch_start), false);
    this._B.addEventListener('touchmove', bind(this, this.touch_move), false);
    this._B.addEventListener('touchend', bind(this, this.touch_end), false);
    addEventListener('resize', bind(this, this._resize), false);
    this._resize(); //init _W
    $(this._Canvas).data("x",0);
    this._Button.addEventListener('click', bind(this, this.toggleMenu), false);
}

/**
 * Updates variable _W with actual width of the window.
 */
SlideMenu.prototype._resize = function () {
    //fix bug when window width was bigger then should be
    $('meta[name=viewport]').remove();
    $('head').append('<meta name="viewport" content="width=' + window.innerWidth + ', initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />');
    this._W = window.innerWidth;
    if(this._closeMenuOnWidth !== false) {
        if ($(window).width() > this._closeMenuOnWidth) {
            this.closeMenu();
        }
    }
}

/**
 * If debug is enabled, it calls console.log() with the text passed from the argument.
 * @param {string} t Text
 */
SlideMenu.prototype._log = function(t) {
    if(this._debug) {
        console.log(t);
    }
}

/**
 * Sets scope to variable.
 * @param {object} scope 
 * @param {function} fn 
 */
function bind(scope, fn) {
    return function () {
        return fn.apply(scope, arguments);
    }
}