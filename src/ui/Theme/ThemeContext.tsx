import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light";

export type ThemeContextValue = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => void 0,
});

export const ThemeProvider: React.FC = ({ children }) => {
  const initialValue =
    JSON.parse(localStorage.getItem("REMIND_APP_THEME_MODE") || "0") || "dark";
  const [theme, setTheme] = useState<Theme>(initialValue);

  const value = {
    theme,
    setTheme,
  };

  useEffect(() => {
    localStorage.setItem("REMIND_APP_THEME_MODE", JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => useContext(ThemeContext);
