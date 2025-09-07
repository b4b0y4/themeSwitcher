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
    background: var(--color-bg);
    color: var(--color-txt);
    transition: background .3s, color .3s;
  }
  #theme-btn {
    border: 0; background: 0; cursor: pointer;
    width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
    color: var(--color-txt); position: relative;
  }
  #theme-btn svg {
    position: absolute; transition: .4s cubic-bezier(.4,0,.2,1);
    opacity: 0; transform: rotate(-90deg);
  }
  [data-selected-theme="light"][data-theme-source="manual"] #theme-light,
  [data-selected-theme="dark"][data-theme-source="manual"] #theme-dark,
  [data-theme-source="system"] #theme-system {
    opacity: 1; transform: rotate(0);
  }
</style>

<button id="theme-btn">
  <svg id="theme-light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24" height="24" stroke="currentColor" fill="none" stroke-width="1.33">
    <circle cx="8" cy="8" r="3.33"/>
    <path d="M8 .67v1.33M8 14v1.33M2.81 2.81l.95.95M12.24 12.24l.95.95M.67 8h1.33M14 8h1.33M2.81 13.19l.95-.95M12.24 3.76l.95-.95"/>
  </svg>
  <svg id="theme-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24" height="24" fill="currentColor">
    <path d="M14 8.53A6 6 0 1 1 7.47 2 4.67 4.67 0 0 0 14 8.53z"/>
  </svg>
  <svg id="theme-system" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24" height="24" stroke="currentColor" fill="none" stroke-width="1.33">
    <rect x="1.33" y="2" width="13.33" height="9.33" rx="1.33"/>
    <line x1="5.33" y1="14" x2="10.67" y2="14"/><line x1="8" y1="11.33" x2="8" y2="14"/>
  </svg>
</button>

<script>
const themeManager={
  themes:["light","dark"],
  sys:()=>matchMedia("(prefers-color-scheme: dark)").matches?1:0,
  cur:()=>localStorage.themeOverride?themeManager.themes.indexOf(localStorage.themeOverride):themeManager.sys(),
  apply(){
    let override=localStorage.themeOverride, idx=this.cur(), theme=this.themes[idx];
    document.body.dataset.theme=theme;
    document.body.dataset.themeSource=override?"manual":"system";
    document.body.dataset.selectedTheme=override?theme:"";
  },
  cycle(){localStorage.themeOverride=this.themes[(this.cur()+1)%2];this.apply()},
  reset(){localStorage.removeItem("themeOverride");this.apply()}
};
document.addEventListener("DOMContentLoaded",()=>{
  let btn=document.getElementById("theme-btn");
  btn.onclick=()=>themeManager.cycle();
  btn.ondblclick=e=>(e.preventDefault(),themeManager.reset());
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>!localStorage.themeOverride&&themeManager.apply());
  themeManager.apply();
});
</script>
```
