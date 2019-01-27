# SlideMenu.js
> Easy off-canvas menu with mobile touch support.


**Table of Contents**
- [SlideMenu.js demo](#demo)
- [Installing SlideMenu.js](#installation)
- [Using SlideMenu.js](#usage)
- [Browser Support](#browser-support)
- [API](#api)
 - [SlideMenu.js options](#slidemenu-options-)
- [SlideMenu.js events](#events)
- [Author](#with-heart-by)
- [License](#license)
<!-- Currently not available. - [Documentation](#documentation) -->

## Demo

[Check out the demo](https://alexkratky.github.io/SlideMenu.js/example.html) to see it in action (on your mobile or emulate touches on your browser).

<img src="https://i.imgur.com/.gif" alt="SlideMenu.js demo">

## Installation
Download SlideMenu.js and SlideMenu.css from [releases](https://github.com/AlexKratky/SlideMenu.js/releases), include them in `<head>` by entering following code:
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="SlideMenu.js"></script>
<link rel="stylesheet" href="SlideMenu.css">
```
Also, before including SlideMenu.js you need include jQuery.
## Usage
```html
<html>
    <head>
        <link rel="stylesheet" href="SlideMenu.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script src="SlideMenu.js"></script>
    </head>
    <body id="site-wrapper">
        <div id="site-canvas">
            <div id="site-menu">
                <h2>Example menu</h1>
                <div>item 1</div>
                <div>item 2</div>
                <div>item 3</div>
                <div>item 4</div>
                <div>item 5</div>
            </div>

            <!--Any other content-->
            <h1>SlideMenu.js</h1>
            <a href="#" id="logo">☰<span>Menu</span></a>
        </div>

    </body>
    <script>
        var sm;
        $(document).ready(function () {
            sm = new SlideMenu({
                'debug': true 
            });
        });
    </script>
</html>
```



## Browser Support
Tested on:
- Chrome (Android, desktop)
- MS Edge (desktop)

## API

### SlideMenu(options)
Create a new instance of SlideMenu
* `options` (Object) - Options to customize a new instance of SlideMenu.
* [`options.container`] (HTMLElement) - The DOM element that will have touch listeners. Default: `body`.
* [`options.wrapper`] (HTMLElement) - The outer DOM element that contains `option.canvas`. It could be the same element as `options.container`. Default: `#site-wrapper`.
* [`options.canvas`] (HTMLElement) - The DOM element that contains all your application content. Default `#site-canvas`.
* [`options.button`] (HTMLElement) - The DOM element that will have toggle function. Default `#logo`.
* [`options.percent`] (Number) - Specifies the minimum size (in percent) to open the menu. Enter number in interval <0,1>. Default: `0.25`.
* [`options.area`] (Number) - Specifies the size (in percent) of touch area from the left of the container. Enter number in interval <0,1>. Default: `0.1`.
* [`options.debug`] (Boolean) - Sets the application output via a console. Default: `false`.
* [`options.closeMenuOnWidth`] (Number|Boolean) - Closes the menu when the window width is greater than this value. When setting `false`, the menu will not close at any value. Default: `false`.
* [`options.disableMenuOnWidth`] (Number|Boolean) - Disable touch events when the window width is greater than this value. When setting `false`, the touch events will be available at any window width. Default: `false`.
* [`options.size`] (Number) - The menus size. Default: `300`.
* [`options.animationTime`] (Number) - The menus animation time in milliseconds. Default: `300`.

```js
var sm = new SlideMenu({
  'container': document.querySelector('body'),
  'wrapper': document.getElementById('site-wrapper'),
  'canvas': document.getElementById('site-canvas'),
  'button': document.getElementById('logo'),
  'percent': 0.25,
  'area': 0.1,
  'debug': 'false',
  'closeMenuOnWidth': false,
  'disableMenuOnWidth': false,
  'size': 300,
  'animationTime': 300
});
```

### SlideMenu.openMenu();
Opens the menu. It emits `menuOpen` and `menuOpenEnded` events.
```js
sm.openMenu();
```

### SlideMenu.closeMenu();
Closes the menu. It emits `menuClose` and `menuCloseEnded` events.
```js
sm.closeMenu();
```

### SlideMenu.toggleMenu();
Toggles (open/close) the menu. It emits `menuToggle` and `menuToggleEnded` events.
```js
sm.toggleMenu();
```

### SlideMenu.isMenuOpened();
Returns true if the menu is currently open, and false if it is closed.
```js
sm.isMenuOpened(); // true or false
```

## Events
An instance of SlideMenu emits the following events:
* `menuOpen`
* `menuClose`
* `menuOpenEnded`
* `menuCloseEnded`
* `menuNotEnough` - When the menu does not close or open after touch end.
* `menuToggle`
* `menuToggleEnded`
* `touchStarted`
* `touchMoved`
* `touchEnded`

<!--
## Documentation
[SlideMenu.js documentation](https://tssoft.cz/SlideMenu.js)
-->

## With :heart: by
- Alex Krátký
- E-mail: [info@alexkratky.cz](info@alexkratky.cz)
- Web: [https://alexkratky.cz/](https://alexkratky.cz)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details