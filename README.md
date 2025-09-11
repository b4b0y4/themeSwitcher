# Reusable Theme Switcher

This is a simple, reusable theme switcher component that allows users to toggle between light, dark, and system themes.

## How to Use

To add this theme switcher to your project, follow these steps:

1. **Add the CSS variables to your stylesheet.**
   You need to define the `--color-bg` and `--color-txt` variables for your light and dark themes. You can do this in your main stylesheet like this:
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

2. **Download the theme files.**
   Save the `theme.css` and `theme.js` files to your project directory.

3. **Copy the theme button code.**
   Copy the code below and paste it into your HTML file where you want the theme button to appear.

That's it! The theme button will automatically apply themes to the `<body>` of your page. Single-click cycles through themes, double-click resets to system preference.

## Code

**theme.css**
```css
#theme-btn {
  border: 0;
  background: 0;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-txt);
  position: relative;
}
#theme-btn svg {
  position: absolute;
  transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: rotate(-90deg);
}
[data-selected-theme="light"][data-theme-source="manual"] #theme-light,
[data-selected-theme="dark"][data-theme-source="manual"] #theme-dark,
[data-theme-source="system"] #theme-system {
  opacity: 1;
  transform: rotate(0);
}
```

**theme.js**
```javascript
const themeManager = {
  themes: ["light", "dark"],
  sys: () => (matchMedia("(prefers-color-scheme: dark)").matches ? 1 : 0),
  cur() {
    return localStorage.themeOverride
      ? this.themes.indexOf(localStorage.themeOverride)
      : this.sys();
  },
  apply() {
    let o = localStorage.themeOverride,
      t = this.themes[this.cur()];
    Object.assign(document.body.dataset, {
      theme: t,
      themeSource: o ? "manual" : "system",
      selectedTheme: o ? t : "",
    });
  },
  cycle() {
    localStorage.themeOverride = this.themes[(this.cur() + 1) % 2];
    this.apply();
  },
  reset() {
    localStorage.removeItem("themeOverride");
    this.apply();
  },
};
document.addEventListener("DOMContentLoaded", () => {
  let btn = document.getElementById("theme-btn");
  btn.onclick = () => themeManager.cycle();
  btn.ondblclick = (e) => (e.preventDefault(), themeManager.reset());
  matchMedia("(prefers-color-scheme: dark)").addEventListener(
    "change",
    () => !localStorage.themeOverride && themeManager.apply(),
  );
  themeManager.apply();
});
```

**HTML**
```html
<link rel="stylesheet" href="theme.css">
<button id="theme-btn">
  <svg id="theme-light" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.33">
    <circle cx="8" cy="8" r="3.33" />
    <path d="M8 0.67v1.33M8 14v1.33M2.81 2.81l0.95 0.95M12.24 12.24l0.95 0.95M0.67 8h1.33M14 8h1.33M2.81 13.19l0.95-0.95M12.24 3.76l0.95-0.95" />
  </svg>
  <svg id="theme-dark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
    <path d="M14 8.53A6 6 0 1 1 7.47 2 4.67 4.67 0 0 0 14 8.53z" />
  </svg>
  <svg id="theme-system" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.33">
    <rect x="1.33" y="2" width="13.33" height="9.33" rx="1.33" ry="1.33" />
    <line x1="5.33" y1="14" x2="10.67" y2="14" />
    <line x1="8" y1="11.33" x2="8" y2="14" />
  </svg>
</button>
<script src="theme.js"></script>
```
