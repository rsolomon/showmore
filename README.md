showMore jQuery plugin
================================
A lightweight plugin that will reduce the text length in a given element to a predefined length. At the truncation point, it will add a "Show More" link that will allow the user to expand the text to its original state.

This plugin supports child nodes in the original element, such that invoking the plugin on a parent element will handle child nodes gracefully instead of blindly slicing them mid-tag.

version
--------------------------------
0.0.1

options
--------------------------------
* charLength - Amount of characters to show when collapsed.
* linkText - Text to show in the expand link.
* duration - Duration in milliseconds of the animation from collapsed to expanded states.

defaults
--------------------------------
```javascript
{
  charLength: 50,
  linkText: 'Show More',
  duration: 250
}
```

