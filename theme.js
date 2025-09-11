const themeManager = {
  themes: ["light", "dark"],
  colors: ["#ffffff", "#000000"], // Corresponding colors for URL bar
  sys: () => (matchMedia("(prefers-color-scheme: dark)").matches ? 1 : 0),
  cur() {
    return localStorage.themeOverride
      ? this.themes.indexOf(localStorage.themeOverride)
      : this.sys();
  },
  apply() {
    let o = localStorage.themeOverride,
      t = this.themes[this.cur()],
      colorIndex = this.cur();

    Object.assign(document.body.dataset, {
      theme: t,
      themeSource: o ? "manual" : "system",
      selectedTheme: o ? t : "",
    });

    this.updateURLBarColor(colorIndex, o);
  },
  updateURLBarColor(colorIndex, hasOverride) {
    const overrideMetaTag = document.getElementById("theme-color-override");

    if (hasOverride) {
      overrideMetaTag.setAttribute("content", this.colors[colorIndex]);
      const systemMetaTags = document.querySelectorAll(
        'meta[name="theme-color"][media]',
      );
      systemMetaTags.forEach((tag) => {
        tag.dataset.originalMedia = tag.getAttribute("media");
        tag.removeAttribute("media");
        tag.setAttribute("content", "");
      });
    } else {
      overrideMetaTag.setAttribute("content", "");
      const systemMetaTags = document.querySelectorAll(
        'meta[name="theme-color"][data-original-media]',
      );
      systemMetaTags.forEach((tag) => {
        tag.setAttribute("media", tag.dataset.originalMedia);
        tag.removeAttribute("data-original-media");
        if (tag.getAttribute("media").includes("light")) {
          tag.setAttribute("content", this.colors[0]);
        } else if (tag.getAttribute("media").includes("dark")) {
          tag.setAttribute("content", this.colors[1]);
        }
      });
    }
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
