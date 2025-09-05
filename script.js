const themeBtn = document.getElementById("theme-btn");
const body = document.body;

const themes = ["light", "dark"];

const getSystemTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? 1 : 0;
};

const getCurrentTheme = () => {
  const override = localStorage.getItem("themeOverride");
  return override ? themes.indexOf(override) : getSystemTheme();
};

const applyTheme = () => {
  const themeIndex = getCurrentTheme();
  const theme = themes[themeIndex];
  body.dataset.selectedTheme = theme;
  body.dataset.theme = theme;
};

themeBtn.addEventListener("click", () => {
  const currentIndex = getCurrentTheme();
  const nextTheme = themes[(currentIndex + 1) % themes.length];
  localStorage.setItem("themeOverride", nextTheme);
  applyTheme();
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", applyTheme);

applyTheme();
