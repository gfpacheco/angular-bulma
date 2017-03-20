# angular-bulma [![Build Status](https://travis-ci.org/gfpacheco/angular-bulma.svg?branch=master)](https://travis-ci.org/gfpacheco/angular-bulma)

This is a (WIP) project to bring some interaction to the components of Bulma into the Angular world.

The project is in a really early stage and I will implement new components as I need them in my
other projects.

## Installation

Bulma is a dependency of this project so you don't need to install it separately.

### Install with NPM

```sh
npm install --save angular-bulma
```

### Install with Bower

```sh
bower install --save angular-bulma
```

## Setup

### Load the script

Add the `dist/angular-bulma.min.js` to your HTML file.

### Add as dependency

Add `bulma` module as a dependency of your Angular app:

```javascript
angular.module('yourModule', ['bulma']);
```

## Components

### Daterangepicker

This component wraps the [bulma-daterangepicker](https://github.com/gfpacheco/bulma-daterangepicker)
package into an Angular directive and is heavily inspired ~~(pretty much copy-pasted)~~ by
[angular-daterangepicker](https://github.com/fragaria/angular-daterangepicker).

```html
<bu-daterangepicker ng-model="myDaterange"/>
```

> Important! The model must be an Object and have `startDate` and `endDate` properties.

Min and max value can be set via additional attributes:

```html
<bu-daterangepicker ng-model="date" min="'2000-01-01'" max="'2000-01-02'"/>
```

It can be further customized by passing in the `options` attribute.

```html
<bu-daterangepicker ng-model="date" min="'2000-01-01'" max="'2000-01-02'" options="{separator: ':'}"/>
```

### Dialog

A modified version of Bulma's modal. To show a title, a message, some buttons and return which
button was clicked. Inject the `buDialog` wherever you want to use it then:

```js
buDialog.show({
  title: 'Dialog title',
  message: 'Dialog message',
  buttons: [
    {
      label: 'Ok',
      class: 'is-primary',
    }
  ]
});
```

If you just want a confirmation dialog with title, message, one primary and one secondary button
you can use the `buDialog.confirm`:

```js
buDialog.confirm('Dialog title', 'Dialog message', 'Primary button', 'Secondary button');
```

One aditional boolean parameter can be send, if `true` it will add the `is-danger` class to the
primary button.

### Dropdown

Add the `bu-dropdown` class to any tag and the `bu-dropdown-body` to any of its descendants. The
body will be hidden by default and any click on the outer element will make the body visible. After
that any click anywhere inside the document will make the dropdown body to hide again.

```html
<div class="bu-dropdown">
  <div class="button">Dropdown</div>
  <div class="bu-dropdown-body">
    <nav class="menu">
      <ul class="menu-list">
        <li><a>Menu item</a></li>
        <li><a>Menu item</a></li>
        <li><a>Menu item</a></li>
        <li><a>Menu item</a></li>
      </ul>
    </nav>
  </div>
</div>
```

#### Options

`bu-is-right` - Adding this class to the `bu-dropdown-body` element will make it align to the right
side of the `bu-dropdown`.

### Timepicker

As mentioned before, this project will evolve with the need for features. This is a clear example of
a feature implemented as the minimum needed.

```html
<bu-timepicker ng-model="myTime"/>
```

### Tooltip

This is a port of [UI Bootstrap](https://angular-ui.github.io/bootstrap)'s tooltip component. To use
add the `bu-tooltip` attribute to any element and it's value will be shown in a tooltip when the
user passes the mouse over the element.

```html
<p>A paragraph with some <span bu-tooltip="Meaning of the fancy word">fancy</span> word.</p>
```

## Contributing

Again, this is an early stage project, any help is appreciated, feel free to open issues and submit
pull requests.
