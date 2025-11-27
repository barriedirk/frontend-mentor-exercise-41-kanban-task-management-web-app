// note: getComputedStyle() => https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle

export function getThemeVariables(): Record<string, Record<string, string>> {
  if (typeof document === "undefined") return {};

  const root = document.documentElement;

  const getCssVar = (name: string) =>
    getComputedStyle(root).getPropertyValue(name).trim();

  return {
    light: {
      "--background": getCssVar("--color-very-light-gray"),
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
      "--color-label": getCssVar("--color-very-light-neutral-gray"),

      "--input-border": getCssVar("--color-very-light-cool-gray"),
      "--input-color": getCssVar("--color-black"),

      "--checkbox": getCssVar("--color-white"),
      "--checkbox-border": getCssVar("--color-dark-cool-gray"),
      "--checbox-checked": getCssVar("--color-purple-blue"),
      "--checkbox-bck": getCssVar("--color-cool-blue-gray"),
      "--checkbox-bck-hover": getCssVar("--color-dark-muted-blue-purple"),
    },
    dark: {
      "--background": getCssVar("--color-dark-grey"),
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
      "--color-label": getCssVar("--color-cool-desaturated-blue-gray"),

      "--input-border": getCssVar("--color-dark-cool-gray"),
      "--input-color": getCssVar("--color-white"), // optional fallback

      "--checkbox": getCssVar("--color-very-dark-blue-gray"),
      "--checkbox-border": getCssVar("--color-very-dark-blue-gray"),
      "--checbox-checked": getCssVar("--color-purple-blue"),
      "--checkbox-bck": getCssVar("--color-very-dark-gray"),
      "--checkbox-bck-hover": getCssVar("--color-soft-pastel-purple"),
    },
  };
}
