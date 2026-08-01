/**
 * Runs before first paint: stamps .js (gates animation hidden-states so
 * content renders without JavaScript) and .dark (theme) on <html>.
 * Must be rendered as a RAW inline <script> at the top of <body> —
 * next/script with beforeInteractive executes after first paint in the
 * App Router, which caused a visible flash for theme and js-gated UI.
 */
export const THEME_INIT_SCRIPT = `(function(){document.documentElement.classList.add("js");try{var t=localStorage.getItem("theme");var d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme:dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})();`;
