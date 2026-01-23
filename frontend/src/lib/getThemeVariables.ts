// note: getComputedStyle() => https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle

export function getThemeVariables(): Record<string, Record<string, string>> {
  if (typeof document === "undefined") return {};

  const root = document.documentElement;

  const getCssVar = (name: string) =>
    getComputedStyle(root).getPropertyValue(name).trim();

  return {
    light: {
      "--bg-destructive": getCssVar("--color-red"),
      "--text-destructive": getCssVar("--color-white"),

      "--bg-secondary": getCssVar("--color-soft-pastel-purple"),
      "--text-secondary": getCssVar("--color-main-purple"),

      "--bg-chk-switch": getCssVar("--color-main-purple"),
      "--bg-chk-round": getCssVar("--color-white"),

      "--background": getCssVar("--color-white"),
      "--background-secondary": getCssVar("--color-light-grey-light-bg"),
      "--background-tertiary": getCssVar("--color-cotton-boll"),

      "--foreground": getCssVar("--color-black"),
      "--heading-color": getCssVar("--color-muted-blue-gray"),

      "--button-primary-bck": getCssVar("--color-main-purple"),
      "--button-primary-color": getCssVar("--color-white"),
      "--button-primary-bck-hover": getCssVar("--color-main-purple-hover"),

      "--button-secundary-bck": getCssVar("--color-very-light-bluish-lavender"),
      "--button-secundary-bck-hover": getCssVar("--color-soft-pastel-purple"),
      "--button-secundary-color": getCssVar("--color-purple-blue"),

      "--button-destructive-bck": getCssVar("--color-red"),
      "--button-destructive-bck-hover": getCssVar("--color-red-hover"),
      "--button-destructive-color": getCssVar("--color-white"),

      "--color-error": getCssVar("--color-red"),
      "--color-label": getCssVar("--color-medium-grey"),

      "--input-border": getCssVar("--color-medium-grey"),
      "--input-color": getCssVar("--color-black"),

      "--checkbox": getCssVar("--color-white"),
      "--checkbox-border": getCssVar("--color-dark-cool-gray"),
      "--checbox-checked": getCssVar("--color-purple-blue"),
      "--checkbox-bck": getCssVar("--color-cool-blue-gray"),
      "--checkbox-bck-hover": getCssVar("--color-dark-muted-blue-purple"),
    },
    dark: {
      "--bg-destructive": getCssVar("--color-red"),
      "--text-destructive": getCssVar("--color-white"),

      "--bg-secondary": getCssVar("--color-white"),
      "--text-secondary": getCssVar("--color-main-purple"),

      "--bg-chk-switch": getCssVar("--color-main-purple"),
      "--bg-chk-round": getCssVar("--color-white"),

      "--background": getCssVar("--color-black"),
      "--background-secondary": getCssVar("--color-dark-grey"),
      "--background-tertiary": getCssVar("--color-black-veltet"),
      "--foreground": getCssVar("--color-white"),
      "--heading-color": getCssVar("--color-muted-blue-gray"),

      "--button-primary-bck": getCssVar("--color-main-purple"),
      "--button-primary-color": getCssVar("--color-white"),
      "--button-primary-bck-hover": getCssVar("--color-main-purple-hover"),

      "--button-secundary-bck": getCssVar("--color-white"),
      "--button-secundary-bck-hover": getCssVar("--color-white"),
      "--button-secundary-color": getCssVar("--color-purple-blue"),

      "--button-destructive-bck": getCssVar("--color-red"),
      "--button-destructive-bck-hover": getCssVar("--color-red-hover"),
      "--button-destructive-color": getCssVar("--color-white"),

      "--color-error": getCssVar("--color-red"),
      "--color-label": getCssVar("--color-light-grey-light-bg"),

      "--input-border": getCssVar("--color-your-shadow"),
      "--input-color": getCssVar("--color-white"), // optional fallback

      "--checkbox": getCssVar("--color-very-dark-blue-gray"),
      "--checkbox-border": getCssVar("--color-very-dark-blue-gray"),
      "--checbox-checked": getCssVar("--color-purple-blue"),
      "--checkbox-bck": getCssVar("--color-very-dark-gray"),
      "--checkbox-bck-hover": getCssVar("--color-soft-pastel-purple"),
    },
  };
}
