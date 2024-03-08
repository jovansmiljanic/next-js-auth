"use client";

// Core
import { useContext } from "react";

// Store context
import { StoreContext } from "@/context";

// Theme context
import { AppThemes } from "@/context/theme";

// Global types
import { ITheme } from "@/types";

// Vendor types
import type { Session } from "next-auth";

// Local registry
import StyledComponentsRegistry from "./registry";

// Vendors
import { ThemeProvider } from "styled-components";
import { SessionProvider } from "next-auth/react";

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
