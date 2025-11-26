// note: getComputedStyle() => https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle

export function getThemeVariables(): Record<string, Record<string, string>> {
  if (typeof document === "undefined") return {};

  const root = document.documentElement;

  return {
    light: {
      "--background": getComputedStyle(root)
        .getPropertyValue("--color-very-light-gray")
        .trim(),
      "--foreground": getComputedStyle(root)
        .getPropertyValue("--color-black")
        .trim(),
    },
    dark: {
      "--background": getComputedStyle(root)
        .getPropertyValue("--color-dark-grey")
        .trim(),
      "--foreground": getComputedStyle(root)
        .getPropertyValue("--color-white")
        .trim(),
    },
  };
}
