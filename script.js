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
