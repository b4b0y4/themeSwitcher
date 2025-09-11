# Theme Switcher with URL Bar Matching

A lightweight, vanilla JavaScript theme switcher that synchronizes your webpage theme with the browser's URL bar color. Features smooth transitions, system preference detection, and persistent user overrides.

## Features

- 🌗 **Light/Dark Theme Toggle** - Cycle between light and dark themes with a single click
- 🔄 **System Preference Support** - Automatically follows system theme preferences
- 🎯 **URL Bar Color Matching** - Browser URL bar color matches your current theme
- 💾 **Persistent Settings** - Remembers manual theme overrides across sessions
- 📱 **Responsive Design** - Works seamlessly across desktop and mobile browsers
- ⚡ **Zero Dependencies** - Pure vanilla JavaScript, no frameworks required
- 🎨 **Smooth Animations** - CSS transitions for theme changes and icon rotations

## Quick Start

1. Include the HTML structure with theme meta tags:
```html
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
<meta name="theme-color" id="theme-color-override" content="" />
```

2. Add the theme button with SVG icons:
```html
<button id="theme-btn">
  <svg id="theme-light"><!-- Sun icon --></svg>
  <svg id="theme-dark"><!-- Moon icon --></svg>
  <svg id="theme-system"><!-- Monitor icon --></svg>
</button>
```

3. Include the theme switcher script and you're ready to go!

## Usage

### Basic Interaction
- **Single Click**: Cycle between light and dark themes
- **Double Click**: Reset to system preference
- **System Change**: Automatically updates when system theme changes (if not manually overridden)

### Theme States
- **System Mode**: Follows `prefers-color-scheme` media query
- **Light Override**: Manually locked to light theme
- **Dark Override**: Manually locked to dark theme

## API Reference

### ThemeManager Object

```javascript
const themeManager = {
  themes: ["light", "dark"],           // Available theme names
  colors: ["#ffffff", "#000000"],      // Corresponding URL bar colors

  sys(),                               // Get system preference (0=light, 1=dark)
  cur(),                               // Get current theme index
  apply(),                             // Apply current theme to DOM and URL bar
  cycle(),                             // Cycle to next theme
  reset(),                             // Reset to system preference
  updateURLBarColor(colorIndex, hasOverride)  // Update browser URL bar color
}
```

### Data Attributes
The theme switcher adds these data attributes to `document.body`:

- `data-theme`: Current theme name ("light" or "dark")
- `data-theme-source`: Source of theme ("system" or "manual")
- `data-selected-theme`: Selected theme when manually overridden

## CSS Integration

Use CSS custom properties for theme-aware styling:

```css
:root {
  --color-bg: #fff;
  --color-txt: #000;
}

[data-theme="dark"] {
  --color-bg: #000;
  --color-txt: #fff;
}

body {
  background: var(--color-bg);
  color: var(--color-txt);
  transition: background 0.3s, color 0.3s;
}
```

Target specific theme states with data attributes:
```css
/* Show sun icon when light theme is manually selected */
[data-selected-theme="light"][data-theme-source="manual"] #theme-light {
  opacity: 1;
  transform: rotate(0);
}

/* Show moon icon when dark theme is manually selected */
[data-selected-theme="dark"][data-theme-source="manual"] #theme-dark {
  opacity: 1;
  transform: rotate(0);
}

/* Show monitor icon when following system preference */
[data-theme-source="system"] #theme-system {
  opacity: 1;
  transform: rotate(0);
}
```

## URL Bar Color Synchronization

The theme switcher intelligently manages browser URL bar colors:

### System Mode
Uses responsive meta tags that automatically switch based on system preference:
```html
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
```

### Manual Override Mode
Temporarily disables system meta tags and sets a specific color:
```html
<meta name="theme-color" id="theme-color-override" content="#000000" />
```

## Browser Support

- ✅ **Theme Colors**: Chrome 39+, Firefox 127+, Safari 15+
- ✅ **System Preferences**: All modern browsers with `prefers-color-scheme` support
- ✅ **Local Storage**: IE8+ and all modern browsers

## Customization

### Custom Colors
Update the `colors` array to use custom URL bar colors:
```javascript
const themeManager = {
  themes: ["light", "dark"],
  colors: ["#f8f9fa", "#1a1a1a"],  // Custom light/dark colors
  // ...
}
```

### Additional Themes
Extend the switcher to support more themes:
```javascript
const themeManager = {
  themes: ["light", "dark", "blue"],
  colors: ["#ffffff", "#000000", "#1e40af"],
  // Update cycle() method to handle more than 2 themes
  cycle() {
    const nextIndex = (this.cur() + 1) % this.themes.length;
    localStorage.themeOverride = this.themes[nextIndex];
    this.apply();
  }
}
```

## Performance Notes

- **Minimal DOM Queries**: Caches elements and uses efficient selectors
- **Event Delegation**: Uses single event listeners with proper cleanup
- **CSS Transitions**: Smooth animations without JavaScript animation loops
- **LocalStorage**: Minimal storage footprint with automatic cleanup

## License

MIT License - Feel free to use in your projects!
