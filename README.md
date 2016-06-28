# angular-bulma

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

## Contributing

Again, this is an early stage project, any help is appreciated, feel free to open issues and submit
pull requests.
