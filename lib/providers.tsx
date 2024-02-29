"use client";

// Core
import { useContext } from "react";

// Store context
import { StoreContext } from "@/context";

// Theme context
import { AppThemes } from "@/context/theme";

// Global types
import { ITheme } from "@/types";

// Vendors
import StyledComponentsRegistry from "./registry";
import { ThemeProvider } from "styled-components";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

const Providers = (props: React.PropsWithChildren, session: Session) => {
  const { theme } = useContext(StoreContext);

  return (
    <SessionProvider session={session}>
      <StyledComponentsRegistry>
        <ThemeProvider theme={AppThemes.light as ITheme}>
          {props.children}
        </ThemeProvider>
      </StyledComponentsRegistry>
    </SessionProvider>
  );
};

export default Providers;
