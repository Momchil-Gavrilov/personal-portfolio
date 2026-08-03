/*
  The three colourways, as data rather than as three copies of the site.

  `swatch` is a literal hex and not `bg-primary`, because the swatches have to
  show all three colours at once while only one of them is the active theme.
  It is the same value as that theme's `--color-primary` in `globals.css`, and
  the two have to be changed together; there is no way to read a custom
  property that is not currently applied.
*/
export const THEMES = [
  { id: "green", label: "Green", swatch: "#1a4a32" },
  { id: "navy", label: "Navy", swatch: "#15324F" },
  { id: "maroon", label: "Maroon", swatch: "#5a1526" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const DEFAULT_THEME: ThemeId = "green";

export const THEME_KEY = "colourway";
export const VOTE_KEY = "colourway-vote";

export function isThemeId(value: unknown): value is ThemeId {
  return THEMES.some((t) => t.id === value);
}

/*
  Runs synchronously in <head>, before the browser paints anything, so a
  reader who chose navy last visit never sees the green default flash first.
  Deliberately tiny and dependency-free: it is inlined into every page's HTML.

  The try/catch is not decoration. `localStorage` throws outright when a
  browser is set to block all storage, and an exception here would happen
  before hydration and take the page's first paint with it.
*/
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_KEY
)});if(t&&${JSON.stringify(
  THEMES.map((t) => t.id)
)}.indexOf(t)>-1)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
