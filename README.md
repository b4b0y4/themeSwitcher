# Reusable Theme Switcher

This is a simple, reusable theme switcher component that allows users to toggle between light, dark, and system themes.

## How to Use

To add this theme switcher to your project, follow these steps:

1.  **Add the CSS variables to your stylesheet.**

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
    ```

2.  **Copy the theme button code.**

    Copy the code below and paste it into your HTML file where you want the theme button to appear.

That's it! The theme button is self-contained and will automatically apply the theme to the `<body>` of your page.

## Code

```html
<style>
    body {
      background-color: var(--color-bg);
      color: var(--color-txt);
      transition: background-color 0.3s, color 0.3s;
    }

    #theme-btn {
      border: none;
      background: none;
      cursor: pointer;
      padding: 0;
      display: inline-block;
      svg {
        display: none;
      }
    }

    body[data-selected-theme="light"] #theme-dark,
    body[data-selected-theme="dark"] #theme-light {
      display: block;
    }
</style>

<button id="theme-btn">
    <svg id="theme-light" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="white" />
    </svg>
    <svg id="theme-dark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="black" />
    </svg>
</button>

<script>
const themeBtn = document.getElementById("theme-btn");
const body = document.body;

const themes = ["light", "dark"];
let currentTheme;

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  currentTheme = themes.indexOf(savedTheme);
} else {
  // Set initial theme based on system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    currentTheme = 1; // dark
  } else {
    currentTheme = 0; // light
  }
}

const applyTheme = () => {
  const theme = themes[currentTheme];
  localStorage.setItem("theme", theme);
  body.dataset.selectedTheme = theme;
  body.dataset.theme = theme;
};

themeBtn.addEventListener("click", () => {
  currentTheme = (currentTheme + 1) % themes.length;
  applyTheme();
});

// Apply initial theme
applyTheme();
</script>
```
