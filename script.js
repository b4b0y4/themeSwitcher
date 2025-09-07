const themeManager = {
  themes: ["light", "dark"],
  sys: () => (matchMedia("(prefers-color-scheme: dark)").matches ? 1 : 0),
  cur: () =>
    localStorage.themeOverride
      ? themeManager.themes.indexOf(localStorage.themeOverride)
      : themeManager.sys(),
  apply() {
    let override = localStorage.themeOverride,
      idx = this.cur(),
      theme = this.themes[idx];
    document.body.dataset.theme = theme;
    document.body.dataset.themeSource = override ? "manual" : "system";
    document.body.dataset.selectedTheme = override ? theme : "";
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
