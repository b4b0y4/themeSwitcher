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
  transition:
  background-color 0.3s,
  color 0.3s;
  }

  #theme-btn {
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  color: var(--color-txt);
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    position: absolute;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  }

  #theme-light {
  opacity: 1;
  transform: rotate(0deg);
  }

  #theme-dark {
  opacity: 0;
  transform: rotate(-90deg);
  }

  #theme-system {
  opacity: 0;
  transform: rotate(-90deg);
  }

  [data-selected-theme="dark"] #theme-light {
  opacity: 0;
  transform: rotate(90deg);
  }

  [data-selected-theme="dark"] #theme-dark {
  opacity: 1;
  transform: rotate(0deg);
  }

  [data-selected-theme="dark"] #theme-system {
  opacity: 0;
  transform: rotate(90deg);
  }

  [data-theme-source="system"] #theme-light {
  opacity: 0;
  transform: rotate(-90deg);
  }

  [data-theme-source="system"] #theme-dark {
  opacity: 0;
  transform: rotate(90deg);
  }

  [data-theme-source="system"] #theme-system {
  opacity: 1;
  transform: rotate(0deg);
  }
</style>

<button id="theme-btn">
  <svg
    id="theme-light"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
  >
    <circle cx="12" cy="12" r="5" />
    <path
      d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.318.36l1.42 1.42M1 12h2M21 12h2M4.219.78l1.42-1.42M18.36 5.64l1.42-1.42"
    />
  </svg>
  <svg
    id="theme-dark"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.7" />
  </svg>
  <svg
    id="theme-system"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2">
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
</button>

<script>
  const themeBtn = document.getElementById("theme-btn");
  const themes = ["light", "dark"];

  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)"   ).matches ? 1 : 0;
  };

  const getCurrentTheme = () => {
    const override = localStorage.getItem("themeOverride");
    return override ? themes.indexOf(override) : getSystemTheme();
  };

  const applyTheme = () => {
    const themeIndex = getCurrentTheme();
    const theme = themes[themeIndex];
    const isSystem = !localStorage.getItem("themeOverride");

    document.body.dataset.selectedTheme = theme;
    document.body.dataset.theme = theme;
    document.body.dataset.themeSource = isSystem ? "system" :     "manual";
  };

  themeBtn.addEventListener("click", () => {
    const currentIndex = getCurrentTheme();
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    localStorage.setItem("themeOverride", nextTheme);
    applyTheme();
  });

  themeBtn.addEventListener("dblclick", (e) => {
    e.preventDefault();
    localStorage.removeItem("themeOverride");
    applyTheme();
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (!localStorage.getItem("themeOverride")) {
        applyTheme();
      }
    });

  applyTheme();
</script>
```
