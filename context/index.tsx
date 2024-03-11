"use client";

// Core types
import type { FC } from "react";

// Core
import { createContext, useEffect, useState, useCallback } from "react";

// Create Context base
export const StoreContext = createContext({} as IAppContext);

// Vendors
import { ThemeProvider } from "styled-components";

// App context properties
import { AppThemes } from "@/context/theme";
import { useSetCookie } from "@/lib/useSetCookie";

type Theme = "light" | "dark";

// Instruct component Props Types
interface IProps {
  children: React.ReactNode;
  theme: Theme;
}

// Instruct component State Types
interface IAppContext {
  isPhone?: boolean;
  isTablet?: boolean;
  appTheme?: Theme;
  setAppTheme: (theme: Theme) => void;
}

export const Store: FC<IProps> = ({ children, theme }) => {
  const [isPhone, setIsPhone] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [appTheme, setAppTheme] = useState<Theme>(theme);

  const detectLayout = useCallback(() => {
    setIsPhone(window.matchMedia("(max-width: 768px)").matches);
    setIsTablet(window.matchMedia("(max-width: 992px)").matches);
  }, []);

  useEffect(() => {
    detectLayout();

    window.addEventListener("resize", detectLayout);

    return () => window.removeEventListener("resize", detectLayout);
  }, [detectLayout]);

  useEffect(() => {
    useSetCookie({ name: "theme", value: appTheme, days: 30 });
  }, [appTheme]);

  return (
    <StoreContext.Provider
      value={
        {
          isPhone,
          isTablet,
          appTheme,
          setAppTheme,
        } as IAppContext
      }
    >
      <ThemeProvider theme={AppThemes[appTheme]}>{children}</ThemeProvider>
    </StoreContext.Provider>
  );
};
