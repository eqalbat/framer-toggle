import React, { createContext, useCallback, useContext, useState } from "react";
import { dark, light } from "./theme";
import { ThemeProvider as StyledProvider } from "styled-components";

type ThemeModeType = "light" | "dark";
export const ThemeContext = createContext<{
  ThemeMode?: ThemeModeType;
  setThemeMode?: any;
}>({});

const whatUseTheme = (): ThemeModeType => {
  // 브라우저 테마 정보 확인
  const isBrowserDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers.colors-scheme: dark)").matches;
  let initTheme: ThemeModeType = isBrowserDarkMode ? "dark" : "light";

  // 사용자가 테마 설정을 직접 지정한 테마가 있는지 확인
  const localSettingTheme: ThemeModeType = localStorage.getItem(
    "theme"
  ) as ThemeModeType;

  // 지정한 테마가 존재한다면 해당 테마로 설정 없으면 브라우저 기본 설정 테마로 셋팅
  if (localSettingTheme) {
    initTheme = localSettingTheme;
  }

  return initTheme;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [ThemeMode, setThemeMode] = useState<ThemeModeType>(whatUseTheme());
  const themeObject = ThemeMode === "light" ? light : dark;

  return (
    <ThemeContext.Provider value={{ ThemeMode, setThemeMode }}>
      <StyledProvider theme={themeObject}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = (): [theme?: string, toggleTheme?: () => void] => {
  const context = useContext(ThemeContext);
  const { ThemeMode, setThemeMode } = context;

  const toggleTheme = useCallback(() => {
    if (ThemeMode === ("light" as ThemeModeType)) {
      setThemeMode("dark");
      window.localStorage.setItem("theme", "dark") as unknown as ThemeModeType;
    } else {
      setThemeMode("light" as ThemeModeType);
      window.localStorage.setItem("theme", "light") as unknown as ThemeModeType;
    }
  }, [ThemeMode]);

  return [ThemeMode, toggleTheme];
};
