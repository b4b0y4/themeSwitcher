const themeManager = {
  themes: ["light", "dark"],

  getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? 1 : 0;
  },

  getCurrentTheme() {
    const override = localStorage.getItem("themeOverride");
    return override ? this.themes.indexOf(override) : this.getSystemTheme();
  },

  applyTheme() {
    const themeIndex = this.getCurrentTheme();
    const theme = this.themes[themeIndex];
    const isSystem = !localStorage.getItem("themeOverride");
    document.body.dataset.selectedTheme = theme;
    document.body.dataset.theme = theme;
    document.body.dataset.themeSource = isSystem ? "system" : "manual";
  },

  cycleTheme() {
    const currentIndex = this.getCurrentTheme();
    const nextTheme = this.themes[(currentIndex + 1) % this.themes.length];
    localStorage.setItem("themeOverride", nextTheme);
    this.applyTheme();
  },

  resetToSystem() {
    localStorage.removeItem("themeOverride");
    this.applyTheme();
  },
};

const handleThemeClick = () => {
  themeManager.cycleTheme();
};

const handleThemeDoubleClick = (e) => {
  e.preventDefault();
  themeManager.resetToSystem();
};

const handleSystemThemeChange = () => {
  if (!localStorage.getItem("themeOverride")) {
    themeManager.applyTheme();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("theme-btn");
  themeBtn.addEventListener("click", handleThemeClick);
  themeBtn.addEventListener("dblclick", handleThemeDoubleClick);
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", handleSystemThemeChange);

  themeManager.applyTheme();
  document.getElementById("year").textContent = new Date().getFullYear();
});
