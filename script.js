const themeBtn = document.getElementById("theme-btn");
const body = document.body;
const themes = ["light", "dark"];

// Theme colors for potential theme-color meta tag updates
const themeColors = {
  light: "#fff",
  dark: "#000",
};

const getSystemTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? 1 : 0;
};

const getCurrentTheme = () => {
  const override = localStorage.getItem("themeOverride");
  return override ? themes.indexOf(override) : getSystemTheme();
};

const updateThemeColor = (theme) => {
  // Remove existing theme-color meta tags
  const existingMetas = document.querySelectorAll('meta[name="theme-color"]');
  existingMetas.forEach((meta) => meta.remove());

  // Add new theme-color meta tag
  const meta = document.createElement("meta");
  meta.name = "theme-color";
  meta.content = themeColors[theme];
  meta.media = `(prefers-color-scheme: ${theme})`;
  document.head.appendChild(meta);
};

const applyTheme = () => {
  const themeIndex = getCurrentTheme();
  const theme = themes[themeIndex];
  const isSystem = !localStorage.getItem("themeOverride");

  body.dataset.selectedTheme = theme;
  body.dataset.theme = theme;
  body.dataset.themeSource = isSystem ? "system" : "manual";

  updateThemeColor(theme);
};

// Single click: cycle through manual themes
themeBtn.addEventListener("click", () => {
  const currentIndex = getCurrentTheme();
  const nextTheme = themes[(currentIndex + 1) % themes.length];
  localStorage.setItem("themeOverride", nextTheme);
  applyTheme();
});

// Double click: reset to system preference
themeBtn.addEventListener("dblclick", (e) => {
  e.preventDefault(); // Prevent the single click from firing
  localStorage.removeItem("themeOverride");
  applyTheme();
});

// Listen for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    // Only apply if we're currently following system preference
    if (!localStorage.getItem("themeOverride")) {
      applyTheme();
    }
  });

// Initialize theme on page load
applyTheme();
