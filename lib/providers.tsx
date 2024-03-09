"use client";

// Vendor types
import type { Session } from "next-auth";

// Local registry
import StyledComponentsRegistry from "./registry";

// GLobal styles
import GlobalStyle from "@/styles/globalStyles";

// Vendors
import { SessionProvider } from "next-auth/react";

const Providers = (props: React.PropsWithChildren, session: Session) => {
  return (
    <SessionProvider session={session}>
      <StyledComponentsRegistry>
        <GlobalStyle />

        {props.children}
      </StyledComponentsRegistry>
    </SessionProvider>
  );
};

export default Providers;
