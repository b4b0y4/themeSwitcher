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
  const isSystem = !localStorage.getItem("themeOverride");

  body.dataset.selectedTheme = theme;
  body.dataset.theme = theme;
  body.dataset.themeSource = isSystem ? "system" : "manual";
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
document.documentElement.classList.remove("no-flash");
