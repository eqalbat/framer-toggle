export type Colors = "titleColor" | "bgColor";

export const dark = {
  colors: {
    titleColor: "#121212",
    bgColor: "#b8b8b8",
  },
} as const;

export const light = {
  colors: {
    titleColor: "#b8b8b8",
    bgColor: "#121212",
  },
} as const;

export interface Theme {
  colors: {
    [key in Colors]: string;
  };
}
